import { Terminal } from 'lucide-react';

export default function PaymentPage() {
  return (
    <div className="container flex flex-col items-center justify-center py-24 text-center">
      <Terminal className="h-24 w-24 text-primary mb-8" />
      <h1 className="text-4xl font-bold font-headline">Point of Sale Integration</h1>
      <p className="mt-4 text-lg text-muted-foreground max-w-md">
        This page is ready for a new implementation using the Square Point of Sale API.
      </p>
    </div>
  );
}
