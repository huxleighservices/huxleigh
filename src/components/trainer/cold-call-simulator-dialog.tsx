
'use client';
import { BaseSimulatorDialog } from './base-simulator-dialog';

interface ColdCallSimulatorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  activeSessionId: string | null;
}

export function ColdCallSimulatorDialog(props: ColdCallSimulatorDialogProps) {
  return (
    <BaseSimulatorDialog
      {...props}
      phase="cold-call"
      title="Cold Call Simulation"
      description="Practice making unsolicited calls to prospective clients. The AI will act as a busy executive."
    />
  );
}
