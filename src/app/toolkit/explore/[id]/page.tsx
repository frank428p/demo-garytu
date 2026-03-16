import ExploreView from '@/views/explore';

type ExploreDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ExploreDetailPage({
  params,
}: ExploreDetailPageProps) {
  const { id } = await params;

  return <ExploreView initialSelectedId={id} />;
}
