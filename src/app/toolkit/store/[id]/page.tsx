import PromptStoreView from '@/views/promptStore';

type StoreDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function StoreDetailPage({
  params,
}: StoreDetailPageProps) {
  const { id } = await params;

  return <PromptStoreView initialSelectedId={id} />;
}
