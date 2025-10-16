
'use client';
import { BaseSimulatorDialog } from './base-simulator-dialog';

interface ProposalSimulatorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  activeSessionId: string | null;
}

export function ProposalSimulatorDialog(props: ProposalSimulatorDialogProps) {
  return (
    <BaseSimulatorDialog
      {...props}
      phase="proposal"
      title="Phase 4: Proposal Simulation"
      description="Practice presenting your solution and its value effectively. The AI will challenge the details of your proposal."
    />
  );
}
