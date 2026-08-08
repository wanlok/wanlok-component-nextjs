import { redirect } from "next/navigation";
import { getCollections } from "./getCollections";
import { CollectionsView } from "./CollectionsView";

const Page = async () => {
  const collections = await getCollections();
  if (collections.length > 0) {
    redirect(`/collections/${encodeURIComponent(collections[0].name)}`);
  }
  return <CollectionsView collections={collections} selectedCollectionName={undefined} path={[]} />;
};

export default Page;
