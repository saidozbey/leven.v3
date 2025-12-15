'use client';

import type { LucideIcon } from 'lucide-react';
import { Spinner } from '@/components/ui/spinner';

type ButtonVariant = 'primary' | 'secondary' | 'outline';

interface ActionButtonProps {
  onClick: () => void;
  disabled?: boolean;
  loading?: boolean;
  icon?: LucideIcon;
  variant?: ButtonVariant;
  children: React.ReactNode;
  className?: string;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50 disabled:cursor-not-allowed',
  secondary:
    'bg-white text-black hover:bg-neutral-200 disabled:opacity-50 disabled:cursor-not-allowed',
  outline:
    'bg-white/10 text-white hover:bg-white/20 border border-white/20 disabled:opacity-50 disabled:cursor-not-allowed',
};

export function ActionButton({
  onClick,
  disabled = false,
  loading = false,
  icon: Icon,
  variant = 'primary',
  children,
  className = '',
}: ActionButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`px-6 py-3 rounded-xl font-medium flex items-center gap-2 pointer-events-auto transition-all active:scale-95 ${variantClasses[variant]} ${className}`}
    >
      {loading ? (
        <Spinner size="sm" />
      ) : Icon ? (
        <Icon size={18} />
      ) : null}
      {children}
    </button>
  );
}
