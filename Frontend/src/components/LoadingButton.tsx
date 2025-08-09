
import React from 'react';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

interface LoadingButtonProps {
  children: React.ReactNode;
  isLoading?: boolean;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

export const LoadingButton: React.FC<LoadingButtonProps> = ({
  children,
  isLoading = false,
  onClick,
  className = '',
  disabled = false,
}) => {
  return (
    <Button
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`relative overflow-hidden transition-all duration-200 hover:scale-105 active:scale-95 ${className}`}
    >
      {isLoading && (
        <div className="absolute inset-0 bg-primary/90 flex items-center justify-center">
          <Loader2 className="h-5 w-5 animate-spin text-primary-foreground" />
        </div>
      )}
      <span className={isLoading ? 'opacity-0' : 'opacity-100'}>
        {children}
      </span>
    </Button>
  );
};
