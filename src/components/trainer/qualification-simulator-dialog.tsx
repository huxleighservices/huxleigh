'use client';
import { BaseSimulatorDialog } from './base-simulator-dialog';

interface QualificationSimulatorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  activeSessionId: string | null;
}

export function QualificationSimulatorDialog(props: QualificationSimulatorDialogProps) {
  return (
    <BaseSimulatorDialog
      {...props}
      phase="qualification"
      title="Phase 2: Qualification Simulation"
      description="Practice asking the right questions to determine if a prospect is a good fit. The AI will act as a busy but interested lead."
    />
  );
}
