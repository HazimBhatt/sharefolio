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

export default function Team() {
  const [isAligned, setIsAligned] = useState(false);
  const [hovered, setHovered] = useState(null);

  const members = [
    {
      name: "Hazim",
      role: "Developer",
      img: "/hello.jpg",
      twitter: "https://twitter.com/",
      linkedin: "https://linkedin.com/",
      tagline: "Not So Cool",
    },
    {
      name: "Faisal",
      role: "Engineering Lead",
      img: "/about/fabulous.jpg",
      twitter: "https://twitter.com/fab14c",
      linkedin: "https://linkedin.com/in/fab-ulous",
      tagline:
        "Simple But Different, It's okay to rest, you don't have to be perfect",
    },
    {
      name: "Suhail",
      role: "Product Lead",
      img: "https://images.unsplash.com/photo-1545996124-2b2c8f1b2d5e",
      twitter: "https://twitter.com/",
      linkedin: "https://linkedin.com/",
      tagline: "lorem ipsum",
    },
    {
      name: "Muzamil",
      role: "Design Lead",
      img: "",
      twitter: "https://twitter.com/",
      linkedin: "https://linkedin.com/",
      tagline: "lorem ipsum",
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
        <h3 className="text-2xl font-semibold mb-6">
          <span className="bg-gradient-to-r from-[#7332a8] via-[#b266ff] to-[#ff80ff] text-transparent bg-clip-text">
            Members
          </span>
        </h3>

        {/* Mobile list */}
        <div className="md:hidden max-w-lg mx-auto flex flex-col items-center">
          {members.map((m, i) => (
            <motion.div
              key={m.name}
              variants={cardVariants}
              className={`${i !== 0 ? "-mt-6" : ""} w-full`}
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
                  <div className="flex justify-end gap-3">
                    <a
                      data-focusable
                      href={m.twitter}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm text-muted-foreground"
                    >
                      Twitter
                    </a>
                    <a
                      data-focusable
                      href={m.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm text-muted-foreground"
                    >
                      LinkedIn
                    </a>
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
                  className={`p-4 rounded-2xl border border-border ${
                    i === 0
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
                    <div className="ml-auto flex gap-2">
                      <a
                        data-focusable
                        href={m.twitter}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm text-muted-foreground"
                      >
                        Twitter
                      </a>
                      <a
                        data-focusable
                        href={m.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm text-muted-foreground"
                      >
                        LinkedIn
                      </a>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{m.tagline}</p>
                  </CardContent>
                  <CardFooter>
                    <div className="ml-auto flex gap-2">
                      <Button variant="outline" size="sm">
                        Message
                      </Button>
                      <Button variant="primary" size="sm">
                        Follow
                      </Button>
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
