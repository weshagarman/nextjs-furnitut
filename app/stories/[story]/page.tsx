import { FetchStoryDocument, FetchStoryQuery, Paragraph } from '@/generated/graphql';
// import { generateStoryStaticPages } from '@/utils/static-story-pages';
import { apiRequest } from '@/utils/api-request';
import { TypedDocumentNode } from '@graphql-typed-document-node/core';
import { ContentTransformer } from '@crystallize/reactjs-components';
import { Image } from '@/components/image';
import { Media } from '@/components/media';
import { ParagraphCollection } from '@/components/paragraph-collection';
import classNames from 'classnames';
import { Slider } from '@/components/slider';
import { Story } from '@/components/story';
import { Price } from '@/components/price';
import Link from 'next/link';
const fetchData = async <Result, Variables>(query: TypedDocumentNode<Result, Variables>, variables: Variables) => {
    const response = (await apiRequest(query, variables)) as {
        data: FetchStoryQuery;
    };

    return response.data.browse?.story?.hits?.[0];
};

export const revalidate = 4;
// export const dynamicParams = true;
// export const generateStaticParams = generateStoryStaticPages;

export default async function Products({
    params,
}: {
    params: {
        story: string;
    };
}) {
    const article = (await fetchData(FetchStoryDocument, {
        path: `/stories/${params.story}`,
    })) satisfies FetchStoryQuery['browse']['story']['hits'][0];
    const { title, intro, media, featured, upNext } = article;

    const story = (article?.story ?? []).filter(
        (paragraph): paragraph is Paragraph => paragraph !== null && paragraph !== undefined,
    );
    return (
        <main className="mt-40">
            <div className="max-w-screen-lg mx-auto text-center mb-12">
                <h1 className="text-dark text-5xl font-medium py-4 text-balance">{title}</h1>
                <div className="text-lg  text-center mx-auto leading-8 font-medium text-dark">
                    <ContentTransformer json={intro} />
                </div>
            </div>
            <div className="max-w-screen-xl mx-auto [&_img]:w-full [&_img]:max-w-none overflow-hidden rounded-2xl ">
                <Media {...media} className="" preserveRatio={true} sizes="(max-width: 600px) 100vw, 1280px" />
            </div>
            <div className="grid grid-cols-5 max-w-screen-xl mx-auto mt-24">
                <div
                    className={classNames('col-span-3 gap-24 px-12', {
                        '!col-span-5 max-w-screen-md mx-auto': featured === null,
                    })}
                >
                    <ParagraphCollection paragraphs={story} />
                </div>
                {featured && (
                    <div className="col-span-2 px-12 pt-6">
                        <h3 className="font-bold text-sm mb-4">Featured products</h3>
                        <div className="sticky top-20 min-h-[200px] bg-light rounded-lg border border-muted flex flex-col">
                            {featured?.items?.map((product, index) => {
                                return (
                                    <div
                                        className="flex gap-3 px-4 py-3 border-b border-muted"
                                        key={`${product.defaultVariant.sku}-featured-${index}`}
                                    >
                                        <div className="w-10 h-12 rounded overflow-hidden">
                                            <Image {...product.defaultVariant.firstImage} />
                                        </div>
                                        <div className="flex flex-col">
                                            <Link href={product.path}>{product.name}</Link>
                                            <span className="text-sm font-bold">
                                                <Price price={product.defaultVariant.defaultPrice} />{' '}
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
            {upNext && (
                <div className="mt-24 px-12 max-w-screen-2xl mx-auto">
                    <div className="px-0 border-t border-muted  pt-24  ">
                        <h2 className="text-2xl  py-4 font-bold">Up next</h2>

                        <Slider type="story" options={{ loop: false, align: 'start' }}>
                            {[...upNext.items].map((item, index) => {
                                return <Story story={item} key={item.path} />;
                            })}
                        </Slider>
                    </div>
                </div>
            )}
        </main>
    );
}
