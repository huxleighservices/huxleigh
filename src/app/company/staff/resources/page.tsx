'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  BookOpen,
  Plus,
  Link as LinkIcon,
  ExternalLink,
  MoreVertical,
  Loader2,
  Trash2,
} from 'lucide-react';
import Link from 'next/link';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy } from 'firebase/firestore';
import { NewHyperlinkDialog } from './NewHyperlinkDialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { deleteHyperlink } from './actions';
import { useToast } from '@/hooks/use-toast';

type Hyperlink = {
  id: string;
  name: string;
  url: string;
  createdAt: any;
};

export default function ResourcesPage() {
  const firestore = useFirestore();
  const { toast } = useToast();

  const hyperlinksRef = useMemoFirebase(() => {
    if (!firestore) return null;
    return collection(firestore, 'hyperlinks');
  }, [firestore]);

  const hyperlinksQuery = useMemoFirebase(() => {
    if (!hyperlinksRef) return null;
    return query(hyperlinksRef, orderBy('createdAt', 'desc'));
  }, [hyperlinksRef]);

  const {
    data: hyperlinks,
    isLoading,
    error,
  } = useCollection<Hyperlink>(hyperlinksQuery);

  const handleDelete = async (id: string) => {
    try {
      await deleteHyperlink(id);
      toast({
        title: 'Success',
        description: 'Hyperlink deleted.',
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Could not delete hyperlink.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold font-headline">Resources</h1>
        <NewHyperlinkDialog />
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
          {isLoading && (
            <div className="flex justify-center items-center h-24">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          )}
          {!isLoading && !error && (!hyperlinks || hyperlinks.length === 0) && (
            <div className="text-center text-muted-foreground py-8">
              <p>No hyperlinks have been added yet.</p>
              <p>Click "New Hyperlink" to add the first one.</p>
            </div>
          )}
          {error && (
            <div className="text-center text-destructive py-8">
              <p>Error loading resources: {error.message}</p>
            </div>
          )}
          {!isLoading && hyperlinks && hyperlinks.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {hyperlinks.map((link) => (
                <div key={link.id} className="flex group">
                  <Button
                    variant="outline"
                    className="justify-between flex-1 rounded-r-none"
                    asChild
                  >
                    <Link href={link.url} target="_blank">
                      <div className="flex items-center gap-2 overflow-hidden">
                        <LinkIcon className="h-4 w-4 flex-shrink-0" />
                        <span className="truncate">{link.name}</span>
                      </div>
                      <ExternalLink className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                    </Link>
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        className="rounded-l-none border-l-0 px-2"
                      >
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => handleDelete(link.id)}
                        className="text-destructive"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
