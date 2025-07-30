import { Icons } from "@/components/icons";
import Section from "@/components/section";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function CtaSection() {
  return (
    <Section
      id="cta"
      title="Ready to speak with our AI medical assistant?"
      subtitle="Start your free consultation today."
      className="bg-primary/10 rounded-xl py-16"
    >
      <div className="flex flex-col w-full sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 pt-4">
        <Link
          href="/sign-up"
          className={cn(
            buttonVariants({ variant: "default" }),
            "w-full sm:w-auto text-background flex gap-2 bg-black color-white transition-all duration-750 ease-in-out"
          )}
        >
          <Icons.logo className="h-6 w-6 " />
          Start a free consultation
        </Link>
      </div>
    </Section>
  );
}
