import { Instagram } from "lucide-react";

const placeholders = Array.from({ length: 6 }, (_, i) => i);

const GallerySection = () => (
  <section id="gallery" className="py-20">
    <div className="container">
      <div className="text-center mb-14">
        <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">Our work</p>
        <h2 className="text-3xl md:text-4xl font-bold">Repair Gallery</h2>
        <p className="text-muted-foreground mt-2">Follow us on Instagram for daily repair updates</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {placeholders.map((i) => (
          <div
            key={i}
            className="aspect-square rounded-xl bg-muted flex items-center justify-center group hover:bg-accent transition-colors cursor-pointer"
          >
            <Instagram className="h-8 w-8 text-muted-foreground group-hover:text-primary transition-colors" />
          </div>
        ))}
      </div>
      <div className="text-center mt-8">
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
        >
          <Instagram className="h-4 w-4" /> @ifixcellulaire
        </a>
      </div>
    </div>
  </section>
);

export default GallerySection;
