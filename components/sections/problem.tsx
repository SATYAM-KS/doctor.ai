import BlurFade from "@/components/magicui/blur-fade";
import Section from "@/components/section";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, Users, MapPin } from "lucide-react";

const problems = [
  {
    title: "Limited Healthcare Access",
    description:
      "Many people struggle to access medical information and guidance when they need it most, especially outside of regular doctor's office hours.",
    icon: Clock,
  },
  {
    title: "Long Wait Times",
    description:
      "Traditional healthcare often involves scheduling appointments and waiting days or weeks to get answers to basic health questions.",
    icon: Users,
  },
  {
    title: "Geographic Barriers",
    description:
      "People in remote or underserved areas face significant challenges in accessing quality healthcare information and services.",
    icon: MapPin,
  },
];

export default function Component() {
  return (
    <Section
      title="What's Problem with current Healthcare ?"
      subtitle="Healthcare access shouldn't be difficult"
    >
      <div className="flexo items-top">
        {problems.map((problem, index) => (
          <BlurFade key={index} delay={0.2 + index * 0.2} inView>
            <Card className="flexocard">
              <CardContent className="flexoCar">
                <div className="w-15 h-15 bg-primary/10 rounded-full flex items-center justify-center">
                  <problem.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="flexh3">{problem.title}</h3>
                <p className="flext">{problem.description}</p>
              </CardContent>
            </Card>
          </BlurFade>
        ))}
      </div>
    </Section>
  );
}
