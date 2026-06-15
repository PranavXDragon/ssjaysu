import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { useCart } from "@/hooks/use-cart";
import { useCreateOrder } from "@/hooks/use-products";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertOrderSchema } from "@shared/schema";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";
import { Loader2, Lock } from "lucide-react";
import { CartDrawer } from "@/components/layout/cart-drawer";

// Extend schema for frontend validation
const checkoutSchema = insertOrderSchema.extend({
  email: z.string().email("Please enter a valid email"),
  zip: z.string().min(5, "Zip code must be at least 5 digits"),
  total: z.any(), // handled by code
  items: z.any(), // handled by code
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

export default function Checkout() {
  const { items, cartTotal, clearCart } = useCart();
  const { mutate: createOrder, isPending } = useCreateOrder();
  const [, setLocation] = useLocation();

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      customerName: "",
      email: "",
      address: "",
      city: "",
      state: "",
      zip: "",
    },
  });

  const onSubmit = (data: CheckoutFormValues) => {
    createOrder(
      {
        ...data,
        total: cartTotal.toString(),
        items: items, // Send full cart items object
      },
      {
        onSuccess: () => {
          clearCart();
          setLocation("/");
          alert("Order placed successfully! In a real app, you'd be redirected to a thank you page.");
        },
      }
    );
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
        <h1 className="font-serif text-3xl mb-4">Your bag is empty</h1>
        <Link href="/collections">
          <Button variant="luxury">Start Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <CartDrawer />

      <div className="pt-32 pb-24 container mx-auto px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-12">
          
          {/* Form Section */}
          <div>
            <div className="mb-8 border-b border-border/50 pb-4">
              <h1 className="font-serif text-3xl mb-2">Checkout</h1>
              <p className="text-muted-foreground flex items-center gap-2">
                <Lock className="w-3 h-3" /> Secure SSL Encryption
              </p>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="space-y-4">
                  <h2 className="text-lg font-medium">Contact Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="customerName"
                      render={({ field }) => (
                        <FormItem className="col-span-1 md:col-span-2">
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem className="col-span-1 md:col-span-2">
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input placeholder="john@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h2 className="text-lg font-medium">Shipping Address</h2>
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Input placeholder="123 Luxury Lane" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City</FormLabel>
                          <FormControl>
                            <Input placeholder="New York" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="state"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>State</FormLabel>
                          <FormControl>
                            <Input placeholder="NY" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="zip"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Zip Code</FormLabel>
                          <FormControl>
                            <Input placeholder="10001" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full" 
                  variant="luxury"
                  disabled={isPending}
                >
                  {isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing...
                    </>
                  ) : (
                    `Complete Order (₹${cartTotal.toLocaleString("en-IN")})`
                  )}
                </Button>
              </form>
            </Form>
          </div>

          {/* Order Summary */}
          <div className="bg-secondary/5 p-8 rounded-lg h-fit border border-border/50">
            <h2 className="font-serif text-xl mb-6">Order Summary</h2>
            <div className="space-y-4 mb-6 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
              {items.map((item, idx) => (
                <div key={`${item.id}-${idx}`} className="flex gap-4 py-2">
                  <div className="h-16 w-16 bg-white border border-border rounded-sm overflow-hidden flex-shrink-0">
                    <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm truncate">{item.name}</h4>
                    <p className="text-xs text-muted-foreground">{item.metalType} / Size {item.selectedSize}</p>
                    <div className="flex justify-between mt-1">
                      <span className="text-xs text-muted-foreground">Qty: {item.quantity}</span>
                      <span className="text-sm font-medium">₹{Number(item.price).toLocaleString("en-IN")}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="border-t border-border/50 pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span>${cartTotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <span className="text-green-600 font-medium">Free</span>
              </div>
              <div className="flex justify-between text-base font-medium pt-2 border-t border-border/50 mt-2">
                <span>Total</span>
                <span>${cartTotal.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
