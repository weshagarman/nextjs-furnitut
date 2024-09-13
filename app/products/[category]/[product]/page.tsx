import { ParagraphCollection } from "@/components/paragraph-collection";
import { FetchProductDocument, FetchProductQuery, Paragraph } from "@/generated/graphql";
import { apiRequest } from "@/utils/api-request";
import { ContentTransformer } from "@crystallize/reactjs-components";
import { TypedDocumentNode } from "@graphql-typed-document-node/core";

const fetchData = async <Result, Variables>(
	query: TypedDocumentNode<Result, Variables>,
	variables: Variables
) => {
	const response = (await apiRequest(query, variables)) as {
		data: FetchProductQuery;
	};
	return response.data.browse?.product?.hits?.[0];
};

export default async function Products({
	params,
}: {
	params: {
		category: string;
		product: string;
	};
}) {
	const product = await fetchData(FetchProductDocument, {
		path: `/products/${params.category}/${params.product}`,
	});
  const story = (product?.story ?? []).filter(
    (paragraph): paragraph is Paragraph => paragraph !== null && paragraph !== undefined
  );
	return (
		<main>
			<h1>{product?.name}</h1>
			<ContentTransformer json={product?.description?.[0]} />
			<ParagraphCollection paragraphs={story} />
			<div>
				{product?.variants?.map((variant) => (
					<div key={variant?.name}>{variant?.name}</div>
				))}
			</div>
		</main>
	);
}
