import { redirect } from "next/navigation";
import { getCollections } from "./getCollections";
import { CollectionsView } from "./CollectionsView";
import { isNoDelete } from "@/utils/isNoDelete";

const Page = async () => {
  const collections = await getCollections();
  if (collections.length > 0) {
    redirect(`/collections/${encodeURIComponent(collections[0].name)}`);
  }
  return <CollectionsView collections={collections} path={[]} hideDeleteButton={isNoDelete()} />;
};

export default Page;
