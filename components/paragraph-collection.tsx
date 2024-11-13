import { ContentTransformer } from '@crystallize/reactjs-components';
import { Paragraph } from '@/generated/graphql';
import { Image } from './image';
export const ParagraphCollection: React.FC<{ paragraphs: Paragraph[] }> = ({ paragraphs }) => {
    if (paragraphs.length === 0) {
        return null;
    }
    return (
        <>
            {paragraphs.map((paragraph, index) => (
                <div key={index} className="frntr-paragraph  w-auto py-6 first:pt-0">
                    <div className="mb-10 mx-auto">
                        <h2 className="font-medium mb-2 mt-10 text-2xl">{paragraph.title}</h2>
                        <div className="frntr-content-transformer text-lg leading-8">
                            <ContentTransformer json={paragraph.body} />
                        </div>
                        {paragraph.images?.map((image, index) => {
                            const hasShowcases = image?.showcases?.length > 0;
                            return (
                                <div key={index} className="rounded-2xl my-6 overflow-hidden">
                                    <Image {...image} preserveRatio={true} showShowcases={hasShowcases} />
                                </div>
                            );
                        })}
                    </div>
                </div>
            ))}
        </>
    );
};
