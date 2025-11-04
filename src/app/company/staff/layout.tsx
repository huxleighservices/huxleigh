'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { Loader2, User, BookOpen, LogOut, Clock } from 'lucide-react';
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

export default function StaffLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { currentUser, loading, signOut } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const isSignInPage = pathname.startsWith('/company/staff/signin');

  useEffect(() => {
    if (!loading) {
      if (currentUser && isSignInPage) {
        router.replace('/company/staff');
      } else if (!currentUser && !isSignInPage) {
        router.replace('/company/staff/signin');
      }
    }
  }, [currentUser, loading, router, pathname, isSignInPage]);

  const showLoader = loading || (!currentUser && !isSignInPage);

  if (showLoader) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (isSignInPage) {
    return <FirebaseClientProvider>{children}</FirebaseClientProvider>;
  }

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <FirebaseClientProvider>
      <SidebarProvider>
        <div className="flex min-h-screen">
          <Sidebar
            side="left"
            collapsible="icon"
            variant="inset"
            className="border-r-2 border-primary/20"
          >
            <SidebarHeader>
              <div className="flex items-center justify-between p-2">
                <Link
                  href="/"
                  className="group-data-[collapsible=icon]:hidden"
                >
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
                    isActive={pathname.startsWith('/company/staff/resources')}
                    tooltip={{ children: 'Resources' }}
                  >
                    <Link href="/company/staff/resources">
                      <BookOpen />
                      <span>Resources</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname.startsWith('/company/staff/punch')}
                    tooltip={{ children: 'Time Punch' }}
                  >
                    <Link href="/company/staff/punch">
                      <Clock />
                      <span>Time Punch</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarContent>
            <SidebarFooter>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    onClick={handleSignOut}
                    tooltip={{ children: 'Sign Out' }}
                  >
                    <LogOut />
                    <span>Sign Out</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarFooter>
          </Sidebar>
          <SidebarInset>
            <div className="p-4 md:p-8">{children}</div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </FirebaseClientProvider>
  );
}
