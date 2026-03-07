import { DEFAULT_LIMIT } from "@/constants";
import { loadProductFilter } from "@/modules/products/search-params";
import { ProductListView } from "@/modules/products/ui/views/product-list-view";
import { caller, getQueryClient, trpc } from "@/trpc/server";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { SearchParams } from "nuqs/server";


interface Props {
    params: Promise<{
        category: string;
    }>,
    searchParams: Promise<SearchParams>;

}

const Page = async ({ params, searchParams }: Props) => {
    const { category } = await params;
    const filters = await loadProductFilter(searchParams)

    const queryClient = getQueryClient()
    void queryClient.prefetchInfiniteQuery(trpc.products.getMany.infiniteQueryOptions({
        ...filters,
        category,
        limit: DEFAULT_LIMIT
    }))


    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <ProductListView category={category} />
        </HydrationBoundary>
    )
}

export default Page;