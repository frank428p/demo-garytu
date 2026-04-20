'use client';

import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { cn } from '@/lib/utils';
import { IconX } from '@tabler/icons-react';
import { Button } from './button';
import { useBreakpoint } from '@/@core/hooks/useBreakpoint';

const Dialog = DialogPrimitive.Root;

const DialogTrigger = DialogPrimitive.Trigger;

const DialogPortal = DialogPrimitive.Portal;

const DialogClose = DialogPrimitive.Close;

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      'fixed inset-0 z-50 bg-black/32 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      className,
    )}
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

type DialogContentProps = React.ComponentPropsWithoutRef<
  typeof DialogPrimitive.Content
> & {
  variant?: 'default' | 'outline';
};

const DialogContent = React.forwardRef<HTMLDivElement, DialogContentProps>(
  ({ className, children, variant = 'default', ...props }, ref) => {
    const closeRef = React.useRef<HTMLButtonElement>(null);
    const { isMobile } = useBreakpoint();

    return (
      <DialogPortal>
        <DialogOverlay />
        <DialogPrimitive.Content
          onInteractOutside={(e) => e.preventDefault()}
          onPointerDownOutside={(e) => e.preventDefault()}
          className={cn(
            'fixed inset-0 z-50 overflow-y-auto outline-none',
            variant === 'outline' && 'bg-black/32 backdrop-blur-sm',
          )}
        >
          <div
            className={cn(
              'flex min-h-full items-center justify-center p-4 sm:p-8',
              variant === 'outline' && 'my-2',
            )}
            onMouseDown={(e) => {
              if (e.target === e.currentTarget) {
                closeRef.current?.click();
              }
            }}
          >
            {variant === 'outline' ? (
              <div
                ref={ref}
                className={cn(
                  'relative max-w-lg border-[2px] border-input bg-card shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 rounded-[16px]',
                  className,
                )}
                style={{ overflow: 'visible' }}
                {...props}
              >
                <DialogPrimitive.Close asChild ref={closeRef}>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={cn(
                      'absolute top-2 -right-11 z-10 rounded-lg border-input hover:bg-secondary',
                      isMobile && 'right-0 -top-10',
                    )}
                  >
                    <IconX stroke={3} />
                    <span className="sr-only">Close</span>
                  </Button>
                </DialogPrimitive.Close>
                <div className="flex-1 min-h-0 w-full h-full overflow-hidden rounded-[14px]">
                  {children}
                </div>
              </div>
            ) : (
              <div
                ref={ref}
                className={cn(
                  'relative max-w-lg border-[2px] border-input bg-card p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 rounded-[16px]',
                  className,
                )}
                {...props}
              >
                {children}
                <DialogPrimitive.Close asChild ref={closeRef}>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-[6px] top-[6px] rounded-lg"
                  >
                    <IconX stroke={3} />
                    <span className="sr-only">Close</span>
                  </Button>
                </DialogPrimitive.Close>
              </div>
            )}
          </div>
        </DialogPrimitive.Content>
      </DialogPortal>
    );
  },
);
DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'flex flex-col space-y-1.5 text-center sm:text-left',
      className,
    )}
    {...props}
  />
);
DialogHeader.displayName = 'DialogHeader';

const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2',
      className,
    )}
    {...props}
  />
);
DialogFooter.displayName = 'DialogFooter';

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      'text-lg font-semibold leading-none tracking-tight',
      className,
    )}
    {...props}
  />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
};
