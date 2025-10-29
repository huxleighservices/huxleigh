'use client';
import { BaseSimulatorDialog } from './base-simulator-dialog';

interface ClosingSimulatorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  activeSessionId: string | null;
}

export function ClosingSimulatorDialog(props: ClosingSimulatorDialogProps) {
  return (
    <BaseSimulatorDialog
      {...props}
      phase="closing"
      title="Phase 6: Closing Simulation"
      description="Practice the final steps to secure commitment and close the deal. The AI is hesitant and needs a final push."
    />
  );
}
