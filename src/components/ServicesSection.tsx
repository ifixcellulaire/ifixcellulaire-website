import { motion } from "framer-motion";
import { Smartphone, Battery, Droplets, Camera, Plug, Building2 } from "lucide-react";

const services = [
  {
    icon: Smartphone,
    title: "SCREEN REPLACEMENT",
    desc: "Cracked or unresponsive screen? We use OEM-quality parts for a perfect fix.",
    price: "From $79",
    num: "01",
    img: "https://images.unsplash.com/photo-1512054502232-10a0a035d672?w=600&q=80",
  },
  {
    icon: Battery,
    title: "BATTERY REPLACEMENT",
    desc: "Restore your phone's battery life to like-new condition.",
    price: "From $49",
    num: "02",
    img: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&q=80",
  },
  {
    icon: Droplets,
    title: "WATER DAMAGE",
    desc: "Liquid damage recovery with ultrasonic cleaning technology.",
    price: "From $59",
    num: "03",
    img: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&q=80",
  },
  {
    icon: Camera,
    title: "CAMERA REPAIR",
    desc: "Blurry photos? We replace front and rear cameras.",
    price: "From $69",
    num: "04",
    img: "https://images.unsplash.com/photo-1516724562728-afc824a36e84?w=600&q=80",
  },
  {
    icon: Plug,
    title: "CHARGING PORT",
    desc: "Fix loose or non-functional charging ports quickly.",
    price: "From $49",
    num: "05",
    img: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=600&q=80",
  },
  {
    icon: Building2,
    title: "CORPORATE PLANS",
    desc: "Volume repair contracts for businesses. Priority service & billing.",
    price: "Contact us",
    num: "06",
    img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80",
  },
];

const ServicesSection = () => (
  <section id="services" className="py-20 section-alt">
    <div className="container">
      <div className="text-center mb-14">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-primary mb-3">WHAT WE DO</p>
        <h2 className="text-3xl md:text-4xl font-black uppercase">OUR SERVICES</h2>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-border rounded-lg overflow-hidden">
        {services.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="bg-card group hover:border-l-2 hover:border-l-primary transition-all overflow-hidden"
          >
            <img
              src={s.img}
              alt={s.title}
              style={{ width: '100%', height: '160px', objectFit: 'cover', display: 'block' }}
            />
            <div className="p-6">
              <span className="text-3xl font-black text-primary/30 block mb-3">{s.num}</span>
              <h3 className="font-black text-sm uppercase tracking-wider mb-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground font-body mb-3">{s.desc}</p>
              <p className="text-sm font-bold text-primary">{s.price}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ServicesSection;
