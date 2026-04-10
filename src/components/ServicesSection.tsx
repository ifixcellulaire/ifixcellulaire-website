import { motion } from "framer-motion";
import { Smartphone, Battery, Droplets, Camera, Plug, Building2 } from "lucide-react";

const services = [
  { icon: Smartphone, title: "Screen Replacement", desc: "Cracked or unresponsive screen? We use OEM-quality parts for a perfect fix.", price: "From $79" },
  { icon: Battery, title: "Battery Replacement", desc: "Restore your phone's battery life to like-new condition.", price: "From $49" },
  { icon: Droplets, title: "Water Damage", desc: "Liquid damage recovery with ultrasonic cleaning technology.", price: "From $59" },
  { icon: Camera, title: "Camera Repair", desc: "Blurry photos? We replace front and rear cameras.", price: "From $69" },
  { icon: Plug, title: "Charging Port", desc: "Fix loose or non-functional charging ports quickly.", price: "From $49" },
  { icon: Building2, title: "Corporate Plans", desc: "Volume repair contracts for businesses. Priority service & billing.", price: "Contact us" },
];

const ServicesSection = () => (
  <section id="services" className="py-20 section-alt">
    <div className="container">
      <div className="text-center mb-14">
        <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">What we fix</p>
        <h2 className="text-3xl md:text-4xl font-bold">Our Services</h2>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="bg-card rounded-xl p-6 border hover:shadow-lg hover:border-primary/20 transition-all group"
          >
            <div className="h-12 w-12 rounded-lg bg-accent flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
              <s.icon className="h-6 w-6" />
            </div>
            <h3 className="font-semibold text-lg mb-1">{s.title}</h3>
            <p className="text-sm text-muted-foreground mb-3">{s.desc}</p>
            <p className="text-sm font-semibold text-primary">{s.price}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ServicesSection;
