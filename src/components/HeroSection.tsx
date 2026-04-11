import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Clock, Star, CheckCircle } from "lucide-react";
import StripeBar from "./StripeBar";

const stats = [
  { value: "500+", label: "REPAIRS COMPLETED", icon: CheckCircle },
  { value: "4.9★", label: "GOOGLE RATING", icon: Star },
  { value: "90", label: "DAY WARRANTY", icon: Shield },
  { value: "24H", label: "TURNAROUND", icon: Clock },
];

const HeroSection = () => (
  <section className="relative pt-[86px]">
    <div className="container grid lg:grid-cols-2 gap-12 items-stretch py-14 lg:py-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="space-y-6"
      >
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-primary">EXPERT MOBILE REPAIR</p>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight uppercase">
          Phone & tablet repair,{" "}
          <span className="text-destructive">done right.</span>
        </h1>
        <p className="text-base text-muted-foreground max-w-lg font-body">
          Professional screen replacements, battery swaps, water damage recovery &amp; more. Trusted by hundreds of customers in Greater Montréal.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button size="lg" asChild className="bg-destructive hover:bg-destructive/90 text-destructive-foreground uppercase font-bold tracking-wider text-sm">
            <a href="#booking">
              BOOK A REPAIR <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
          <Button size="lg" variant="outline" asChild className="border-border text-foreground hover:bg-muted uppercase font-bold tracking-wider text-sm">
            <a href="#services">VIEW SERVICES</a>
          </Button>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="w-full min-h-[400px] overflow-hidden"
      >
        <img
          src="/phone_fix.png"
          alt="Technician repairing a smartphone"
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', borderRadius: 0 }}
        />
      </motion.div>
    </div>

    {/* Trust bar */}
    <div className="bg-muted">
      <div className="container py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-2xl md:text-3xl font-black text-primary">{s.value}</p>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Stripe divider below hero */}
    <StripeBar />
  </section>
);

export default HeroSection;
