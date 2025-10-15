
'use client';

import { Ban } from 'lucide-react';

export default function TasksPage() {
    return (
        <div className="flex flex-col h-full items-center justify-center text-center">
             <Ban className="h-16 w-16 text-muted-foreground mb-4"/>
            <h1 className="text-3xl font-bold font-headline">Feature Under Reconstruction</h1>
            <p className="mt-2 text-lg text-muted-foreground">This feature is temporarily unavailable.</p>
        </div>
    );
}
