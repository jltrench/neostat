use serde::Serialize;
use std::sync::Mutex;
use sysinfo::{CpuExt, System, SystemExt};
use tauri::State;

#[derive(Debug, Serialize)]
struct SystemStats {
    cpu_usage: Vec<f32>,
    memory_used: u64,
    memory_total: u64,
    memory_usage: f32,
    processes_count: usize,
    uptime: u64,
}

struct SystemState(Mutex<System>);

#[tauri::command]
async fn get_system_stats(state: State<'_, SystemState>) -> Result<SystemStats, String> {
    let mut sys = state.0.lock().unwrap();
    sys.refresh_all();

    let cpu_usage: Vec<f32> = sys.cpus().iter().map(|cpu| cpu.cpu_usage()).collect();
    let memory_used = sys.used_memory();
    let memory_total = sys.total_memory();
    let memory_usage = (memory_used as f32 / memory_total as f32) * 100.0;
    let processes_count = sys.processes().len();
    let uptime = sys.uptime();

    Ok(SystemStats {
        cpu_usage,
        memory_used,
        memory_total,
        memory_usage,
        processes_count,
        uptime,
    })
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .manage(SystemState(Mutex::new(System::new_all())))
        .invoke_handler(tauri::generate_handler![get_system_stats])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
