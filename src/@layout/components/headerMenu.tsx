'use client';

import { useState } from 'react';
import { IconMenu2 } from '@tabler/icons-react';
import { Button } from '@/components/ui/button';
import { DrawerPrimitive } from '@/components/ui/drawer';

export function HeaderMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button variant="ghost" size="icon" onClick={() => setIsOpen(true)}>
        <IconMenu2 />
      </Button>

      <DrawerPrimitive.Root
        direction="right"
        open={isOpen}
        onOpenChange={setIsOpen}
      >
        <DrawerPrimitive.Portal>
          <DrawerPrimitive.Overlay className="fixed inset-0 z-50 bg-black/60" />
          <DrawerPrimitive.Content className="fixed right-0 top-0 bottom-0 z-50 flex w-[100vw] md:w-[350px]  flex-col bg-background outline-none">
            <DrawerPrimitive.Title className="sr-only">
              HIII
            </DrawerPrimitive.Title>
          </DrawerPrimitive.Content>
        </DrawerPrimitive.Portal>
      </DrawerPrimitive.Root>
    </>
  );
}
