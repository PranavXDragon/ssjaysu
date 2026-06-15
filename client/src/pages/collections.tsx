import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ProductCard } from "@/components/product-card";
import { useProducts } from "@/hooks/use-products";
import { CartDrawer } from "@/components/layout/cart-drawer";
import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal, ChevronDown } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export default function Collections() {
  const { data: products, isLoading } = useProducts();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedMetals, setSelectedMetals] = useState<string[]>([]);
  
  // Extract unique filters from data - use case-insensitive mapping if needed
  const categories = useMemo(() => 
    Array.from(new Set(products?.map(p => p.category) || [])).sort(), 
    [products]
  );
  
  const metals = useMemo(() => 
    Array.from(new Set(products?.map(p => p.metalType) || [])).sort(), 
    [products]
  );

  // Filter Logic
  const filteredProducts = useMemo(() => {
    if (!products) return [];
    return products.filter(product => {
      const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(product.category);
      const metalMatch = selectedMetals.length === 0 || selectedMetals.includes(product.metalType);
      return categoryMatch && metalMatch;
    });
  }, [products, selectedCategories, selectedMetals]);

  const toggleFilter = (set: React.Dispatch<React.SetStateAction<string[]>>, item: string) => {
    set(prev => prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]);
  };

  const FiltersContent = () => (
    <div className="space-y-8">
      <div>
        <h3 className="font-serif text-lg mb-4">Category</h3>
        <div className="space-y-3">
          {categories.map(cat => (
            <div key={cat} className="flex items-center space-x-3">
              <Checkbox 
                id={`cat-${cat}`} 
                checked={selectedCategories.includes(cat)}
                onCheckedChange={() => toggleFilter(setSelectedCategories, cat)}
              />
              <Label htmlFor={`cat-${cat}`} className="text-sm cursor-pointer">{cat}</Label>
            </div>
          ))}
        </div>
      </div>
      
      <div className="h-px bg-border/50" />
      
      <div>
        <h3 className="font-serif text-lg mb-4">Metal Type</h3>
        <div className="space-y-3">
          {metals.map(metal => (
            <div key={metal} className="flex items-center space-x-3">
              <Checkbox 
                id={`metal-${metal}`}
                checked={selectedMetals.includes(metal)}
                onCheckedChange={() => toggleFilter(setSelectedMetals, metal)}
              />
              <Label htmlFor={`metal-${metal}`} className="text-sm cursor-pointer">{metal}</Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <CartDrawer />

      <div className="pt-32 pb-16 container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
            <p className="text-sm text-primary uppercase tracking-widest font-medium mb-2">The Collection</p>
            <h1 className="font-serif text-4xl md:text-5xl text-foreground">Fine Jewelry</h1>
          </div>
          
          <div className="mt-6 md:mt-0 flex items-center gap-4">
            <span className="text-sm text-muted-foreground">{filteredProducts.length} Products</span>
            
            {/* Mobile Filter */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="md:hidden">
                  <SlidersHorizontal className="w-4 h-4 mr-2" /> Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <SheetHeader className="mb-6">
                  <SheetTitle className="font-serif text-2xl text-left">Filters</SheetTitle>
                </SheetHeader>
                <FiltersContent />
              </SheetContent>
            </Sheet>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-12">
          {/* Desktop Sidebar */}
          <aside className="hidden md:block">
            <FiltersContent />
          </aside>

          {/* Product Grid */}
          <main>
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="bg-gray-100 aspect-[3/4] mb-4" />
                    <div className="h-4 bg-gray-100 w-3/4 mb-2" />
                    <div className="h-4 bg-gray-100 w-1/4" />
                  </div>
                ))}
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-secondary/5 rounded-lg">
                <h3 className="font-serif text-xl mb-2">No products found</h3>
                <p className="text-muted-foreground">Try adjusting your filters to see more results.</p>
                <Button 
                  variant="link" 
                  className="mt-4"
                  onClick={() => {
                    setSelectedCategories([]);
                    setSelectedMetals([]);
                  }}
                >
                  Clear all filters
                </Button>
              </div>
            )}
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
}
