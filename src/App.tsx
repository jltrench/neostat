import { useSystemMonitor } from "@/hooks";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Maximize2, RefreshCw } from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { useState } from "react";
import { MainLayout } from "@/components/layouts/main-layout";
import { OverviewTab } from "@/components/tabs/overview-tab";
import { CPUTab } from "@/components/tabs/cpu-tab";
import { MemoryTab } from "@/components/tabs/memory-tab";

function App() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const {
    stats,
    lastUpdate,
    isLoading,
    error,
    alerts,
    metrics,
    cpuHistory,
    memoryHistory,
  } = useSystemMonitor();

  if (error) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center min-h-screen bg-background">
          <div className="text-lg text-destructive flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            Error loading system information: {error.message}
          </div>
        </div>
      </MainLayout>
    );
  }

  if (isLoading || !stats) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center min-h-screen bg-background">
          <div className="text-lg text-glow animate-pulse flex items-center gap-2">
            <RefreshCw className="w-5 h-5 animate-spin" />
            Initializing NeoStat...
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="h-screen pt-8 overflow-auto">
        <div
          className={`min-h-[calc(100vh-2rem)] bg-background p-4 md:p-8 ${
            isFullscreen ? "fixed inset-0 z-40 pt-8" : ""
          }`}
        >
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold text-glow bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                  NeoStat Monitor
                </h1>
                <p className="text-sm text-muted-foreground">
                  Last update: {lastUpdate.toLocaleTimeString()}
                </p>
              </div>

              <div className="flex items-center gap-4">
                {/* Alerts */}
                {alerts.length > 0 && (
                  <HoverCard>
                    <HoverCardTrigger>
                      <Badge variant="destructive" className="animate-pulse">
                        <AlertTriangle className="w-4 h-4 mr-1" />
                        {alerts.length} Alert{alerts.length > 1 ? "s" : ""}
                      </Badge>
                    </HoverCardTrigger>
                    <HoverCardContent>
                      <ul className="space-y-2">
                        {alerts.map((alert) => (
                          <li
                            key={alert.id}
                            className={`flex items-center gap-2 ${
                              alert.type === "error"
                                ? "text-destructive"
                                : "text-warning"
                            }`}
                          >
                            <AlertTriangle className="w-4 h-4" />
                            {alert.message}
                          </li>
                        ))}
                      </ul>
                    </HoverCardContent>
                  </HoverCard>
                )}

                {/* Fullscreen Toggle */}
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  className="hover:border-primary"
                >
                  <Maximize2 className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="border border-primary/20">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="cpu">CPU Details</TabsTrigger>
                <TabsTrigger value="memory">Memory Analysis</TabsTrigger>
              </TabsList>

              <TabsContent value="overview">
                <OverviewTab
                  stats={stats}
                  metrics={metrics}
                  cpuHistory={cpuHistory}
                  memoryHistory={memoryHistory}
                />
              </TabsContent>

              <TabsContent value="cpu">
                <CPUTab
                  stats={stats}
                  metrics={metrics}
                  cpuHistory={cpuHistory}
                />
              </TabsContent>

              <TabsContent value="memory">
                <MemoryTab
                  stats={stats}
                  metrics={metrics}
                  memoryHistory={memoryHistory}
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default App;