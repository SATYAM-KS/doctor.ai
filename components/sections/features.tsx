import Features from "@/components/features-horizontal";
import Section from "@/components/section";
import { Brain, Mic, MessageSquare, History, VolumeX } from "lucide-react";

const data = [
  {
    id: 1,
    title: "Real-time Voice Conversation",
    content: "Talk naturally with our AI medical assistant using advanced speech recognition.",
    image: "/dashboard.png",
    icon: <Mic className="h-6 w-6 text-primary" />,
  },
  {
    id: 2,
    title: "Medical Knowledge",
    content: "Access AI-powered medical information to answer your health questions.",
    image: "/dashboard.png",
    icon: <Brain className="h-6 w-6 text-primary" />,
  },
  {
    id: 3,
    title: "Natural Turn-Taking",
    content: "Experience a human-like conversation with automatic silence detection.",
    image: "/dashboard.png",
    icon: <MessageSquare className="h-6 w-6 text-primary" />,
  },
  {
    id: 4,
    title: "Session History",
    content: "Review past consultations and track your medical conversations.",
    image: "/dashboard.png",
    icon: <History className="h-6 w-6 text-primary" />,
  },
];

export default function Component() {
  return (
    <Section title="Features" subtitle="Advanced Medical Assistant Capabilities">
      <Features collapseDelay={5000} linePosition="bottom" data={data} />
    </Section>
  );
}
