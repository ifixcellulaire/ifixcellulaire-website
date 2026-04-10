import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Clock, Star } from "lucide-react";
import heroImg from "@/assets/hero-repair.jpg";

const badges = [
  { icon: Shield, text: "90-day warranty" },
  { icon: Clock, text: "Same-day repair" },
  { icon: Star, text: "4.9★ on Google" },
];

const HeroSection = () => (
  <section className="relative pt-16 overflow-hidden">
    <div className="container grid lg:grid-cols-2 gap-12 items-center py-20 lg:py-28">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="space-y-6"
      >
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
          Expert Phone & Tablet Repair in{" "}
          <span className="text-gradient-primary">Montreal</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-lg">
          Fast, reliable repairs with genuine parts. Walk in or book online — most repairs done in under an hour.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button size="lg" asChild>
            <a href="#booking">
              Book a Repair <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <a href="#services">View Services</a>
          </Button>
        </div>
        <div className="flex flex-wrap gap-4 pt-2">
          {badges.map((b) => (
            <div key={b.text} className="flex items-center gap-2 text-sm text-muted-foreground">
              <b.icon className="h-4 w-4 text-primary" />
              {b.text}
            </div>
          ))}
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="relative"
      >
        <div className="rounded-2xl overflow-hidden shadow-2xl">
          <img src={heroImg} alt="Phone repair technician at work" className="w-full h-auto object-cover" />
        </div>
        <div className="absolute -bottom-4 -left-4 gradient-primary rounded-xl px-5 py-3 text-primary-foreground shadow-lg">
          <p className="text-2xl font-bold">500+</p>
          <p className="text-xs opacity-90">Repairs this month</p>
        </div>
      </motion.div>
    </div>
  </section>
);

export default HeroSection;
