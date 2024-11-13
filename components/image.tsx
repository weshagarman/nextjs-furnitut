import { Image as CrystallizeImage } from '@crystallize/reactjs-components';
import classNames from 'classnames';
import { Price } from './price';

export const Image = ({
    className,
    focalPoint,
    preserveRatio = false,
    showShowcases = false,
    ...image
}: {
    className?: string;
    focalPoint?: any;
    preserveRatio?: boolean;
    showShowcases?: boolean;
}) => {
    const styles = {
        '--focus-x': focalPoint?.x,
        '--focus-y': focalPoint?.y,
        aspectRatio: preserveRatio ? `${image?.variants?.[0].width || 'auto'}/${image?.variants?.[0].height}` : 'auto',
    } as React.CSSProperties;
    return (
        <div
            className={classNames(`${className || ''} `, {
                'crystallize-image': !preserveRatio,
                relative: showShowcases,
            })}
            style={styles}
        >
            {showShowcases && (
                <div className="absolute top-0 left-0 w-full h-full">
                    {image?.showcases?.map((showcase, index) => (
                        <HotSpot key={index} showcase={showcase} />
                    ))}
                </div>
            )}
            <CrystallizeImage {...image} alt={image?.altText} />
        </div>
    );
};

export const HotSpot = ({ showcase }: { showcase: any }) => {
    if (!showcase?.hotspot?.x) return null;
    const x = showcase?.hotspot.x * 100;
    const y = showcase?.hotspot.y * 100;
    const product = showcase?.items?.[0] || showcase?.variants?.[0];
    const image = product?.firstImage || product?.defaultVariant?.firstImage;
    const price = product?.defaultPrice || product?.defaultVariant?.defaultPrice;
    return (
        <div
            className="group absolute w-8 h-8 flex items-center justify-center rounded-full bg-light/40 -translate-x-1/2 -translate-y-1/2"
            style={{
                left: `${x}%`,
                top: `${y}%`,
            }}
        >
            <div className="bg-light w-4 h-4 rounded-full z-10"></div>
            <div className="group-hover:w-auto group-hover:h-auto top-0 absolute w-0 h-0 overflow-hidden bg-dark left-0 rounded-lg transition-all">
                {product && (
                    <div className="pl-8 gap-4 flex w-full text-light py-2 pr-6 text-sm items-center">
                        <div className="w-12 overflow-hidden rounded shrink-0 [&_img]:object-cover">
                            <CrystallizeImage {...image} alt={image?.altText} className="h-full w-full" />
                        </div>
                        <div className="flex flex-col overflow-hidden gap-1">
                            <span className="overflow-ellipsis text-nowrap w-full">{product.name}</span>
                            <span className="text-xs font-medium">
                                <Price price={price} />
                            </span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
