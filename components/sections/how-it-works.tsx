import Features from "@/components/features-vertical";
import Section from "@/components/section";
import { Headphones, Mic, MessageSquare } from "lucide-react";

const data = [
  {
    id: 1,
    title: "1. Start a Consultation",
    content:
      "Begin your medical consultation with a simple click. Our AI medical assistant will introduce itself and guide you through the conversation process.",
    image: "/dashboard.png",
    icon: <Headphones className="w-6 h-6 text-primary" />,
  },
  {
    id: 2,
    title: "2. Speak Naturally",
    content:
      "Simply talk about your health questions or concerns. Our advanced speech recognition technology converts your voice to text with high accuracy.",
    image: "/dashboard.png",
    icon: <Mic className="w-6 h-6 text-primary" />,
  },
  {
    id: 3,
    title: "3. Receive AI Guidance",
    content:
      "The AI processes your questions and responds with helpful medical information through natural voice conversation. Continue the dialogue as needed for follow-up questions.",
    image: "/dashboard.png",
    icon: <MessageSquare className="w-6 h-6 text-primary" />,
  },
];

export default function Component() {
  return (
    <Section title="How it works" subtitle="Simple 3-step conversation process">
      <Features data={data} />
    </Section>
  );
}
