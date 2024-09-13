import {
	FetchCategoryDocument,
	FetchCategoryQuery,
} from "@/generated/graphql";
import { apiRequest } from "@/utils/api-request";
import { TypedDocumentNode } from "@graphql-typed-document-node/core";

const fetchData = async <Result, Variables>(
	query: TypedDocumentNode<Result, Variables>,
	variables: Variables
) => {
	const response = (await apiRequest(query, variables)) as {
		data: FetchCategoryQuery;
	};

	return response.data.browse?.category?.hits?.[0];
};

export default async function Products({
	params,
}: {
	params: {
		category: string;
	};
}) {
	const category = await fetchData(FetchCategoryDocument, {
		path: `/products/${params.category}`,
	});
	return (
		<main>
			<h1>{category?.name}</h1>
			<div>
				{category?.children?.hits?.map(
					(child) =>
						child?.__typename === "product" && (
							<div key={child?.path}>{child?.name}</div>
						)
				)}
			</div>
		</main>
	);
}
