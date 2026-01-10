'use client';

import { useEffect, useState } from 'react';
import { Bell, LayoutGrid, Menu, MessageCircleMore, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useScrollPosition } from '@/hooks/use-scroll-position';
import { Button } from '@/components/metronic/ui/button';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function MetronicNavbar() {
  const pathname = usePathname();
  const scrollPosition = useScrollPosition();
  const headerSticky: boolean = scrollPosition > 0;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        'fixed top-0 z-50 w-full border-b border-transparent bg-background transition-all',
        headerSticky && 'border-border shadow-sm',
      )}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <span className="text-primary">Finance</span>
            <span>Focus</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/dashboard"
            className={cn(
              'text-sm font-medium transition-colors hover:text-primary',
              pathname === '/dashboard' ? 'text-primary' : 'text-muted-foreground',
            )}
          >
            Dashboard
          </Link>
          <Link
            href="/transactions"
            className={cn(
              'text-sm font-medium transition-colors hover:text-primary',
              pathname === '/transactions' ? 'text-primary' : 'text-muted-foreground',
            )}
          >
            Transactions
          </Link>
          <Link
            href="/budgets"
            className={cn(
              'text-sm font-medium transition-colors hover:text-primary',
              pathname === '/budgets' ? 'text-primary' : 'text-muted-foreground',
            )}
          >
            Budgets
          </Link>
          <Link
            href="/categories"
            className={cn(
              'text-sm font-medium transition-colors hover:text-primary',
              pathname === '/categories' ? 'text-primary' : 'text-muted-foreground',
            )}
          >
            Catégories
          </Link>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="hidden md:flex size-9 rounded-full hover:bg-primary/10 hover:text-primary"
          >
            <Search className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="hidden md:flex size-9 rounded-full hover:bg-primary/10 hover:text-primary"
          >
            <Bell className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="hidden md:flex size-9 rounded-full hover:bg-primary/10 hover:text-primary"
          >
            <MessageCircleMore className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="hidden md:flex size-9 rounded-full hover:bg-primary/10 hover:text-primary"
          >
            <LayoutGrid className="h-4 w-4" />
          </Button>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="h-5 w-5" />
          </Button>

          {/* User Avatar */}
          <div className="hidden md:flex items-center gap-2 ml-2">
            <div className="h-9 w-9 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-white font-semibold text-sm cursor-pointer border-2 border-primary/20">
              U
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <nav className="container mx-auto flex flex-col py-4 px-4 gap-2">
            <Link
              href="/dashboard"
              className={cn(
                'px-4 py-2 rounded-md text-sm font-medium transition-colors',
                pathname === '/dashboard'
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-accent',
              )}
            >
              Dashboard
            </Link>
            <Link
              href="/transactions"
              className={cn(
                'px-4 py-2 rounded-md text-sm font-medium transition-colors',
                pathname === '/transactions'
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-accent',
              )}
            >
              Transactions
            </Link>
            <Link
              href="/budgets"
              className={cn(
                'px-4 py-2 rounded-md text-sm font-medium transition-colors',
                pathname === '/budgets'
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-accent',
              )}
            >
              Budgets
            </Link>
            <Link
              href="/categories"
              className={cn(
                'px-4 py-2 rounded-md text-sm font-medium transition-colors',
                pathname === '/categories'
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-accent',
              )}
            >
              Catégories
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
