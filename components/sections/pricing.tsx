"use client";

import Section from "@/components/section";
import { buttonVariants } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import useWindowSize from "@/lib/hooks/use-window-size";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { FaStar } from "react-icons/fa";

const pricingPlans = [
  {
    name: "BASIC",
    href: "/sign-up",
    price: "$19",
    yearlyPrice: "$16",
    period: "month",
    credits: 20,
    features: [
      "20 AI consultation credits",
      "Text-only responses",
      "Basic medical information",
      "Session history (7 days)",
      "Email support"
    ],
    description: "Perfect for individuals with occasional health questions",
    buttonText: "Get Started",
    isPopular: false,
  },
  {
    name: "PRO",
    href: "/sign-up",
    price: "$39",
    yearlyPrice: "$30",
    period: "month",
    credits: 30,
    features: [
      "30 AI consultation credits",
      "Voice & text responses",
      "Advanced medical guidance",
      "Session history (30 days)",
      "Priority support"
    ],
    description: "Ideal for families and small healthcare practices",
    buttonText: "Subscribe",
    isPopular: true,
  },
  {
    name: "PRO MAX",
    href: "/sign-up",
    price: "$69",
    yearlyPrice: "$55",
    period: "month",
    credits: 50,
    features: [
      "50 AI consultation credits",
      "Premium voice quality",
      "Comprehensive medical knowledge",
      "Permanent session history",
      "24/7 dedicated support"
    ],
    description: "For healthcare organizations and medical practices",
    buttonText: "Contact Sales",
    isPopular: false,
  },
];

export default function PricingSection() {
  const [isMonthly, setIsMonthly] = useState(true);
  const { isDesktop } = useWindowSize();

  const handleToggle = () => {
    setIsMonthly(!isMonthly);
  };

  return (
    <Section title="Pricing" subtitle="Choose the plan that's right for you">
      <div className="flex justify-center mb-10">
        <span className="mr-2 font-semibold">Monthly</span>
        <label className="relative inline-flex items-center cursor-pointer">
          <Label>
            <Switch checked={!isMonthly} onCheckedChange={handleToggle} />
          </Label>
        </label>
        <span className="ml-2 font-semibold">Yearly</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 sm:2 gap-4">
        {pricingPlans.map((plan, index) => (
          <motion.div
            key={index}
            initial={{ y: 50, opacity: 1 }}
            whileInView={
              isDesktop
                ? {
                  y: 0,
                  opacity: 1,
                  x:
                    index === pricingPlans.length - 1
                      ? -30
                      : index === 0
                        ? 30
                        : 0,
                  scale:
                    index === 0 || index === pricingPlans.length - 1
                      ? 0.94
                      : 1.0,
                }
                : {}
            }
            viewport={{ once: true }}
            transition={{
              duration: 1.6,
              type: "spring",
              stiffness: 100,
              damping: 30,
              delay: 0.4,
              opacity: { duration: 0.5 },
            }}
            className={cn(
              `rounded-2xl border-[1px] p-6 bg-background text-center lg:flex lg:flex-col lg:justify-center relative`,
              plan.isPopular ? "border-primary border-[2px]" : "border-border",
              index === 0 || index === pricingPlans.length - 1
                ? "z-0 transform translate-x-0 translate-y-0 -translate-z-[50px] rotate-y-[10deg]"
                : "z-10",
              index === 0 && "origin-right",
              index === pricingPlans.length - 1 && "origin-left"
            )}
          >
            {plan.isPopular && (
              <div className="absolute top-0 right-0 bg-primary py-0.5 px-2 rounded-bl-xl rounded-tr-xl flex items-center">
                <FaStar className="text-white" />
                <span className="text-white ml-1 font-sans font-semibold">
                  Popular
                </span>
              </div>
            )}
            <div>
              <p className="text-base font-semibold text-muted-foreground">
                {plan.name}
              </p>
              <p className="mt-6 flex items-center justify-center gap-x-2">
                <span className="text-5xl font-bold tracking-tight text-foreground">
                  {isMonthly ? plan.price : plan.yearlyPrice}
                </span>
                {plan.period !== "Next 3 months" && (
                  <span className="text-sm font-semibold leading-6 tracking-wide text-muted-foreground">
                    / {plan.period}
                  </span>
                )}
              </p>

              <p className="text-xs leading-5 text-muted-foreground">
                {isMonthly ? "billed monthly" : "billed annually"}
              </p>

              <div className="mt-4 mb-2 flex justify-center">
                <span className="inline-flex items-center rounded-md bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                  {plan.credits} credits per month
                </span>
              </div>

              <ul className="mt-5 gap-2 flex flex-col">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-primary" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <hr className="w-full my-4" />

              <Link
                href={plan.href}
                className={cn(
                  buttonVariants({
                    variant: "outline",
                  }),
                  "group relative w-full gap-2 overflow-hidden text-lg font-semibold tracking-tighter",
                  "transform-gpu ring-offset-current transition-all duration-300 ease-out hover:ring-2 hover:ring-primary hover:ring-offset-1 hover:bg-primary hover:text-white",
                  plan.isPopular
                    ? "bg-primary text-white"
                    : "bg-white text-black"
                )}
              >
                {plan.buttonText}
              </Link>
              <p className="mt-6 text-xs leading-5 text-muted-foreground">
                {plan.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
