import { Image } from '@/components/image';
import { Video } from '@/components/video';

//@Todo: import this to next
import '@crystallize/reactjs-components/assets/video/styles.css';

export const Media = ({
    video,
    shoppableImage,
    image,
    imageProps,
    preserveRatio = false,
}: {
    video?: any;
    shoppableImage?: any;
    image?: any;
    imageProps?: any;
    preserveRatio?: boolean;
}) => {
    if (video?.[0]) {
        return <Video {...video[0]} />;
    }
    if (shoppableImage) {
        return <Image {...shoppableImage[0]} showShowcases={true} {...imageProps} preserveRatio={preserveRatio} />;
    }
    if (image?.[0]) {
        return <Image {...image[0]} {...imageProps} preserveRatio={preserveRatio} />;
    }
    return null;
};
