'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Plus, Link as LinkIcon, ExternalLink } from 'lucide-react';
import Link from 'next/link';

const hyperlinks = [
  { name: 'HTBase', url: '#' },
  { name: 'Welcome Booklet', url: '#' },
  { name: 'i9 form', url: '#' },
  { name: 'W4 Form', url: '#' },
];

export default function ResourcesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold font-headline">Resources</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Hyperlink
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <BookOpen className="h-8 w-8 text-primary" />
            <div>
              <CardTitle>Company Hyperlinks</CardTitle>
              <CardDescription>
                Important links and resources for all staff members.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {hyperlinks.map((link) => (
              <Button
                key={link.name}
                variant="outline"
                className="justify-between"
                asChild
              >
                <Link href={link.url} target="_blank">
                  <div className="flex items-center gap-2">
                    <LinkIcon className="h-4 w-4" />
                    <span>{link.name}</span>
                  </div>
                  <ExternalLink className="h-4 w-4 text-muted-foreground" />
                </Link>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
