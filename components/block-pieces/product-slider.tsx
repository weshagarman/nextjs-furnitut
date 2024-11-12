import { Typography } from '../block-fragments/typography';
import { Slider } from '../slider';
import { Product } from '@/components/product';

export const ProductSlider = ({ block }: { block: any }) => {
    if (block === null) return null;
    const { products } = block;
    return (
        <div className="flex-col flex items-center py-12">
            <Typography {...block} />
            {[...products.variants].length > 1 && (
                <div className="w-full pb-24">
                    <Slider options={{ loop: true, align: 'start' }}>
                        {[...products.variants].map((item: any) => {
                            return (
                                <Product
                                    product={{
                                        name: item.name,
                                        path: item.product.path,
                                        defaultVariant: {
                                            firstImage: item.firstImage,
                                            sku: item.sku,
                                            defaultPrice: item.defaultPrice,
                                        },
                                    }}
                                    key={item.product.path}
                                />
                            );
                        })}
                    </Slider>
                </div>
            )}
        </div>
    );
};
