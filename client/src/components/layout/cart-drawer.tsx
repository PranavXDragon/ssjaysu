import { useCart } from "@/hooks/use-cart";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Minus, Plus, X, ShoppingBag } from "lucide-react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";

export function CartDrawer() {
  const { isCartOpen, toggleCart, items, removeItem, updateQuantity, cartTotal } = useCart();
  const [, setLocation] = useLocation();

  const handleCheckout = () => {
    toggleCart();
    setLocation("/checkout");
  };

  return (
    <Sheet open={isCartOpen} onOpenChange={toggleCart}>
      <SheetContent className="w-full sm:max-w-md flex flex-col p-0 bg-background border-l border-border/50">
        <div className="p-6 border-b border-border/50">
          <SheetHeader>
            <SheetTitle className="font-serif text-2xl">Shopping Bag</SheetTitle>
            <SheetDescription className="text-muted-foreground">
              {items.length} items in your bag
            </SheetDescription>
          </SheetHeader>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center">
                <ShoppingBag className="w-8 h-8 text-secondary/40" />
              </div>
              <p className="text-lg font-medium text-foreground">Your bag is empty</p>
              <p className="text-sm text-muted-foreground max-w-[200px]">
                Browse our collections to discover timeless elegance.
              </p>
              <Button 
                variant="outline" 
                onClick={toggleCart}
                className="mt-4"
              >
                Continue Shopping
              </Button>
            </div>
          ) : (
            <ul className="space-y-6">
              <AnimatePresence initial={false}>
                {items.map((item) => (
                  <motion.li 
                    key={`${item.id}-${item.selectedSize}`}
                    layout
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="flex py-2"
                  >
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-border">
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-foreground">
                          <h3 className="font-serif line-clamp-1">{item.name}</h3>
                          <p className="ml-4">₹{Number(item.price).toLocaleString("en-IN")}</p>
                        </div>
                        <p className="mt-1 text-sm text-muted-foreground">{item.metalType} {item.selectedSize ? `• Size ${item.selectedSize}` : ''}</p>
                      </div>
                      <div className="flex flex-1 items-end justify-between text-sm">
                        <div className="flex items-center border border-border rounded-md">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 hover:bg-secondary/10 transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-8 text-center font-medium">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 hover:bg-secondary/10 transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          className="font-medium text-destructive hover:text-destructive/80 text-xs uppercase tracking-wide"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-border/50 p-6 bg-secondary/5">
            <div className="flex justify-between text-base font-medium text-foreground mb-4">
              <p className="font-serif">Subtotal</p>
              <p>₹{cartTotal.toLocaleString("en-IN")}</p>
            </div>
            <p className="mt-0.5 text-xs text-muted-foreground mb-6">
              Shipping and taxes calculated at checkout.
            </p>
            <div className="space-y-3">
              <Button 
                className="w-full" 
                size="lg" 
                variant="luxury"
                onClick={handleCheckout}
              >
                Checkout
              </Button>
              <Button 
                className="w-full" 
                variant="outline"
                onClick={toggleCart}
              >
                Continue Shopping
              </Button>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
