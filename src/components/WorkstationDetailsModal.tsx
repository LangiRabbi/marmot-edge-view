import { X, Camera, Clock, Users, Activity, Zap, BarChart3, CheckCircle, AlertTriangle, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

interface WorkstationDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  workstation: {
    name: string;
    status: 'online' | 'offline' | 'alert';
    peopleCount: number;
    efficiency: number;
    lastActivity: string;
  };
}

const mockEvents = [
  { type: 'shift', message: 'Shift change completed', time: '10:36 PM', status: 'completed' },
  { type: 'quality', message: 'Quality check passed', time: '10:21 PM', status: 'passed' },
  { type: 'maintenance', message: 'Maintenance check completed', time: '10:06 PM', status: 'completed' },
  { type: 'production', message: 'Production cycle finished', time: '09:51 PM', status: 'finished' }
];

export function WorkstationDetailsModal({ open, onOpenChange, workstation }: WorkstationDetailsModalProps) {
  const { toast } = useToast();
  
  const getStatusColor = () => {
    switch (workstation.status) {
      case 'online': return 'text-success';
      case 'offline': return 'text-muted-foreground';
      case 'alert': return 'text-warning';
    }
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'quality': return <CheckCircle className="h-4 w-4 text-success" />;
      case 'maintenance': return <Activity className="h-4 w-4 text-primary" />;
      case 'production': return <CheckCircle className="h-4 w-4 text-success" />;
      default: return <AlertTriangle className="h-4 w-4 text-warning" />;
    }
  };

  const handleExportData = () => {
    toast({
      title: "Data Export",
      description: "Workstation data exported successfully.",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl bg-background border-border" onClick={(e) => e.stopPropagation()}>
        <DialogHeader>
          <div className="flex items-start justify-between pr-8">
            <DialogTitle className="text-xl font-bold text-foreground flex items-center gap-2">
              {workstation.name}
              <span className={`text-sm font-medium ${getStatusColor()}`}>
                {workstation.status.charAt(0).toUpperCase() + workstation.status.slice(1)}
              </span>
            </DialogTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={handleExportData}
              className="border-border hover:bg-muted text-foreground"
            >
              <Download className="h-4 w-4 mr-2" />
              Export Data
            </Button>
          </div>
          <DialogDescription className="sr-only">
            Workstation details and monitoring information
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Live Camera Feed */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Camera className="h-5 w-5 text-foreground" />
              <h3 className="text-lg font-semibold text-foreground">Live Camera Feed</h3>
            </div>
            
            <div className="bg-muted/30 rounded-lg p-8 text-center border border-border">
              <div className="w-20 h-20 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
                <Camera className="h-8 w-8 text-muted-foreground" />
              </div>
              <p className="text-foreground font-medium">Camera Feed Active</p>
              <p className="text-sm text-muted-foreground">Resolution: 1920x1080 • 30 FPS</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-4 mt-6">
              <div className="text-center p-4 bg-muted/20 rounded-lg border border-border">
                <Clock className="h-6 w-6 text-primary mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Uptime</p>
                <p className="text-lg font-semibold text-foreground">156h</p>
              </div>
              <div className="text-center p-4 bg-muted/20 rounded-lg border border-border">
                <Activity className="h-6 w-6 text-success mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Cycles</p>
                <p className="text-lg font-semibold text-foreground">234</p>
              </div>
              <div className="text-center p-4 bg-muted/20 rounded-lg border border-border">
                <Zap className="h-6 w-6 text-warning mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Efficiency</p>
                <p className="text-lg font-semibold text-foreground">{workstation.efficiency}%</p>
              </div>
            </div>
          </div>

          {/* Detection Timeline */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-foreground" />
              <h3 className="text-lg font-semibold text-foreground">Detection Timeline</h3>
            </div>
            
            <div className="bg-muted/30 rounded-lg p-4 border border-border">
              <div className="mb-4">
                <p className="text-sm font-medium text-foreground mb-2">LAST 10 EVENTS</p>
              </div>
              
              <div className="space-y-3">
                {mockEvents.map((event, index) => (
                  <div key={index} className="flex items-center gap-3 p-2 bg-background/50 rounded-md border border-border">
                    {getEventIcon(event.type)}
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">{event.message}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Clock className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">{event.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}