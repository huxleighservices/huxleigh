
'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { Loader2, User, BookOpen, LogOut } from 'lucide-react';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarTrigger,
  SidebarInset,
} from '@/components/ui/sidebar';
import Link from 'next/link';
import Logo from '@/components/Logo';
import { FirebaseClientProvider } from '@/firebase';

function StaffLayoutContent({ children }: { children: React.ReactNode }) {
  const { currentUser, loading, signOut } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !currentUser && !pathname.startsWith('/company/staff/signin')) {
      router.replace('/company/staff/signin');
    }
  }, [currentUser, loading, router, pathname]);

  if (loading && !pathname.startsWith('/company/staff/signin')) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (!currentUser && !pathname.startsWith('/company/staff/signin')) {
    return null;
  }

  if (!currentUser) {
    return <>{children}</>;
  }

  const handleSignOut = async () => {
    await signOut();
    router.push('/company/staff/signin');
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar side="left" collapsible="icon" variant="sidebar" className="border-r-2 border-primary/20">
          <SidebarHeader>
            <div className="flex items-center justify-between p-2">
              <Link href="/" className="group-data-[collapsible=icon]:hidden">
                <Logo className="h-8 w-auto" />
              </Link>
              <SidebarTrigger />
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === '/company/staff'}
                  tooltip={{ children: 'My Info' }}
                >
                  <Link href="/company/staff">
                    <User />
                    <span>My Info</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === '/company/staff/resources'}
                  tooltip={{ children: 'Resources' }}
                >
                  <Link href="/company/staff/resources">
                    <BookOpen />
                    <span>Resources</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={handleSignOut} tooltip={{ children: 'Sign Out' }}>
                  <LogOut />
                  <span>Sign Out</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset>
          <div className="p-4 md:p-8 h-screen overflow-hidden flex flex-col">{children}</div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}

export default function StaffLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <FirebaseClientProvider>
      <StaffLayoutContent>{children}</StaffLayoutContent>
    </FirebaseClientProvider>
  );
}
