import PromptStoreDetailView from '@/views/prompt-store/detail';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function StoreDetailPage({ params }: Props) {
  const { id } = await params;

  return <PromptStoreDetailView id={id} />;
}
