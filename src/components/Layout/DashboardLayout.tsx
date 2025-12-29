'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import {
  BarChart3,
  Bell,
  Calendar,
  ChevronRight,
  Compass,
  CreditCard,
  FileText, Gift,
  Heart,
  HelpCircle,
  History,
  LayoutDashboard,
  LogOut,
  Mail,
  Map, Menu,
  MessageCircle,
  Settings,
  Shield,
  Star,
  Users
} from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { ScrollArea } from '../ui/scroll-area';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const userNavItems = [
  { href: '/dashboard/dashboardoverview', label: 'Overview', icon: LayoutDashboard },
  { href: '/dashboard/travelplans', label: 'My Travel Plans', icon: Calendar },
  { href: '/dashboard/requests', label: 'Buddy Requests', icon: Users, badge: 3 },
  { href: '/dashboard/messages', label: 'Messages', icon: MessageCircle, badge: 5 },
  { href: '/dashboard/favorites', label: 'Favorites', icon: Heart },
  { href: '/dashboard/travelhistory', label: 'Travel History', icon: History },
  { href: '/dashboard/reviews', label: 'My Reviews', icon: Star },
  { href: '/dashboard/notifications', label: 'Notifications', icon: Bell, badge: 2 },
  { href: '/dashboard/analytics', label: 'Analytics', icon: BarChart3 },
  { href: '/dashboard/subscription', label: 'Subscription', icon: CreditCard },
  { href: '/dashboard/bucket-list', label: 'Bucket List', icon: Map },
  { href: '/dashboard/settings', label: 'Settings', icon: Settings },
];

const adminNavItems = [
  { href: '/admin', label: 'Overview', icon: LayoutDashboard },
  { href: '/admin/users', label: 'User Management', icon: Users },
  { href: '/admin/travel-plans', label: 'Travel Plans', icon: Calendar },
  { href: '/admin/reviews', label: 'Review Moderation', icon: Star },
  { href: '/admin/subscriptions', label: 'Subscriptions', icon: CreditCard },
  { href: '/admin/reports', label: 'Reports', icon: FileText, badge: 4 },
  { href: '/admin/promo', label: 'Promo & Marketing', icon: Gift },
  { href: '/admin/content', label: 'Content Management', icon: FileText },
  { href: '/admin/settings', label: 'Platform Settings', icon: Settings },
  { href: '/admin/logs', label: 'Audit Logs', icon: Shield },
  { href: '/admin/support', label: 'Support Tickets', icon: HelpCircle, badge: 8 },
  { href: '/admin/emails', label: 'Email Templates', icon: Mail },
];

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  const user = session?.user;
  const isAdmin = user?.role === 'admin';

  const navItems = isAdmin ? adminNavItems : userNavItems;

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push('/');
    router.refresh();
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-4 border-b border-sidebar-border">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
            <Compass className="w-6 h-6 text-primary-foreground" />
          </div>
          {sidebarOpen && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="font-display font-bold text-lg text-sidebar-foreground"
            >
              Travel<span className="text-primary">Buddy</span>
            </motion.span>
          )}
        </Link>
      </div>

      {/* User Info */}
      <div className="p-4 border-b border-sidebar-border">
        <div className={cn("flex items-center gap-3", !sidebarOpen && "justify-center")}>
          <Avatar className="h-10 w-10 border-2 border-primary/20">
            <AvatarImage src="" />
            <AvatarFallback className="bg-primary/10 text-primary font-semibold">
              {user?.email?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          {sidebarOpen && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-1 min-w-0">
              <p className="text-sm font-medium text-sidebar-foreground truncate">
                {user?.email}
              </p>
              <p className="text-xs text-sidebar-foreground/60">
                {isAdmin ? 'Administrator' : 'Traveler'}
              </p>
            </motion.div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 py-4">
        <nav className="px-2 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group",
                  isActive
                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                )}
              >
                <item.icon className={cn("w-5 h-5 flex-shrink-0", isActive && "text-sidebar-primary-foreground")} />
                {sidebarOpen && (
                  <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-1 text-sm font-medium">
                    {item.label}
                  </motion.span>
                )}
                {sidebarOpen && item.badge && (
                  <Badge className="bg-destructive text-destructive-foreground text-xs px-1.5 py-0.5">
                    {item.badge}
                  </Badge>
                )}
              </Link>
            );
          })}
        </nav>
      </ScrollArea>

      {/* Bottom Actions */}
      <div className="p-4 border-t border-sidebar-border space-y-2">
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-start text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent",
            !sidebarOpen && "justify-center px-2"
          )}
          onClick={handleSignOut}
        >
          <LogOut className="w-5 h-5" />
          {sidebarOpen && <span className="ml-3">Sign Out</span>}
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Desktop Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: sidebarOpen ? 280 : 80 }}
        className="hidden lg:flex flex-col fixed left-0 top-0 h-screen bg-sidebar border-r border-sidebar-border z-40"
      >
        <SidebarContent />

        {/* Toggle Button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-background border shadow-md"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <ChevronRight className={cn("w-4 h-4 transition-transform", sidebarOpen && "rotate-180")} />
        </Button>
      </motion.aside>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 bg-foreground/50 z-40"
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", damping: 25 }}
              className="lg:hidden fixed left-0 top-0 h-screen w-[280px] bg-sidebar z-50"
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className={cn("transition-all duration-300", sidebarOpen ? "lg:ml-[280px]" : "lg:ml-20")}>
        {/* Top Bar */}
        <header className="sticky top-0 z-30 bg-background/95 backdrop-blur border-b border-border">
          <div className="flex items-center justify-between h-16 px-4 lg:px-8">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setMobileOpen(true)}
              >
                <Menu className="w-5 h-5" />
              </Button>
              <h1 className="font-display text-xl font-bold">
                {isAdmin ? 'Admin Dashboard' : 'Overview'}
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
              </Button>
              <Avatar className="h-9 w-9 border-2 border-primary/20">
                <AvatarImage src="" />
                <AvatarFallback className="bg-primary/10 text-primary font-semibold text-sm">
                  {user?.email?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-4 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
