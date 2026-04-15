'use client';

import { useState, useCallback, useMemo } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {
  IconChevronLeft,
  IconChevronRight,
  IconZoomIn,
  IconZoomOut,
  IconZoomReset,
} from '@tabler/icons-react';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const SCALE_STEP = 0.25;
const SCALE_MIN = 0.5;
const SCALE_MAX = 3;

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  url: string;
  title?: string;
};

export function PdfViewerDialog({ open, onOpenChange, url, title }: Props) {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.25);

  const token = typeof document !== 'undefined'
    ? document.cookie.split('; ').find(r => r.startsWith('access_token='))?.split('=')[1]
    : undefined;

  const file = useMemo(
    () => ({ url, httpHeaders: token ? { Authorization: `Bearer ${token}` } : {} }),
    [url, token],
  );

  const onDocumentLoadSuccess = useCallback(({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setPageNumber(1);
  }, []);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl w-full h-[90vh] flex flex-col gap-0 p-0 overflow-hidden">
        <DialogTitle className="sr-only">{title}</DialogTitle>

        <div className="flex-1 overflow-auto flex justify-center bg-muted/30 p-4">
          <Document
            file={file}
            onLoadSuccess={onDocumentLoadSuccess}
            loading={
              <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
                Loading...
              </div>
            }
            error={
              <div className="flex items-center justify-center h-full text-destructive text-sm">
                Failed to load PDF.
              </div>
            }
          >
            <Page
              pageNumber={pageNumber}
              scale={scale}
              renderTextLayer
              renderAnnotationLayer
            />
          </Document>
        </div>

        <div className="flex items-center justify-between px-4 py-3 border-t border-border bg-card shrink-0">
          {/* Page navigation */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              disabled={pageNumber <= 1}
              onClick={() => setPageNumber((p) => p - 1)}
            >
              <IconChevronLeft className="size-5" />
            </Button>
            <span className="text-sm text-muted-foreground min-w-[60px] text-center">
              {numPages > 0 ? `${pageNumber} / ${numPages}` : '—'}
            </span>
            <Button
              variant="ghost"
              size="icon"
              disabled={pageNumber >= numPages}
              onClick={() => setPageNumber((p) => p + 1)}
            >
              <IconChevronRight className="size-5" />
            </Button>
          </div>

          {/* Zoom controls */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              disabled={scale <= SCALE_MIN}
              onClick={() => setScale((s) => Math.max(SCALE_MIN, +(s - SCALE_STEP).toFixed(2)))}
            >
              <IconZoomOut className="size-5" />
            </Button>
            <span className="text-sm text-muted-foreground w-12 text-center">
              {Math.round(scale * 100)}%
            </span>
            <Button
              variant="ghost"
              size="icon"
              disabled={scale >= SCALE_MAX}
              onClick={() => setScale((s) => Math.min(SCALE_MAX, +(s + SCALE_STEP).toFixed(2)))}
            >
              <IconZoomIn className="size-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              disabled={scale === 1.25}
              onClick={() => setScale(1.25)}
            >
              <IconZoomReset className="size-5" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
