import { redirect } from "next/navigation";
import { getCollections } from "../getCollections";
import { CollectionsView } from "../CollectionsView";

const Page = async ({ params }: { params: Promise<{ name: string }> }) => {
  const { name } = await params;
  const decodedName = decodeURIComponent(name);
  const collections = await getCollections();
  if (!collections.some((collection) => collection.name === decodedName)) {
    if (collections.length > 0) {
      redirect(`/collections/${encodeURIComponent(collections[0].name)}`);
    }
    redirect("/collections");
  }
  return <CollectionsView collections={collections} selectedCollectionName={decodedName} />;
};

export default Page;
