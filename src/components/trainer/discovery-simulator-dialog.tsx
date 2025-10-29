'use client';
import { BaseSimulatorDialog } from './base-simulator-dialog';

interface DiscoverySimulatorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  activeSessionId: string | null;
}

export function DiscoverySimulatorDialog(props: DiscoverySimulatorDialogProps) {
  return (
    <BaseSimulatorDialog
      {...props}
      phase="discovery"
      title="Phase 3: Discovery Simulation"
      description="Practice uncovering a prospect's deep-seated needs and pain points. The AI has specific business problems you need to find."
    />
  );
}
