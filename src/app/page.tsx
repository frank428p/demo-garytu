import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <></>
    // <div className="p-6">
    //   <div className="mb-6 flex items-center gap-2 overflow-x-auto">
    //     {[
    //       'Trending',
    //       'New',
    //       'Photography',
    //       'Illustration',
    //       '3D',
    //       'Anime',
    //       'Abstract',
    //       'Landscape',
    //     ].map((tab, i) => (
    //       <Button
    //         key={tab}
    //         variant={i === 0 ? 'default' : 'secondary'}
    //         className="rounded-full"
    //       >
    //         {tab}
    //       </Button>
    //     ))}
    //   </div>

    //   <div className="columns-2 gap-4 sm:columns-3 lg:columns-4 xl:columns-5">
    //     {Array.from({ length: 30 }, (_, i) => ((i * 3 + 5) % 7) + 1).map(
    //       (n, i) => {
    //         const heights = [200, 260, 320, 180, 240, 300, 220, 280];
    //         const h = heights[i % heights.length];
    //         return (
    //           <div
    //             key={i}
    //             className="mb-4 break-inside-avoid overflow-hidden rounded-xl border border-border bg-card transition-transform hover:scale-[1.02]"
    //           >
    //             <div className="aspect-[3/4]  bg-slate-800">
    //               <img
    //                 className="h-full w-full object-cover"
    //                 src={`/images/fake/prompt-${n}.JPG`}
    //                 alt="Member photo"
    //               />
    //             </div>

    //             <div className="p-3">
    //               <p className="text-sm font-medium text-card-foreground">
    //                 AI Artwork #{i + 1}
    //               </p>
    //               <p className="mt-1 text-xs text-muted-foreground">
    //                 by Creator {(i % 5) + 1}
    //               </p>
    //             </div>
    //           </div>
    //         );
    //       },
    //     )}
    //   </div>
    // </div>
  );
}
