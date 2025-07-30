"use client";

import Marquee from "@/components/magicui/marquee";
import Section from "@/components/section";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import Image from "next/image";

export const Highlight = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <span
      className={cn(
        "bg-primary/20 p-1 py-0.5 font-bold text-primary dark:bg-primary/20 dark:text-primary",
        className
      )}
    >
      {children}
    </span>
  );
};

export interface TestimonialCardProps {
  name: string;
  role: string;
  img?: string;
  description: React.ReactNode;
  className?: string;
  [key: string]: unknown;
}

export const TestimonialCard = ({
  description,
  name,
  img,
  role,
  className,
  ...props
}: TestimonialCardProps) => (
  <div
    className={cn(
      "mb-4 flex w-full cursor-pointer break-inside-avoid flex-col items-center justify-between gap-6 rounded-xl p-4",

      " border border-neutral-200 bg-white",

      "dark:bg-black dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
      className
    )}
    {...props}
  >
    <div className="select-none text-sm font-normal text-neutral-700 dark:text-neutral-400">
      {description}
      <div className="flex flex-row py-1">
        <Star className="size-4 text-yellow-500 fill-yellow-500" />
        <Star className="size-4 text-yellow-500 fill-yellow-500" />
        <Star className="size-4 text-yellow-500 fill-yellow-500" />
        <Star className="size-4 text-yellow-500 fill-yellow-500" />
        <Star className="size-4 text-yellow-500 fill-yellow-500" />
      </div>
    </div>

    <div className="flex w-full select-none items-center justify-start gap-5">
      <div>
        <p className="font-medium text-neutral-500">{name}</p>
        <p className="text-xs font-normal text-neutral-400">{role}</p>
      </div>
    </div>
  </div>
);

