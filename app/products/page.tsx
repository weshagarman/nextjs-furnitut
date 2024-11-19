import { Breadcrumb } from '@/components/breadcrumb';
import { FetchAllCategoriesQuery } from '@/generated/graphql';
import { FetchAllCategoriesDocument } from '@/generated/graphql';
import { apiRequest } from '@/utils/api-request';
import { TypedDocumentNode } from '@graphql-typed-document-node/core';
import Link from 'next/link';
import { Blocks } from '@/components/blocks';
export const revalidate = 4;

const fetchData = async <Result, Variables>(query: TypedDocumentNode<Result, Variables>) => {
    const response = (await apiRequest(query)) as {
        data: FetchAllCategoriesQuery;
    };

    return response.data.browse?.category?.hits?.[0];
};

export default async function Products() {
    const mainCategory = await fetchData(FetchAllCategoriesDocument);
    const breadcrumbs = mainCategory?.breadcrumbs?.[0];
    const { blocks } = mainCategory || {};
    return (
        <main>
            <div className="page  pb-6">
                {breadcrumbs && <Breadcrumb breadcrumbs={breadcrumbs} />}
                <h1 className="text-4xl font-bold py-4">{mainCategory?.name}</h1>
                <div className="gap-4 flex">
                    {mainCategory?.children?.hits?.map((child) => (
                        <Link href={child?.path} key={child?.id} className="bg-dark text-light rounded-full px-4 py-2">
                            {child?.name}
                        </Link>
                    ))}
                </div>
            </div>
            {blocks && (
                <div className="min-h-screen pt-12">
                    <Blocks blocks={mainCategory?.blocks || []} />
                </div>
            )}
        </main>
    );
}
