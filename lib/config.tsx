import { FaTwitter } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa6";
import { RiInstagramFill } from "react-icons/ri";

export const BLUR_FADE_DELAY = 0.15;

export const siteConfig = {
  name: "Carex",
  description: "AI-powered medical assistant with voice conversation",
  url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  keywords: ["Medical AI", "Voice Assistant", "Healthcare", "AI Doctor", "Medical Consultation"],
  links: {
    email: "support@doctorai.com",
    twitter: "https://twitter.com/doctorai",
    discord: "https://discord.gg/doctorai",
    github: "https://github.com/doctorai/doctor-ai-agent",
    instagram: "https://instagram.com/doctorai/",
  },
  header: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Features",
      href: "#features",
    },
    {
      label: "Pricing",
      href: "#pricing",
    },
    {
      trigger: "Resources",
      content: {
        main: {
          title: "Resources",
          description: "Find helpful resources for your healthcare journey",
          href: "#resources",
          icon: null,
        },
        items: [
          {
            title: "Documentation",
            href: "#",
            description: "Learn how to use our platform",
          },
          {
            title: "API Reference",
            href: "#",
            description: "Explore our API endpoints",
          },
          {
            title: "Health Blog",
            href: "#",
            description: "Read our latest medical articles",
          },
        ],
      },
    },
    {
      label: "Contact",
      href: "#contact",
    },
  ],
  pricing: [
    {
      name: "BASIC",
      href: "#",
      price: "$19",
      period: "month",
      yearlyPrice: "$16",
      features: [
        "1 User",
        "10 Consultations/month",
        "Basic Medical Support",
        "Text-only Responses",
        "Session History (7 days)",
      ],
      description: "Perfect for individuals with occasional health questions",
      buttonText: "Subscribe",
      isPopular: false,
    },
    {
      name: "PRO",
      href: "#",
      price: "$49",
      period: "month",
      yearlyPrice: "$40",
      features: [
        "5 Users",
        "50 Consultations/month",
        "Priority Support",
        "Voice & Text Responses",
        "Session History (30 days)",
      ],
      description: "Ideal for families and small healthcare practices",
      buttonText: "Subscribe",
      isPopular: true,
    },
    {
      name: "ENTERPRISE",
      href: "#",
      price: "$99",
      period: "month",
      yearlyPrice: "$82",
      features: [
        "Unlimited Users",
        "Unlimited Consultations",
        "24/7 Premium Support",
        "Custom Medical Knowledge Base",
        "Permanent Session History",
      ],
      description: "For healthcare organizations and medical practices",
      buttonText: "Subscribe",
      isPopular: false,
    },
  ],
  faqs: [
    {
      question: "What is Doctor AI?",
      answer: (
        <span>
          Doctor AI is an AI-powered medical assistant that provides real-time voice conversations to help answer your health questions. It uses advanced speech-to-text and text-to-speech technology to create a natural, conversational experience.
        </span>
      ),
    },
    {
      question: "How does the voice conversation work?",
      answer: (
        <span>
          The voice conversation follows a natural turn-taking flow. When you start a call, the AI introduces itself, then listens for your input. After you speak, it processes your speech, generates a response, and speaks back to you. This back-and-forth continues until you end the call.
        </span>
      ),
    },
    {
      question: "Is my medical information kept private?",
      answer: (
        <span>
          Yes, we take privacy very seriously. All conversations are encrypted and stored securely. We comply with healthcare privacy standards and do not share your medical information with third parties without your consent.
        </span>
      ),
    },
    {
      question: "Can Doctor AI replace my actual doctor?",
      answer: (
        <span>
          No, Doctor AI is designed to be a helpful resource but is not a replacement for professional medical care. Always consult with a qualified healthcare professional for medical advice, diagnosis, and treatment.
        </span>
      ),
    },
    {
      question: "What browsers and devices are supported?",
      answer: (
        <span>
          Doctor AI works best in Chrome and Edge browsers. The voice features require a device with a microphone and speakers. Safari may have limited WebSocket support. Mobile devices are supported but may have varying performance.
        </span>
      ),
    },
  ],
  footer: [
    {
      title: "Product",
      links: [
        { href: "#", text: "Features", icon: null },
        { href: "#", text: "Pricing", icon: null },
        { href: "#", text: "Documentation", icon: null },
        { href: "#", text: "API", icon: null },
      ],
    },
    {
      title: "Company",
      links: [
        { href: "#", text: "About Us", icon: null },
        { href: "#", text: "Careers", icon: null },
        { href: "#", text: "Blog", icon: null },
        { href: "#", text: "Press", icon: null },
        { href: "#", text: "Partners", icon: null },
      ],
    },
    {
      title: "Resources",
      links: [
        { href: "#", text: "Community", icon: null },
        { href: "#", text: "Contact", icon: null },
        { href: "#", text: "Support", icon: null },
        { href: "#", text: "Status", icon: null },
      ],
    },
    {
      title: "Social",
      links: [
        {
          href: "#",
          text: "Twitter",
          icon: <FaTwitter />,
        },
        {
          href: "#",
          text: "Instagram",
          icon: <RiInstagramFill />,
        },
        {
          href: "#",
          text: "Youtube",
          icon: <FaYoutube />,
        },
      ],
    },
  ],
};

export type SiteConfig = typeof siteConfig;
