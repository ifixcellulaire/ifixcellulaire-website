import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const products = [
  {
    name: "iPhone 13 — Refurbished",
    condition: "Grade A",
    price: "$499",
    category: "Phone",
    img: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=600&q=80",
  },
  {
    name: "Samsung S22 — Refurbished",
    condition: "Grade A+",
    price: "$449",
    category: "Phone",
    img: "https://images.unsplash.com/photo-1591337676887-a217a6970a8a?w=600&q=80",
  },
  {
    name: "AirPods Pro — Refurbished",
    condition: "Grade A",
    price: "$179",
    category: "Audio",
    img: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=600&q=80",
  },
  {
    name: "MagSafe Wireless Charger",
    condition: "New",
    price: "$29",
    category: "Accessory",
    img: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&q=80",
  },
];

const MarketplaceSection = () => (
  <section id="marketplace" className="py-20">
    <div className="container">
      <div className="text-center mb-14">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-primary mb-3">SHOP</p>
        <h2 className="text-3xl md:text-4xl font-black uppercase">MARKETPLACE</h2>
        <p className="text-muted-foreground mt-2 font-body">Quality refurbished devices and accessories</p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((p) => (
          <div key={p.name} className="bg-card rounded-lg border border-border overflow-hidden group hover:border-primary/30 transition-all">
            <img
              src={p.img}
              alt={p.name}
              style={{ width: '100%', height: '180px', objectFit: 'cover', display: 'block' }}
            />
            <div className="p-5">
              <div className="flex items-center gap-2 mb-2">
                <Badge className="text-[10px] uppercase tracking-wider font-bold bg-secondary text-secondary-foreground border-0">{p.category}</Badge>
                <Badge variant="outline" className="text-[10px] uppercase tracking-wider font-bold">{p.condition}</Badge>
              </div>
              <h3 className="font-black text-sm uppercase mb-1">{p.name}</h3>
              <p className="text-lg font-black text-primary">{p.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default MarketplaceSection;
