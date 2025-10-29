'use client';
import { BaseSimulatorDialog } from './base-simulator-dialog';

interface ProspectingSimulatorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  activeSessionId: string | null;
}

export function ProspectingSimulatorDialog(props: ProspectingSimulatorDialogProps) {
  return (
    <BaseSimulatorDialog
      {...props}
      phase="prospecting"
      title="Phase 1: Prospecting Simulation"
      description="Practice identifying and making initial contact with potential clients. The AI will act as a cold lead."
    />
  );
}
