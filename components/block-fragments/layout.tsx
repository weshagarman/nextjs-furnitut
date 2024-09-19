import classNames from "classnames";
import { Media } from "@/components/media";
export const BlockLayout = ({
  block,
  children,
}: {
  block: any;
  children: any;
}) => {
  const { layout, isFirstBlock } = block;
  const { displayWidth, theme, backgroundMedia } = layout;
  const isFullWidth = "stretch" in displayWidth;
  const selectedTheme = Object.keys(theme)[0];

  return (
    <div
      className={classNames(
        `w-full mx-auto block pt-24  pb-24 block-bg`,
        {
          "pt-48": isFirstBlock,
        },
        {
          "max-w-full": isFullWidth,
        },
        {
          "max-w-screen-2xl": !isFullWidth,
        },

        { "theme-muted": selectedTheme === "muted" },
        {
          "theme-pastel":
            selectedTheme === "pastel" || selectedTheme === "plop",
        },
        { "theme-light": selectedTheme === "light" },
        { "theme-dark": selectedTheme === "dark" }
      )}
    >
      <div>{children}</div>
      {backgroundMedia && (
        <div className="pt-24">
          <div className="rounded-2xl overflow-hidden relative">
            <Media {...backgroundMedia} />
          </div>
        </div>
      )}
    </div>
  );
};
