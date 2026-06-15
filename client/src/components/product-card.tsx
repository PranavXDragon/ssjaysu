import { Link } from "wouter";
import { Product } from "@shared/schema";
import { Button } from "./ui/button";
import { useCart } from "@/hooks/use-cart";
import { motion } from "framer-motion";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative"
    >
      <div className="aspect-[3/4] overflow-hidden bg-gray-100 relative mb-4">
        {/* Unsplash image URL handled directly from DB/API, using placeholder if needed */}
        <img
          src={product.imageUrl}
          alt={product.name}
          className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
        />
        
        {/* Overlay Action Button */}
        <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-black/50 to-transparent">
          <Button 
            className="w-full bg-white text-black hover:bg-primary hover:text-white border-none"
            onClick={(e) => {
              e.preventDefault();
              addItem(product);
            }}
          >
            Quick Add
          </Button>
        </div>
      </div>

      <div className="text-center space-y-1">
        <h3 className="font-serif text-lg text-foreground group-hover:text-primary transition-colors duration-300">
          <Link href={`/product/${product.id}`}>
            {product.name}
          </Link>
        </h3>
        <p className="text-sm text-muted-foreground uppercase tracking-wide text-[10px]">{product.category}</p>
        <p className="font-medium text-primary mt-2">₹{Number(product.price).toLocaleString("en-IN")}</p>
      </div>
    </motion.div>
  );
}
