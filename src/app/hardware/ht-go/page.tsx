import { HardDrive } from 'lucide-react';

export default function HtGoPage() {
  return (
    <div className="container flex flex-col items-center justify-center py-24 text-center">
      <div className="glassmorphism p-12 rounded-2xl border flex flex-col items-center">
        <HardDrive className="h-24 w-24 text-primary mb-8" />
        <h1 className="text-4xl font-bold font-headline">HT-Go</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-md">
          This page is under construction. Check back soon for our revolutionary portable AI-powered sales training hardware.
        </p>
      </div>
    </div>
  );
}
