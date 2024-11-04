import { getCurrentWindow } from '@tauri-apps/api/window';
import { Minus, Square, X } from "lucide-react";
import { useState, useEffect } from "react";

export function TitleBar() {
  const [isMaximized, setIsMaximized] = useState(false);

  useEffect(() => {
    const initWindow = async () => {
      const win = getCurrentWindow();
      
      const maximized = await win.isMaximized();
      setIsMaximized(maximized);

      await win.listen('tauri://resize', async () => {
        const maximized = await win.isMaximized();
        setIsMaximized(maximized);
      });
    };

    initWindow();
  }, []);

  const handleMaximize = async () => {
    const win = getCurrentWindow();
    if (isMaximized) {
      await win.unmaximize();
      setIsMaximized(false);
    } else {
      await win.maximize();
      setIsMaximized(true);
    }
  };

  const handleMinimize = async () => {
    const win = getCurrentWindow();
    await win.minimize();
  };

  const handleClose = async () => {
    const win = getCurrentWindow();
    await win.close();
  };

  return (
    <div className="fixed top-0 left-0 right-0 h-8 flex justify-between items-center z-50 px-2 select-none bg-background/50 backdrop-blur-md border-b border-border/40">
      <div
        data-tauri-drag-region
        className="flex-1 h-full flex items-center gap-2 px-2"
      >
        <div className="h-3 w-3 rounded-full bg-primary/80" />
        <span className="text-xs text-muted-foreground">
          NeoStat Monitor
        </span>
      </div>

      <div className="flex items-center">
        <button
          onClick={handleMinimize}
          className="inline-flex items-center justify-center h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
        >
          <Minus size={16} />
        </button>
        <button
          onClick={handleMaximize}
          className="inline-flex items-center justify-center h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
        >
          {isMaximized ? (
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="scale-75"
            >
              <path
                d="M3 1H11C12.1046 1 13 1.89543 13 3V11C13 12.1046 12.1046 13 11 13H3C1.89543 13 1 12.1046 1 11V3C1 1.89543 1.89543 1 3 1ZM3 3V11H11V3H3Z"
                fill="currentColor"
              />
            </svg>
          ) : (
            <Square size={14} />
          )}
        </button>
        <button
          onClick={handleClose}
          className="inline-flex items-center justify-center h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}