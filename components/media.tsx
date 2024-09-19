import { Image } from "@/components/image";
import { Video } from "@/components/video";

//@Todo: import this to next
import "@crystallize/reactjs-components/assets/video/styles.css";

export const Media = ({
  video,
  shoppableImage,
  image,
}: {
  video?: any;
  shoppableImage?: any;
  image?: any;
}) => {
  if (video?.[0]) {
    console.log({ video });
    return <Video {...video[0]} />;
  }
  if (shoppableImage) {
    return <div>TODO: Shoppable Image </div>;
  }
  if (image?.[0]) {
    return <Image {...image[0]} />;
  }
  return null;
};
