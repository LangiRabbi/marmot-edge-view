import { Users, Clock, MoreVertical, Edit, Settings, BarChart3, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface WorkstationCardProps {
  name: string;
  status: 'online' | 'offline' | 'alert';
  peopleCount: number;
  efficiency: number;
  lastActivity: string;
}

export function WorkstationCard({ 
  name, 
  status, 
  peopleCount, 
  efficiency, 
  lastActivity 
}: WorkstationCardProps) {
  const getStatusColor = () => {
    switch (status) {
      case 'online': return 'text-success';
      case 'offline': return 'text-muted-foreground';
      case 'alert': return 'text-warning';
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'online': return 'Online';
      case 'offline': return 'Offline';
      case 'alert': return 'Alert';
    }
  };

  const getProgressColor = () => {
    if (efficiency >= 80) return 'text-success';
    if (efficiency >= 60) return 'text-warning';
    return 'text-destructive';
  };

  return (
    <div className="glass-card p-6 smooth-transition">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">{name}</h3>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-muted">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-popover border-border">
            <DropdownMenuItem className="hover:bg-muted">
              <Edit className="mr-2 h-4 w-4" />
              Edit Name
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-muted">
              <Settings className="mr-2 h-4 w-4" />
              Configure
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-muted">
              <BarChart3 className="mr-2 h-4 w-4" />
              View Details
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-muted text-destructive">
              <Trash2 className="mr-2 h-4 w-4" />
              Remove
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Status */}
      <div className="flex items-center space-x-2 mb-3">
        <div className={`status-dot ${status}`} />
        <span className={`text-sm font-medium ${getStatusColor()}`}>
          {getStatusText()}
        </span>
      </div>

      {/* People Count */}
      <div className="flex items-center space-x-2 mb-3">
        <Users className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm text-foreground">{peopleCount} people</span>
      </div>

      {/* Efficiency */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground">Efficiency</span>
          <span className={`text-sm font-medium ${getProgressColor()}`}>
            {efficiency}%
          </span>
        </div>
        <Progress 
          value={efficiency} 
          className={`progress-glow ${getProgressColor()}`}
        />
      </div>

      {/* Last Activity */}
      <div className="flex items-center space-x-2 text-xs text-muted-foreground">
        <Clock className="h-3 w-3" />
        <span>{lastActivity}</span>
      </div>
    </div>
  );
}