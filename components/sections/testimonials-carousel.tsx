import BlurFade from "@/components/magicui/blur-fade";
import Section from "@/components/section";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { MdOutlineFormatQuote } from "react-icons/md";

const testimonials = [
  {
    quote: "The voice conversation with Doctor AI was incredibly natural. I was able to describe my symptoms and get helpful information without waiting for a doctor's appointment.",
    name: "Sarah Johnson",
    role: "Patient",
    company: "Healthcare Consumer"
  },
  {
    quote: "As a rural resident, accessing medical advice can be challenging. Doctor AI has been a game-changer for getting quick answers to my health questions without traveling hours to see a specialist.",
    name: "Robert Chen",
    role: "Patient",
    company: "Rural Community Member"
  },
  {
    quote: "I use Doctor AI as a preliminary resource before deciding if I need to schedule an in-person appointment. The voice interface makes it so much easier than typing symptoms into a search engine.",
    name: "Maria Rodriguez",
    role: "Patient",
    company: "Busy Professional"
  },
  {
    quote: "Doctor AI has helped our clinic reduce unnecessary appointments by providing patients with reliable information for minor concerns. It's an excellent complementary tool to our practice.",
    name: "Dr. James Wilson",
    role: "Family Physician",
    company: "Community Health Center"
  },
  {
    quote: "The natural turn-taking conversation flow makes Doctor AI feel much more engaging than other medical chatbots I've tried. It's like speaking with a knowledgeable healthcare professional.",
    name: "Thomas Wright",
    role: "Patient",
    company: "Technology Early Adopter"
  }
];

export default function Component() {
  return (
    <Section
      title="Carex Testimonial Highlights"
      subtitle="What our users are saying"
    >
      <Carousel>
        <div className="max-w-2xl mx-auto relative cursor-grab">
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index}>
                <div className="p-2 pb-5">
                  <div className="text-center">
                    <MdOutlineFormatQuote className="text-4xl text-themeDarkGray my-4 mx-auto" />
                    <BlurFade delay={0.25} inView>
                      <h4 className="text-1xl font-semibold max-w-lg mx-auto px-10">
                        {testimonial.quote}
                      </h4>
                    </BlurFade>
                    <BlurFade delay={0.25 * 2} inView>
                      <div className="mt-8">
                        <Image
                          width={0}
                          height={40}
                          key={index}
                          src={`https://randomuser.me/api/portraits/${index % 2 === 0 ? 'women' : 'men'}/${(index + 1) * 10}.jpg`}
                          alt={`${testimonial.name} Avatar`}
                          className="mx-auto w-auto h-[40px] rounded-full"
                        />
                      </div>
                    </BlurFade>
                    <div className="">
                      <BlurFade delay={0.25 * 3} inView>
                        <h4 className="text-1xl font-semibold my-2">
                          {testimonial.name}
                        </h4>
                      </BlurFade>
                    </div>
                    <BlurFade delay={0.25 * 4} inView>
                      <div className=" mb-3">
                        <span className="text-sm text-themeDarkGray">
                          {testimonial.role}, {testimonial.company}
                        </span>
                      </div>
                    </BlurFade>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="pointer-events-none absolute inset-y-0 left-0 h-full w-2/12 bg-gradient-to-r from-background"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 h-full  w-2/12 bg-gradient-to-l from-background"></div>
        </div>
        <div className="md:block hidden">
          <CarouselPrevious />
          <CarouselNext />
        </div>
      </Carousel>
    </Section>
  );
}
