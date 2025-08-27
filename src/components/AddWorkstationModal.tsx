import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AddWorkstationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddWorkstationModal({ open, onOpenChange }: AddWorkstationModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    ipAddress: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Adding workstation:", formData);
    onOpenChange(false);
    setFormData({ name: "", ipAddress: "" });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass-card border-border max-w-md mx-auto fixed">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-foreground">
            Add New Workstation
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-foreground font-medium">
              Workstation Name
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g., Assembly Line 3"
              className="bg-background/50 border-border text-foreground focus:border-primary focus:ring-1 focus:ring-primary/50 h-10 px-3"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="ipAddress" className="text-foreground font-medium">
              Device IP Address
            </Label>
            <Input
              id="ipAddress"
              value={formData.ipAddress}
              onChange={(e) => setFormData({ ...formData, ipAddress: e.target.value })}
              placeholder="e.g., 192.168.1.100"
              className="bg-background/50 border-border text-foreground focus:border-primary focus:ring-1 focus:ring-primary/50 h-10 px-3"
              required
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="border-border hover:bg-muted text-foreground"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Add Workstation
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}