'use client';

import { useRef, useEffect } from 'react';
import { PDFViewer, PDFViewerRef } from '@embedpdf/react-pdf-viewer';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  url: string;
  title?: string;
};

function PdfViewerContent({ url, token }: { url: string; token?: string }) {
  const viewerRef = useRef<PDFViewerRef>(null);

  useEffect(() => {
    viewerRef.current?.container?.setTheme({ preference: 'dark' });
  }, []);

  return (
    <PDFViewer
      ref={viewerRef}
      config={{
        src: url,
        wasmUrl: '/pdfium.wasm',
        worker: false,
        theme: {
          preference: 'dark',
          dark: {
            accent: {
              primary: 'oklch(0.51 0.17 28.14)',
              primaryHover: 'oklch(0.58 0.17 28.14)',
              primaryActive: 'oklch(0.44 0.17 28.14)',
              primaryLight: 'oklch(0.27 0.06 28.14)',
              primaryForeground: 'oklch(0.99 0 0)',
            },
            interactive: {
              hover: 'oklch(1 0 0 / 8%)',
              active: 'oklch(1 0 0 / 12%)',
              selected: 'oklch(0.27 0.06 28.14)',
              focus: 'oklch(0.51 0.17 28.14)',
            },
            background: {
              app: 'oklch(0.14 0 0)',
              surface: 'oklch(0.2 0 0)',
              surfaceAlt: 'oklch(0.27 0 0)',
              elevated: 'oklch(0.2 0 0)',
              overlay: 'oklch(0 0 0 / 50%)',
              input: 'oklch(1 0 0 / 15%)',
            },
          },
        },
        disabledCategories: ['document-menu'],
        documentManager: token
          ? {
              initialDocuments: [
                {
                  url,
                  autoActivate: true,
                  requestOptions: {
                    headers: { Authorization: `Bearer ${token}` },
                  },
                },
              ],
            }
          : undefined,
      }}
      style={{ width: '100%', height: '100%' }}
    />
  );
}

export function PdfViewerDialog({ open, onOpenChange, url, title }: Props) {
  const token =
    typeof document !== 'undefined'
      ? document.cookie
          .split('; ')
          .find((r) => r.startsWith('access_token='))
          ?.split('=')[1]
      : undefined;

  return (
    <Dialog open={open} onOpenChange={onOpenChange} modal={false}>
      <DialogContent
        className="max-w-4xl w-full h-[90vh] flex flex-col gap-0 p-0 overflow-hidden"
        variant="outline"
      >
        <DialogTitle className="sr-only">{title}</DialogTitle>
        {open && url && <PdfViewerContent key={url} url={url} token={token} />}
      </DialogContent>
    </Dialog>
  );
}
