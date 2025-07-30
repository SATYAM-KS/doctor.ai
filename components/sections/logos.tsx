import Marquee from "@/components/magicui/marquee";
import Image from "next/image";

const healthcareOrgs = [
  { name: "Mayo Clinic", logo: "https://cdn.magicui.design/companies/Google.svg" },
  { name: "Cleveland Clinic", logo: "https://cdn.magicui.design/companies/Microsoft.svg" },
  { name: "Johns Hopkins", logo: "https://cdn.magicui.design/companies/Amazon.svg" },
  { name: "Kaiser Permanente", logo: "https://cdn.magicui.design/companies/Netflix.svg" },
  { name: "Mass General", logo: "https://cdn.magicui.design/companies/YouTube.svg" },
  { name: "Stanford Health", logo: "https://cdn.magicui.design/companies/Instagram.svg" },
  { name: "NYU Langone", logo: "https://cdn.magicui.design/companies/Uber.svg" },
  { name: "UCSF Health", logo: "https://cdn.magicui.design/companies/Spotify.svg" },
];

export default function Logos() {
  return (
    <section id="logos">
      <div className="container mx-auto px-4 md:px-8 py-12">
        <h3 className="text-center text-sm font-semibold text-gray-500">
          TRUSTED BY HEALTHCARE PROFESSIONALS
        </h3>
        <div className="relative mt-6">
          <Marquee className="max-w-full [--duration:40s]">
            {healthcareOrgs.map((org, idx) => (
              <Image
                key={idx}
                width={112}
                height={40}
                src={org.logo}
                className="h-10 w-28 dark:brightness-0 dark:invert grayscale opacity-30"
                alt={org.name}
              />
            ))}
          </Marquee>
          <div className="pointer-events-none absolute inset-y-0 left-0 h-full w-1/3 bg-gradient-to-r from-background"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 h-full w-1/3 bg-gradient-to-l from-background"></div>
        </div>
      </div>
    </section>
  );
}
