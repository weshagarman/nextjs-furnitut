import { crystallizeClient } from '../core/crystallize-client.server';

export const generateProductAndCategoryStaticPages = async () => {
    // Fetches first 6 categories and first 25 products of each categories for static generation, the rest we leave dynamic.
    // Note: This is a lazy implementation, you should NOT do this since the complexity of the query can quickly explode and
    // become a problem if you fetch multiple categories and products.

    let result = [];
    try {
        const data = await crystallizeClient.catalogueApi(
            `#graphql
          query FETCH_PATHS {
                catalogue(path: "/products") {
                    subtree(first: 6) {
                    edges {
                        node {
                        subtree(first: 25) {
                            edges {
                            node {
                                path
                            }
                            }
                        }
                        }
                    }
                    }
                }
                }
            `,
        );
        for (const edge of data.catalogue.subtree.edges) {
            for (const node of edge.node.subtree.edges) {
                const pathArray = node.node.path.split('/');
                const product = pathArray[pathArray.length - 1];
                const category = pathArray[pathArray.length - 2];
                result.push({
                    params: {
                        category,
                        product,
                    },
                });
            }
        }
    } catch (exception) {
        console.error('Could not fetch paths for catalogue ', exception);
        throw exception;
    }
    return result;
};

export default generateProductAndCategoryStaticPages;
