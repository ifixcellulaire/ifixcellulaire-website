import { motion } from "framer-motion";
import { Smartphone, Battery, Droplets, Camera, Plug, Building2 } from "lucide-react";

const services = [
  {
    icon: Smartphone,
    title: "SCREEN REPLACEMENT",
    desc: "Cracked or unresponsive screen? We use OEM-quality parts for a perfect fix.",
    price: "From $79",
    num: "01",
    img: "/services/screen.png",
  },
  {
    icon: Battery,
    title: "BATTERY REPLACEMENT",
    desc: "Restore your phone's battery life to like-new condition.",
    price: "From $49",
    num: "02",
    img: "/services/battery.png",
  },
  {
    icon: Droplets,
    title: "WATER DAMAGE",
    desc: "Liquid damage recovery with ultrasonic cleaning technology.",
    price: "From $59",
    num: "03",
    img: "/services/water.png",
  },
  {
    icon: Camera,
    title: "CAMERA REPAIR",
    desc: "Blurry photos? We replace front and rear cameras.",
    price: "From $69",
    num: "04",
    img: "/services/camera.png",
  },
  {
    icon: Plug,
    title: "CHARGING PORT",
    desc: "Fix loose or non-functional charging ports quickly.",
    price: "From $49",
    num: "05",
    img: "/services/port.png",
  },
  {
    icon: Building2,
    title: "CORPORATE PLANS",
    desc: "Volume repair contracts for businesses. Priority service & billing.",
    price: "Contact us",
    num: "06",
    img: "/services/corporate.png",
  },
];

const ServicesSection = () => (
  <section className="relative py-16 section-alt">
    <div id="services" className="absolute -top-24" />
    <div className="container">
      <div className="text-center mb-10">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary mb-3">WHAT WE DO</p>
        <h2 className="text-3xl md:text-4xl font-semibold">Our Services</h2>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {services.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="framer-card group transition-all duration-300 overflow-hidden hover:-translate-y-1"
          >
            <img
              src={s.img}
              alt={s.title}
              className="w-full h-32 object-cover block"
            />
            <div className="p-4">
              <span className="text-2xl font-semibold text-primary/40 block mb-2">{s.num}</span>
              <h3 className="font-semibold text-sm uppercase tracking-wide mb-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground font-body mb-3">{s.desc}</p>
              <p className="text-sm font-semibold text-primary">{s.price}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ServicesSection;
