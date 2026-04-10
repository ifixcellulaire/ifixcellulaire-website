import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Clock, Star, CheckCircle } from "lucide-react";
import heroImg from "@/assets/hero-repair.jpg";

const stats = [
  { icon: CheckCircle, text: "500+ Repairs completed" },
  { icon: Star, text: "4.9★ Google rating" },
  { icon: Shield, text: "90 Day warranty" },
  { icon: Clock, text: "24h Turnaround time" },
];

const HeroSection = () => (
  <section className="relative pt-16">
    <div className="container grid lg:grid-cols-2 gap-12 items-center py-20 lg:py-28">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="space-y-6"
      >
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
          Expert phone & tablet repair,{" "}
          <span className="text-primary">done right.</span>
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
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        <div className="rounded-2xl overflow-hidden shadow-2xl">
          <img src={heroImg} alt="Phone repair technician at work" className="w-full h-auto object-cover" />
        </div>
        <div className="gradient-primary rounded-xl px-5 py-3 text-primary-foreground mt-4 inline-flex items-center gap-2">
          <CheckCircle className="h-5 w-5" />
          <p className="text-sm font-semibold">500+ Repairs completed</p>
        </div>
      </motion.div>
    </div>

    {/* Trust bar */}
    <div className="border-y">
      <div className="container py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s) => (
            <div key={s.text} className="flex items-center gap-3 justify-center">
              <s.icon className="h-5 w-5 text-primary shrink-0" />
              <span className="text-sm font-medium">{s.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default HeroSection;
