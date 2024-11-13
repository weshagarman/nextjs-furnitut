import { FetchProductDocument, FetchProductQuery, Paragraph } from '@/generated/graphql';
import classNames from 'classnames';
import { ContentTransformer } from '@crystallize/reactjs-components';
import { TypedDocumentNode } from '@graphql-typed-document-node/core';
import { apiRequest } from '@/utils/api-request';
import { Breadcrumb } from '@/components/breadcrumb';
import { Price } from '@/components/price';
import { Image } from '@/components/image';
import { Image as CrystallizeImage } from '@crystallize/reactjs-components';
import { VariantSelector, findSuitableVariant } from '@/components/variant-selector';
import { Slider } from '@/components/slider';
import { Product } from '@/components/product';
import { Accordination } from '@/components/accordination';
import { AddToCartButton } from '@/components/add-to-cart-button';
import { ParagraphCollection } from '@/components/paragraph-collection';
import Link from 'next/link';
// https://nextjs.org/docs/app/api-reference/functions/generate-static-params
//https://developers.google.com/search/docs/appearance/structured-data/product-variants

const fetchData = async <Result, Variables>(query: TypedDocumentNode<Result, Variables>, variables: Variables) => {
    const response = (await apiRequest(query, variables)) as {
        data: FetchProductQuery;
    };
    return response.data.browse?.product?.hits?.[0];
};

