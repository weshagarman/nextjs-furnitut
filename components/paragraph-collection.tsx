import { ContentTransformer } from '@crystallize/reactjs-components';
import { Paragraph } from '@/generated/graphql';
import { Image } from './image';
import clsx from 'classnames';

type ParagraphCollectionProps = {
    paragraphs?: Paragraph[];
};

export const ParagraphCollection = ({ paragraphs }: ParagraphCollectionProps) => {
    return paragraphs?.map((paragraph, index) => (
        <div key={index} className="frntr-paragraph  w-auto py-6 first:pt-0">
            <div className="mb-10 mx-auto">
                <h2 className="font-medium mb-2 mt-10 text-2xl">{paragraph.title}</h2>
                <div className="frntr-content-transformer text-lg leading-8 [&>ul]:list-disc [&>ol]:list-decimal [&>ol]:list-inside [&>ul]:list-inside [&>ul]:pl-6 [&>ol]:pl-6 [&>ul]:py-6 [&>ol]:py-6">
                    <ContentTransformer json={paragraph.body} />
                </div>
                <div className="mt-6 grid grid-cols-2 mb-6 pb-6 gap-4 [&_.img-landscape]:col-span-2">
                    {paragraph.images?.map((image, index) => (
                        <Image
                            key={index}
                            {...image}
                            preserveRatio
                            sizes={index > 0 ? '400px' : '800px'}
                            showShowcases={!!image?.showcases?.length}
                            className={clsx(
                                'overflow-hidden rounded-2xl border border-muted bg-light relative h-full max-w-full',
                                '[&_img]:object-cover [&_img]:max-w-none [&_img]:w-full [&_img]:h-full [&_figure]:h-full',
                                { 'col-span-2!': index === 0 },
                            )}
                            loading={'lazy'}
                        />
                    ))}
                </div>
            </div>
        </div>
    ));
};
