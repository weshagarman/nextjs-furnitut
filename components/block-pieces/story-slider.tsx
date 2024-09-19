import { Typography } from "../block-fragments/typography";
import { Slider } from "../slider/index";
import { Story } from "@/components/story";
export const StorySlider = ({ block }: { block: any }) => {
  if (block === null) return null;
  const { stories } = block;

  return (
    <div className="flex-col flex items-center  mx-auto py-24">
      <Typography {...block} />
      <div className="w-full py-12 ">
        <Slider options={{ loop: true, align: "start" }} type="story">
          {stories.items.map((item: any) => (
            <Story story={item.resolvedItem} />
          ))}
        </Slider>
      </div>
    </div>
  );
};
