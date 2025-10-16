
'use client';
import { BaseSimulatorDialog } from './base-simulator-dialog';

interface ObjectionHandlingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  activeSessionId: string | null;
}

export function ObjectionHandlingDialog(props: ObjectionHandlingDialogProps) {
  return (
    <BaseSimulatorDialog
      {...props}
      phase="objection-handling"
      title="Phase 5: Objection Handling Simulation"
      description="Practice overcoming common sales objections. The AI will present you with typical concerns about price, timing, and value."
    />
  );
}
