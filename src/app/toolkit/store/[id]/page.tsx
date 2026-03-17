import PromptStoreDetailView from '@/views/prompt-store/detail';

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ mediaType?: string; aspectRatio?: string }>;
};

export default async function StoreDetailPage({ params, searchParams }: Props) {
  const { id } = await params;
  const { mediaType = 'image', aspectRatio = '1:1' } = await searchParams;

  return (
    <PromptStoreDetailView
      id={id}
      mediaType={mediaType as 'image' | 'video'}
      aspectRatio={aspectRatio as '1:1' | '16:9' | '9:16'}
    />
  );
}
