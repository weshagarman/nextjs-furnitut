import { FetchAllCategoriesQuery } from "@/generated/graphql";
import { FetchAllCategoriesDocument } from "@/generated/graphql";
import { apiRequest } from "@/utils/api-request";
import { TypedDocumentNode } from "@graphql-typed-document-node/core";

const fetchData = async <Result, Variables>(
	query: TypedDocumentNode<Result, Variables>
) => {
	const response = (await apiRequest(query)) as {
		data: FetchAllCategoriesQuery;
	};

	return response.data.browse?.category?.hits?.[0];
};

export default async function Products() {
	const mainCategory = await fetchData(FetchAllCategoriesDocument);
	return (
		<main>
			<h1>{mainCategory?.name}</h1>
			<div>
				{mainCategory?.children?.hits?.map((child) => (
					<div key={child?.id}>{child?.name}</div>
				))}
			</div>
		</main>
	);
}
