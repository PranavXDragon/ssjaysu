import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";
import { useProducts } from "@/hooks/use-products";
import { ProductCard } from "@/components/product-card";
import { CartDrawer } from "@/components/layout/cart-drawer";

export default function Home() {
  const { data: products, isLoading } = useProducts();

  // Get featured products (first 4)
  const featuredProducts = products?.slice(0, 4) || [];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <CartDrawer />

      {/* Hero Section */}
      <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
        {/* Background Image with Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          {/* Unsplash image: Diamond ring close up luxury */}
          <img 
            src="https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=2070&auto=format&fit=crop" 
            alt="Luxury Jewelry Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1a1a2e]/80 to-[#1a1a2e]/40" />
        </div>

        {/* Content */}
        <div className="container relative z-10 px-4 text-center text-white">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-primary text-sm md:text-base uppercase tracking-[0.2em] mb-4 font-medium"
          >
            Timeless Elegance
          </motion.p>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-serif text-5xl md:text-7xl lg:text-8xl mb-8 leading-tight"
          >
            Eternal Luxury
            <br />
            <span className="italic text-primary/90 font-light">Redefined</span>
          </motion.h1>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/collections">
              <Button size="lg" variant="luxury" className="min-w-[180px] bg-white text-navy hover:bg-primary hover:border-primary hover:text-white border-white">
                Shop Collection
              </Button>
            </Link>
            <Link href="/about">
              <Button size="lg" variant="outline" className="min-w-[180px] text-white border-white hover:bg-white hover:text-navy">
                Our Story
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Featured Collection */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-serif text-4xl mb-4">Curated Masterpieces</h2>
            <p className="text-muted-foreground">Hand-selected pieces that embody sophistication and grace.</p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-200 aspect-[3/4] mb-4" />
                  <div className="h-4 bg-gray-200 w-2/3 mx-auto mb-2" />
                  <div className="h-4 bg-gray-200 w-1/3 mx-auto" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          <div className="text-center mt-16">
            <Link href="/collections">
              <Button variant="link" className="text-foreground hover:text-primary text-lg group">
                View All Collections <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Craftsmanship Banner */}
      <section className="py-24 bg-secondary text-secondary-foreground relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
           {/* Pattern or texture image could go here */}
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1 relative">
              <div className="aspect-square bg-white/5 p-4 rounded-full absolute -top-10 -left-10 w-32 h-32 blur-2xl" />
              {/* Unsplash image: Jewelry making or workshop */}
              <img 
                src="https://images.unsplash.com/photo-1617038224558-28ad3fb558a7?q=80&w=2070&auto=format&fit=crop" 
                alt="Artisan Craftsmanship" 
                className="w-full h-auto rounded-sm shadow-2xl"
              />
            </div>
            <div className="order-1 md:order-2 space-y-6">
              <div className="flex items-center gap-2 text-primary">
                <Star className="w-5 h-5 fill-current" />
                <span className="uppercase tracking-widest text-xs font-bold">World Class Quality</span>
              </div>
              <h2 className="font-serif text-4xl md:text-5xl text-white">Unparalleled Craftsmanship</h2>
              <p className="text-secondary-foreground/80 leading-relaxed text-lg">
                Each piece in our collection is meticulously crafted by master artisans who have dedicated their lives to the perfection of their craft. We source only the finest ethical gemstones and precious metals.
              </p>
              <div className="pt-4">
                <Link href="/about">
                  <Button variant="luxury" className="bg-transparent border-primary text-primary hover:bg-primary hover:text-secondary-foreground">
                    Discover Our Process
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Engagement", img: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=2070&auto=format&fit=crop" },
              { title: "Necklaces", img: "https://images.unsplash.com/photo-1599643478518-17488fbbcd75?q=80&w=1974&auto=format&fit=crop" },
              { title: "Earrings", img: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1974&auto=format&fit=crop" }
            ].map((cat, i) => (
              <Link key={cat.title} href={`/collections?category=${cat.title}`}>
                <div className="group relative aspect-[3/4] overflow-hidden cursor-pointer">
                  <img 
                    src={cat.img} 
                    alt={cat.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <h3 className="text-white font-serif text-3xl tracking-wide border-b border-transparent group-hover:border-white pb-1 transition-all">
                      {cat.title}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
