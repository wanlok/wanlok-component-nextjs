import { getCollections } from "./getCollections";
import { CollectionsView } from "./CollectionsView";

const Page = async () => {
  const collections = await getCollections();
  return <CollectionsView collections={collections} />;
};

export default Page;
