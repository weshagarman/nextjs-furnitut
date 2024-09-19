import { Image } from "@/components/image";
import { Typography } from "../block-fragments/typography";
export const Banner = ({ block }: { block: any }) => {
  if (block === null) return null;
  const { banner } = block;
  const image = banner?.[0];
  const width = image?.variants?.[0]?.width;
  const height = image?.variants?.[0]?.height;
  const styles = {
    aspectRatio: `${width}/${height}`,
  } as React.CSSProperties;
  return (
    <div className="flex-col flex items-center max-w-screen-2xl mx-auto">
      <Typography {...block} />
      {image && (
        <div className="pt-24 max-w-screen-xl w-full h-auto" style={styles}>
          <Image {...image} className="rounded-3xl overflow-hidden" />
        </div>
      )}
    </div>
  );
};
