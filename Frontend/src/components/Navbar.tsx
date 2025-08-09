import React from 'react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Calculator, Menu, Sun, Moon } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

interface NavbarProps {
  darkMode: boolean;
  onDarkModeToggle: (checked: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ darkMode, onDarkModeToggle }) => {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-14 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Calculator className="h-6 w-6 text-primary" />
          <span className="font-bold text-lg hidden sm:inline">Smart Cost Estimator</span>
          <span className="font-bold text-lg sm:hidden">SCE</span>
        </div>

        {/* Desktop Dark Mode Toggle Only */}
        <div className="hidden md:flex items-center gap-4">
          <div className="flex items-center gap-2 ml-4 pl-4 border-l">
            <Sun className="h-4 w-4" />
            <Switch
              checked={darkMode}
              onCheckedChange={onDarkModeToggle}
              aria-label="Toggle dark mode"
            />
            <Moon className="h-4 w-4" />
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5 text-primary" />
                  Smart Cost Estimator
                </SheetTitle>
                <SheetDescription>
                  Navigate through the app
                </SheetDescription>
              </SheetHeader>

              {/* Just Dark Mode Toggle in Mobile */}
              <div className="pt-4 border-t mt-6">
                <div className="flex items-center justify-between">
                  <Label htmlFor="mobile-dark-mode" className="text-sm font-medium">
                    Dark Mode
                  </Label>
                  <Switch
                    id="mobile-dark-mode"
                    checked={darkMode}
                    onCheckedChange={onDarkModeToggle}
                  />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};