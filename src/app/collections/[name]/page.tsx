import { redirect } from "next/navigation";
import { getCollections } from "../getCollections";
import { CollectionsView } from "../CollectionsView";

const Page = async ({
  params,
  searchParams
}: {
  params: Promise<{ name: string }>;
  searchParams: Promise<{ path?: string | string[] }>;
}) => {
  const { name } = await params;
  const decodedName = decodeURIComponent(name);
  const { path } = await searchParams;
  const collections = await getCollections();
  if (!collections.some((collection) => collection.name === decodedName)) {
    if (collections.length > 0) {
      redirect(`/collections/${encodeURIComponent(collections[0].name)}`);
    }
    redirect("/collections");
  }
  return (
    <CollectionsView
      collections={collections}
      selectedCollectionName={decodedName}
      path={path ? (Array.isArray(path) ? path : [path]) : []}
    />
  );
};

export default Page;
