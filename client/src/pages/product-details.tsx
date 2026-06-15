import { useRoute } from "wouter";
import { useProduct } from "@/hooks/use-products";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { CartDrawer } from "@/components/layout/cart-drawer";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { useState } from "react";
import { Star, Truck, ShieldCheck, ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import { motion } from "framer-motion";

export default function ProductDetails() {
  const [, params] = useRoute("/product/:id");
  const id = parseInt(params?.id || "0");
  const { data: product, isLoading } = useProduct(id);
  const { addItem } = useCart();
  
  const [selectedSize, setSelectedSize] = useState<string>("6");

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-12 w-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4" />
          <p className="font-serif text-lg text-muted-foreground">Loading Masterpiece...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4 text-center">
        <h1 className="font-serif text-3xl mb-4">Product Not Found</h1>
        <p className="mb-8 text-muted-foreground">The piece you are looking for does not exist or has been removed.</p>
        <Link href="/collections">
          <Button variant="luxury">Return to Collections</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <CartDrawer />

      <div className="container mx-auto px-4 pt-32 pb-24">
        <Link href="/collections" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Collection
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Image Gallery */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <div className="aspect-[4/5] bg-gray-100 overflow-hidden relative">
              <img 
                src={product.imageUrl} 
                alt={product.name} 
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col justify-center"
          >
            <div className="mb-2 flex items-center gap-2">
              <span className="text-primary text-sm font-bold tracking-widest uppercase">{product.category}</span>
              <span className="text-border mx-2">|</span>
              <div className="flex items-center text-yellow-500">
                <Star className="w-4 h-4 fill-current" />
                <span className="ml-1 text-sm text-muted-foreground">{product.rating} ({product.reviewsCount} reviews)</span>
              </div>
            </div>

            <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-4">{product.name}</h1>
            <p className="text-2xl text-primary font-medium mb-8">₹{Number(product.price).toLocaleString("en-IN")}</p>
            
            <p className="text-muted-foreground leading-relaxed mb-8 border-b border-border/50 pb-8">
              {product.description}
            </p>

            {/* Customization */}
            <div className="space-y-6 mb-8">
              <div>
                <label className="block text-sm font-medium mb-2">Metal Type</label>
                <div className="inline-block px-4 py-2 border border-primary/30 bg-primary/5 text-primary rounded-sm">
                  {product.metalType}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Size</label>
                <div className="flex flex-wrap gap-2">
                  {["5", "6", "7", "8", "9"].map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all ${
                        selectedSize === size
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border text-muted-foreground hover:border-primary/50"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Specifications */}
            {product.category === "Engagement" && (
              <div className="grid grid-cols-2 gap-4 mb-8 text-sm p-4 bg-secondary/5 rounded-md">
                <div>
                  <span className="text-muted-foreground block">Carat Weight</span>
                  <span className="font-medium">{product.caratWeight}</span>
                </div>
                <div>
                  <span className="text-muted-foreground block">Clarity</span>
                  <span className="font-medium">{product.clarity}</span>
                </div>
                <div>
                  <span className="text-muted-foreground block">Color</span>
                  <span className="font-medium">{product.color}</span>
                </div>
                <div>
                  <span className="text-muted-foreground block">Cut</span>
                  <span className="font-medium">{product.cut}</span>
                </div>
              </div>
            )}

            <div className="flex gap-4 mb-10">
              <Button 
                size="lg" 
                variant="luxury" 
                className="flex-1"
                onClick={() => addItem(product, { size: selectedSize, metal: product.metalType })}
              >
                Add to Bag
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4" />
                <span>Free Insured Shipping</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" />
                <span>Lifetime Warranty</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
