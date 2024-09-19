import { Image as CrystallizeImage } from "@crystallize/reactjs-components";

export const Image = ({
  className,
  focalPoint,
  preserveRatio = false,
  ...image
}: {
  className?: string;
  focalPoint?: any;
  preserveRatio?: boolean;
}) => {
  const styles = {
    "--focus-x": focalPoint?.[0], // This is focalPoint X
    "--focus-y": focalPoint?.[1], //This is focalPoint Y
    aspectRatio: preserveRatio
      ? `${image?.variants?.[0].width}/${image?.variants?.[0].height}`
      : "auto",
  } as React.CSSProperties;
  return (
    <div className={`${className} crystallize-image`} style={styles}>
      <CrystallizeImage {...image} alt={image?.altText} />
    </div>
  );
};
