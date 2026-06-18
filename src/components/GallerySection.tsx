import { Instagram } from "lucide-react";

const galleryPhotos = [
  { src: "https://images.unsplash.com/photo-1601972599720-36938d4ecd31?w=400&q=80", alt: "Phone repair technician" },
  { src: "https://images.unsplash.com/photo-1512054502232-10a0a035d672?w=400&q=80", alt: "Screen replacement repair" },
  { src: "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=400&q=80", alt: "Battery replacement" },
  { src: "https://images.unsplash.com/photo-1616348436168-de43ad0db179?w=400&q=80", alt: "Camera repair" },
  { src: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=400&q=80", alt: "Charging port repair" },
  { src: "https://images.unsplash.com/photo-1648737967278-d3f2e3b74380?w=400&q=80", alt: "Phone repair workbench" },
  { src: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&q=80", alt: "Water damage recovery" },
  { src: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=400&q=80", alt: "Refurbished iPhone" },
];

const GallerySection = () => (
  <section className="relative py-16">
    <div id="gallery" className="absolute -top-24" />
    <div className="container">
      <div className="text-center mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary mb-3">OUR WORK</p>
        <h2 className="text-3xl md:text-4xl font-semibold">Repair Gallery</h2>
        <p className="text-muted-foreground mt-2 font-body">A look at repairs we're proud of</p>
      </div>
      <div className="framer-card p-2">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {galleryPhotos.map((photo) => (
          <div key={photo.src} className="aspect-square overflow-hidden rounded-xl">
            <img
              src={photo.src}
              alt={photo.alt}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          </div>
        ))}
        </div>
      </div>
      <div className="text-center mt-8">
        <p className="text-sm text-muted-foreground mb-2 font-body">
          Follow us on Instagram @ifixcellulaire for daily updates
        </p>
        <a
          href="https://www.instagram.com/ifixcellulaire/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-xs font-semibold text-primary hover:underline uppercase tracking-widest"
        >
          <Instagram className="h-4 w-4" /> @IFIXCELLULAIRE
        </a>
      </div>
    </div>
  </section>
);

export default GallerySection;