const testimonials = [
  {
    name: "Dr. Emma Thompson",
    role: "Pediatrician at Children's Hospital",
    img: "https://randomuser.me/api/portraits/women/91.jpg",
    description: (
      <p>
        Doctor AI has transformed how I provide after-hours support to my patients.
        <Highlight>
          Parents can get reliable information when they need it most.
        </Highlight>{" "}
        A valuable tool for any pediatric practice.
      </p>
    ),
  },
  {
    name: "Michael Chen",
    role: "Patient with Chronic Condition",
    img: "https://randomuser.me/api/portraits/men/12.jpg",
    description: (
      <p>
        Living with diabetes means I always have questions about my condition.
        <Highlight>Doctor AI helps me manage my health between appointments.</Highlight> The voice interface makes it accessible even when my vision is affected.
      </p>
    ),
  },
  {
    name: "Dr. Raj Patel",
    role: "Medical Director at Rural Health Clinic",
    img: "https://randomuser.me/api/portraits/men/45.jpg",
    description: (
      <p>
        In our underserved rural area, Doctor AI provides much-needed medical guidance.
        <Highlight>Patients can get preliminary information before traveling long distances.</Highlight> A game-changer for rural healthcare.
      </p>
    ),
  },
  {
    name: "Emily Rodriguez",
    role: "Busy Mom of Three",
    img: "https://randomuser.me/api/portraits/women/83.jpg",
    description: (
      <p>
        With three kids, I'm constantly worried about fevers, rashes, and coughs.
        <Highlight>Doctor AI helps me determine when to rush to the ER versus when to wait.</Highlight> It's like having a pediatric nurse on call.
      </p>
    ),
  },
  {
    name: "James Wilson",
    role: "Elderly Patient",
    img: "https://randomuser.me/api/portraits/men/1.jpg",
    description: (
      <p>
        At my age, I have many health concerns but limited mobility.
        <Highlight>
          The voice interface means I don't have to type or navigate complex menus.
        </Highlight>{" "}
        Perfect for seniors like me.
      </p>
    ),
  },
  {
    name: "Dr. Linda Wu",
    role: "Telemedicine Specialist",
    img: "https://randomuser.me/api/portraits/women/5.jpg",
    description: (
      <p>
        Doctor AI complements our telemedicine services perfectly.
        <Highlight>
          Patients can use it for initial screening before video consultations.
        </Highlight>{" "}
        It's improving our efficiency and patient satisfaction.
      </p>
    ),
  },
  {
    name: "Carlos Gomez",
    role: "Healthcare Administrator",
    img: "https://randomuser.me/api/portraits/men/14.jpg",
    description: (
      <p>
        Implementing Doctor AI in our hospital system has reduced unnecessary ER visits.
        <Highlight>
          Patients get guidance on the appropriate level of care they need.
        </Highlight>{" "}
        A cost-effective solution for modern healthcare.
      </p>
    ),
  },
  {
    name: "Aisha Khan",
    role: "International Traveler",
    img: "https://randomuser.me/api/portraits/women/56.jpg",
    description: (
      <p>
        When traveling abroad, Doctor AI has been my reliable health companion.
        <Highlight>
          I can discuss symptoms and get advice no matter where I am.
        </Highlight>{" "}
        Essential for frequent travelers.
      </p>
    ),
  },
  {
    name: "Tom Chen",
    role: "Remote Worker",
    img: "https://randomuser.me/api/portraits/men/18.jpg",
    description: (
      <p>
        Working from a remote location means healthcare access is limited.
        <Highlight>
          Doctor AI bridges the gap when I need medical guidance quickly.
        </Highlight>{" "}
        The voice conversation feels remarkably natural.
      </p>
    ),
  },
  {
    name: "Sofia Patel",
    role: "College Student",
    img: "https://randomuser.me/api/portraits/women/73.jpg",
    description: (
      <p>
        As a student away from home, I often worry about health issues.
        <Highlight>
          Doctor AI helps me decide if I should visit the campus clinic.
        </Highlight>{" "}
        It's like having my mom's medical advice but more scientific!
      </p>
    ),
  },
  {
    name: "Dr. Jake Morrison",
    role: "Emergency Physician",
    img: "https://randomuser.me/api/portraits/men/25.jpg",
    description: (
      <p>
        Doctor AI helps triage patients before they even arrive at the ER.
        <Highlight>This pre-screening helps us prioritize critical cases.</Highlight>{" "}
        An innovative approach to emergency medicine.
      </p>
    ),
  },
  {
    name: "Nadia Ali",
    role: "Patient with Language Barrier",
    img: "https://randomuser.me/api/portraits/women/78.jpg",
    description: (
      <p>
        English is my second language, and Doctor AI's clear speech is easy to understand.
        <Highlight>The conversation feels patient and accommodating.</Highlight> It's breaking down language barriers in healthcare.
      </p>
    ),
  },
  {
    name: "Omar Farooq",
    role: "Healthcare Startup Founder",
    img: "https://randomuser.me/api/portraits/men/54.jpg",
    description: (
      <p>
        We've integrated Doctor AI into our patient portal with amazing results.
        <Highlight>Patient engagement has increased by 65%.</Highlight> The voice interface is the future of digital health.
      </p>
    ),
  },
];

export default function Testimonials() {
  return (
    <Section
      title="Testimonials"
      subtitle="What our users are saying"
      className="max-w-8xl"
    >
      <div className="relative mt-6 max-h-screen h-100 overflow-hidden">
        <div className="gap-4 md:columns-2 xl:columns-3 2xl:columns-4 cursor-grab">
          {Array(Math.ceil(testimonials.length / 3))
            .fill(0)
            .map((_, i) => (
              <Marquee
                vertical
                key={i}
                className={`cursor-grab` + cn({
                  "[--duration:60s]": i === 1,
                  "[--duration:30s]": i === 2,
                  "[--duration:70s]": i === 3,
                })}
              >
                {testimonials.slice(i * 3, (i + 1) * 3).map((card, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: Math.random() * 0.8,
                      duration: 1.2,
                    }}
                  >
                    <TestimonialCard {...card} />
                  </motion.div>
                ))}
              </Marquee>
            ))}
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 w-full bg-gradient-to-t from-background from-20%"></div>
        <div className="pointer-events-none absolute inset-x-0 top-0 h-1/4 w-full bg-gradient-to-b from-background from-20%"></div>
      </div>
    </Section>
  );
}
