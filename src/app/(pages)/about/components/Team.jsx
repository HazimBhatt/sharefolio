import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { sectionStagger, cardVariants } from "./aboutData";
import { LinkedinIcon, Twitter, TwitterIcon, X } from "lucide-react";

export default function Team() {
  const [isAligned, setIsAligned] = useState(false);
  const [hovered, setHovered] = useState(null);

  const members = [
    {
      name: "Hazim",
      role: "Developer",
      img: "/about/hello.jpg",
      twitter: "https://twitter.com/",
      linkedin: "https://linkedin.com/",
      tagline: "Not So Cool",
    },
    {
      name: "Faisal",
      role: "Developer",
      img: "/about/fabulous.jpg",
      twitter: "https://twitter.com/fab14c",
      linkedin: "https://linkedin.com/in/fab-ulous",
      tagline:
        "Simple But Different — Fabulous",
    },
    {
      name: "Suhail",
      role: "Product Lead",
      img: "/about/hello.jpg",
      twitter: "https://twitter.com/",
      linkedin: "https://linkedin.com/",
      tagline: "Don't mind me, I'm just here for moral support and snacks",
    },
    {
      name: "Muzamil Rashid",
      role: "Design Lead",
      img: "/about/muzamil.jpeg",
      twitter: "https://www.linkedin.com/in/muzamil-rashid-3931a8336?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      linkedin: "https://linkedin.com/",
      tagline: "We don't just debug code — we debug life together.",
    },
  ];

  // compute deterministic offsets for initial stacked layout
  const centerIndex = (members.length - 1) / 2;
  const offsets = useMemo(() => {
    return members.map((_, i) => {
      const t = Math.abs(Math.sin(i + 1));
      const base = (i - centerIndex) * 120; // base horizontal spread
      const jitter = Math.round((t - 0.5) * 80); // -40..40
      const y = Math.round((Math.sin(i + 2) - 0.5) * 18); // vertical jitter
      const rotate = Math.round((t - 0.5) * 12); // small rotation
      return { x: base + jitter, y, rotate };
    });
  }, [members.length, centerIndex]);

  return (
    <motion.section
      variants={sectionStagger}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="w-[90%] mx-auto py-12"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-6">
          <h3 className="text-3xl sm:text-4xl font-extrabold mx-auto">
            <span className="bg-gradient-to-r from-[#7332a8] via-[#b266ff] to-[#ff80ff] text-transparent bg-clip-text">
              Members
            </span>
          </h3>
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto mt-2">Meet the team behind the magic.</p>
        </div>

        {/* Mobile list */}
        <div className="md:hidden max-w-lg mx-auto flex flex-col items-center gap-4">
          {members.map((m, i) => (
            <motion.div
              key={m.name}
              variants={cardVariants}
              className="w-full"
            >
              <Card className="overflow-hidden">
                <CardHeader className="items-center gap-4">
                  <img
                    src={`${m.img}?auto=format&fit=crop&w=200&q=60`}
                    alt={m.name}
                    className="w-14 h-14 rounded-full object-cover"
                  />
                  <div>
                    <CardTitle>{m.name}</CardTitle>
                    <CardDescription>{m.role}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground text-center">{m.tagline}</p>
                  <div className="flex justify-center gap-4 mt-4">
                    <Button
                      data-focusable
                      variant="outline"
                      size="sm"
                      asChild
                    >
                      <a
                        href={m.twitter}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <Twitter className="w-4 h-4 mr-2" />
                        Twitter
                      </a>
                    </Button>
                    <Button
                      data-focusable
                      variant="outline"
                      size="sm"
                      asChild
                    >
                      <a
                        href={m.linkedin}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <LinkedinIcon className="w-4 h-4 mr-2" />
                        LinkedIn
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Desktop: layered stacked cards — hover the container to align horizontally */}
        <div
          className="hidden md:block max-w-4xl mx-auto relative h-[260px]"
          style={{ perspective: 1200 }}
          onMouseEnter={() => setIsAligned(true)}
          onMouseLeave={() => setIsAligned(false)}
        >
          {members.map((m, i) => {
            const initial = offsets[i] || { x: 0, y: 0, rotate: 0 };
            const targetX = (i - centerIndex) * 300;
            return (
              <motion.div
                key={m.name}
                variants={cardVariants}
                initial={{ x: initial.x, y: initial.y, rotate: initial.rotate }}
                animate={
                  isAligned
                    ? { x: targetX, y: 0, rotate: 0 }
                    : { x: initial.x, y: initial.y, rotate: initial.rotate }
                }
                whileHover={{ y: -8, scale: 1.02 }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                transition={{ type: "spring", stiffness: 220, damping: 24 }}
                className={`absolute left-1/2 -translate-x-1/2 w-96 transform-gpu`}
                style={{
                  touchAction: "manipulation",
                  zIndex: hovered === i ? 999 : isAligned ? 90 : 100 - i,
                }}
              >
                <Card
                  className={`p-4 rounded-2xl border border-border ${i === 0
                    ? "shadow-2xl"
                    : i === 1
                      ? "shadow-xl"
                      : i === 2
                        ? "shadow-md"
                        : "shadow-sm"
                    }`}
                >
                  <CardHeader className="items-start gap-4">
                    <img
                      src={`${m.img}?auto=format&fit=crop&w=400&q=70`}
                      alt={m.name}
                      className="w-20 h-20 rounded-full object-cover"
                    />
                    <div>
                      <CardTitle>{m.name}</CardTitle>
                      <CardDescription>{m.role}</CardDescription>
                    </div>

                  </CardHeader>

                  <CardContent>
                    <p className="text-sm text-muted-foreground">{m.tagline}</p>
                  </CardContent>
                  <CardFooter>
                    <div className="ml-auto flex gap-2">
                      <a
                        data-focusable
                        href={m.twitter}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm text-muted-foreground border p-2 border-blue/90"
                      >
                        <Twitter size={36} className="dark:text-white" />
                        Twitter
                      </a>
                      <a
                        data-focusable
                        href={m.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm text-muted-foreground border-2 p-2"
                      >
                        <LinkedinIcon size={36} className="dark:text-white" />
                        LinkedIn
                      </a>
                    </div>
                  </CardFooter>

                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}