export default async function Products({
    params,
    searchParams,
}: {
    params: {
        category: string;
        product: string;
    };
    searchParams: Record<string, string>;
}) {
    const product = await fetchData(FetchProductDocument, {
        path: `/products/${params.category}/${params.product}`,
    });
    const details = product?.details;
    const story = (product?.story ?? []).filter(
        (paragraph): paragraph is Paragraph => paragraph !== null && paragraph !== undefined,
    );
    const currentVariant = findSuitableVariant(product?.variants, searchParams) ?? product?.variants?.[0];

    const brand = product?.brand?.items?.[0];
    const { dimensions } = currentVariant;
    return (
        <>
            <main className="page">
                <div className="grid grid-cols-12 gap-24 rounded-xl">
                    <div className="col-span-7">
                        <Breadcrumb breadcrumbs={product?.breadcrumbs[0]} />
                        <div className="mt-6 grid grid-cols-2 mb-6 pb-6 ">
                            {currentVariant?.images?.map((image, index: number) => {
                                return (
                                    <div
                                        className={classNames(
                                            'overflow-hidden rounded-2xl border border-muted bg-light relative',
                                            { 'col-span-2': index === 0 },
                                        )}
                                        key={index}
                                    >
                                        <Image
                                            {...image}
                                            preserveRatio={true}
                                            className="[&_img]:max-w-none [&_img]:w-full"
                                        />
                                    </div>
                                );
                            })}
                        </div>
                        <Accordination defaultOpen={true} className="py-8" title="Product">
                            <div className="text-lg leading-10 font-normal">
                                <ParagraphCollection paragraphs={story} />
                            </div>
                        </Accordination>

                        {details && (
                            <Accordination title="Details" defaultOpen={true} className="py-8">
                                {details.map((detail, index) => (
                                    <div className="grid grid-cols-4 gap-y-4 py-8 pr-24 text-lg gap-4" key={index}>
                                        <span className="font-bold">{detail.title}</span>
                                        <span className="col-span-3">
                                            <ContentTransformer json={detail.description} />
                                        </span>
                                    </div>
                                ))}
                            </Accordination>
                        )}
                        {dimensions && (
                            <Accordination title="Dimensions" defaultOpen={true} className="py-8">
                                <div className="grid grid-cols-2 gap-x-48 gap-y-4 py-12 pr-24 text-lg">
                                    {dimensions.height && (
                                        <div className="flex justify-between">
                                            <span className="font-bold">Height</span>
                                            <span>
                                                {dimensions.height} {dimensions.heightUnit}
                                            </span>
                                        </div>
                                    )}
                                    {dimensions.width && (
                                        <div className="flex justify-between">
                                            <span className="font-bold">Width</span>
                                            <span>
                                                {dimensions.width} {dimensions.widthUnit}
                                            </span>
                                        </div>
                                    )}
                                    {dimensions.depth && (
                                        <div className="flex justify-between">
                                            <span className="font-bold">Depth</span>
                                            <span>
                                                {dimensions.depth} {dimensions.depthUnit}
                                            </span>
                                        </div>
                                    )}
                                    {dimensions.weight && (
                                        <div className="flex justify-between">
                                            <span className="font-bold">Weight</span>
                                            <span>
                                                {dimensions.weight} {dimensions.weightUnit}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </Accordination>
                        )}
                    </div>

                    <div className="col-span-5 relative">
                        <div className="flex justify-between items-center ">
                            <span className="text-xs font-bold opacity-50">{currentVariant.sku}</span>
                            {brand && (
                                <span className="w-16 h-10 relaive flex items-center">
                                    {!!brand?.logo?.[0] ? (
                                        <CrystallizeImage {...brand.logo?.[0]} className="object-contain" />
                                    ) : (
                                        brand.name
                                    )}
                                </span>
                            )}
                        </div>
                        <div className="py-4 sticky top-20">
                            <h1 className="text-2xl font-bold">
                                {product?.name} {currentVariant.name}
                            </h1>
                            <div className="line-clamp-2">
                                <ContentTransformer json={product?.description?.[0]} />
                            </div>
                            {[...product.variants].length > 1 && (
                                <div className="py-4">
                                    <VariantSelector
                                        variants={product?.variants}
                                        searchParams={searchParams}
                                        path={product?.path || '/'}
                                    />
                                </div>
                            )}
                            <div className="text-4xl flex items-center font-bold py-4 justify-between w-full">
                                <span>
                                    <Price price={currentVariant?.priceVariants.default} />
                                </span>
                                <AddToCartButton
                                    input={{
                                        variantName: currentVariant.name || product?.name || 'Variant',
                                        productName: product?.name || 'Variant',
                                        sku: currentVariant.sku,
                                        image: currentVariant.images?.[0]?.variants?.[0],
                                        quantity: 1,
                                        price: {
                                            currency: currentVariant.defaultPrice?.currency || 'EUR',
                                            gross: currentVariant.defaultPrice?.price || 0,
                                            net: currentVariant.defaultPrice?.price || 0,
                                            taxAmount: 0,
                                            discounts: [],
                                        },
                                    }}
                                />
                            </div>
                            {currentVariant?.matchingProducts?.variants?.length > 0 && (
                                <Accordination
                                    className="py-8 text-lg"
                                    title={`Matching products (${
                                        currentVariant?.matchingProducts?.variants?.length || 0
                                    })`}
                                    defaultOpen={currentVariant?.matchingProducts?.variants?.length > 0}
                                >
                                    {currentVariant?.matchingProducts?.variants?.map((product, index) => {
                                        return (
                                            <div
                                                className="flex gap-3 justify-between px-4 py-3 border items-center border-muted bg-light rounded-lg last:border-b-0"
                                                key={`${product.sku}-featured-${index}`}
                                            >
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-12 rounded overflow-hidden">
                                                        <Image {...product.firstImage} />
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <Link href={product.product.path}>{product.name}</Link>
                                                        <span className="text-sm font-bold">
                                                            <Price price={product.defaultPrice} />
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="justify-end">
                                                    <AddToCartButton
                                                        type="micro"
                                                        input={{
                                                            variantName: product.name || 'Variant',
                                                            productName: product?.name || 'Variant',
                                                            sku: product.sku,
                                                            image: product.firstImage?.variants?.[0],
                                                            quantity: 1,
                                                            price: {
                                                                currency: product.defaultPrice?.currency || 'EUR',
                                                                gross: product.defaultPrice?.price || 0,
                                                                net: currentVariant.price || 0,
                                                                taxAmount: 0,
                                                                discounts: [],
                                                            },
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        );
                                    })}
                                </Accordination>
                            )}
                            <div className="border-muted border-t"></div>
                        </div>
                    </div>
                </div>
            </main>
            <div className="mt-24">
                <div className="px-0 border-t border-muted max-w-screen-2xl pt-24  mx-auto ">
                    <h2 className="text-2xl py-4 font-bold">Related products</h2>

                    <Slider type="product" options={{ loop: false, align: 'start' }}>
                        {[...product?.relatedProducts.items].map((item, index) => {
                            return <Product product={item} key={index} />;
                        })}
                    </Slider>
                </div>
            </div>

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org/',
                        '@type': 'Product',
                        name: product?.name,
                        image: currentVariant?.[0]?.images?.[0]?.url,
                        description: product?.description?.[0]?.text,
                        sku: currentVariant?.sku,
                        offers: {
                            '@type': 'Offer',
                            price: currentVariant?.defaultPrice?.price,
                            priceCurrency: currentVariant?.defaultPrice?.currency,
                        },
                        brand: {
                            '@type': 'Brand',
                            name: 'HAY',
                        },
                        review: {
                            '@type': 'Review',
                            reviewRating: {
                                '@type': 'Rating',
                                ratingValue: '5',
                                bestRating: '5',
                            },
                        },
                    }),
                }}
            />
        </>
    );
}
