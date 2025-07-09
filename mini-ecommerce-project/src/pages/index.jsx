import { Link } from "@heroui/link";
import { Snippet } from "@heroui/snippet";
import { Code } from "@heroui/code";
import { button as buttonStyles } from "@heroui/theme";

import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
import DefaultLayout from "@/layouts/default";

export default function IndexPage() {
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 bg-secondary-blush dark:bg-primary-light transition-all duration-500">
        {/* Hero Text */}
        <div className="inline-block max-w-lg text-center justify-center text-primary dark:text-white">
          <span className={title()}>Make&nbsp;</span>
          <span className={title({ color: "violet" })}>beautiful&nbsp;</span>
          <br />
          <span className={title()}>
            websites regardless of your design experience.
          </span>
          <div className={subtitle({ class: "mt-4 text-secondary-peach" })}>
            Beautiful, fast and modern React UI library.
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 mt-4">
          <Link
            isExternal
            className={buttonStyles({
              color: "primary",
              radius: "full",
              variant: "shadow",
              className: "bg-primary hover:bg-primary-light text-white",
            })}
            href={siteConfig.links.docs}
          >
            Documentation
          </Link>
          <Link
            isExternal
            className={buttonStyles({
              variant: "bordered",
              radius: "full",
              className: "border-primary text-primary",
            })}
            href={siteConfig.links.github}
          >
            <GithubIcon size={20} />
            GitHub
          </Link>
        </div>

        {/* Code Snippet */}
        <div className="mt-8">
          <Snippet
            hideCopyButton
            hideSymbol
            variant="bordered"
            className="bg-secondary-sky border-secondary-mint text-primary"
          >
            <span>
              Get started by editing{" "}
              <Code color="primary">pages/index.tsx</Code>
            </span>
          </Snippet>
        </div>

        {/* Color Palette Display */}
        <div className="mt-12 w-full max-w-4xl">
          <h3 className="text-xl font-bold mb-4 text-center text-primary">
            Project Color Palette
          </h3>

          <div className="mb-8">
            <h4 className="font-semibold mb-2 text-primary-light">
              Primary Colors
            </h4>
            <div className="flex gap-4">
              <div className="flex-1 h-16 rounded bg-primary-light text-center text-sm text-white flex items-center justify-center">
                #70908B
              </div>
              <div className="flex-1 h-16 rounded bg-primary text-center text-sm text-white flex items-center justify-center">
                #07484A
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-2 text-primary-light">
              Secondary Colors
            </h4>
            <div className="grid grid-cols-5 gap-4">
              <div className="h-16 rounded bg-secondary-mint text-center text-xs flex items-center justify-center">
                #CAF3E5
              </div>
              <div className="h-16 rounded bg-secondary-sky text-center text-xs flex items-center justify-center">
                #E0EFF6
              </div>
              <div className="h-16 rounded bg-secondary-lavender text-center text-xs flex items-center justify-center">
                #EEEBFF
              </div>
              <div className="h-16 rounded bg-secondary-peach text-center text-xs flex items-center justify-center">
                #FFF4E7
              </div>
              <div className="h-16 rounded bg-secondary-blush text-center text-xs flex items-center justify-center">
                #FDFBF8
              </div>
            </div>
          </div>
        </div>
      </section>
    </DefaultLayout>
  );
}
