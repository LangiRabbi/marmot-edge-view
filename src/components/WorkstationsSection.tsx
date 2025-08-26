import { useState } from "react";
import { WorkstationCard } from "./WorkstationCard";
import { AddWorkstationCard } from "./AddWorkstationCard";
import { AddWorkstationModal } from "./AddWorkstationModal";

const sampleWorkstations = [
  {
    id: 1,
    name: "Assembly Line 1",
    status: "online" as const,
    peopleCount: 2,
    efficiency: 86,
    lastActivity: "2 min ago"
  },
  {
    id: 2,
    name: "QC Station 3",
    status: "alert" as const,
    peopleCount: 0,
    efficiency: 45,
    lastActivity: "35 min ago"
  },
  {
    id: 3,
    name: "Packaging Unit A",
    status: "online" as const,
    peopleCount: 3,
    efficiency: 94,
    lastActivity: "1 min ago"
  },
  {
    id: 4,
    name: "Welding Station 2",
    status: "offline" as const,
    peopleCount: 0,
    efficiency: 0,
    lastActivity: "47 min ago"
  },
  {
    id: 5,
    name: "Paint Booth 1",
    status: "online" as const,
    peopleCount: 2,
    efficiency: 90,
    lastActivity: "3 min ago"
  },
  {
    id: 6,
    name: "Final Inspection",
    status: "alert" as const,
    peopleCount: 2,
    efficiency: 68,
    lastActivity: "18 min ago"
  }
];

export function WorkstationsSection() {
  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <AddWorkstationCard onClick={() => setShowAddModal(true)} />
        
        {sampleWorkstations.map((workstation) => (
          <WorkstationCard
            key={workstation.id}
            name={workstation.name}
            status={workstation.status}
            peopleCount={workstation.peopleCount}
            efficiency={workstation.efficiency}
            lastActivity={workstation.lastActivity}
          />
        ))}
      </div>

      <AddWorkstationModal 
        open={showAddModal} 
        onOpenChange={setShowAddModal} 
      />
    </div>
  );
}