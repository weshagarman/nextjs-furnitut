import { Typography } from "../block-fragments/typography";
import { Slider } from "../slider";
import { Product } from "@/components/product";

export const ProductSlider = ({ block }: { block: any }) => {
  if (block === null) return null;
  const { products } = block;
  return (
    <div className="flex-col flex items-center py-12">
      <Typography {...block} />
      <div className="w-full py-24 ">
        <Slider options={{ loop: true, align: "start" }}>
          {products.skus.map((item: any) => (
            <Product
              product={{
                name: item,
                path: "/",
                description: "Something in here",
                defaultVariant: {
                  firstImage: null,
                  sku: item,
                },
              }}
            />
          ))}
        </Slider>
      </div>
    </div>
  );
};
