import { redirect } from "next/navigation";
import { getCollections } from "../getCollections";
import { CollectionsView } from "../CollectionsView";
import { isNoDelete } from "@/utils/isNoDelete";

const Page = async ({ params }: { params: Promise<{ path: string[] }> }) => {
  const { path } = await params;
  const decodedPath = path.map((segment) => decodeURIComponent(segment));
  const collections = await getCollections();
  if (!collections.some((collection) => collection.name === decodedPath[0])) {
    if (collections.length > 0) {
      redirect(`/collections/${encodeURIComponent(collections[0].name)}`);
    }
    redirect("/collections");
  }
  return <CollectionsView collections={collections} path={decodedPath} hideDeleteButton={isNoDelete()} />;
};

export default Page;
