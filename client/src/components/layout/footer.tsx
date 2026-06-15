import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="space-y-4">
            <h3 className="text-2xl font-serif font-bold text-background">Ethereal Luxe</h3>
            <p className="text-secondary-foreground/70 text-sm leading-relaxed max-w-xs">
              Crafting timeless elegance for life's most precious moments. Every piece tells a story of luxury, passion, and eternal beauty.
            </p>
          </div>

          <div>
            <h4 className="font-serif text-lg mb-6 text-background">Shop</h4>
            <ul className="space-y-3 text-sm text-secondary-foreground/70">
              <li><Link href="/collections" className="hover:text-primary transition-colors">All Collections</Link></li>
              <li><Link href="/collections?category=Engagement" className="hover:text-primary transition-colors">Engagement Rings</Link></li>
              <li><Link href="/collections?category=Wedding" className="hover:text-primary transition-colors">Wedding Bands</Link></li>
              <li><Link href="/collections?category=Fine Jewelry" className="hover:text-primary transition-colors">Fine Jewelry</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-lg mb-6 text-background">Company</h4>
            <ul className="space-y-3 text-sm text-secondary-foreground/70">
              <li><Link href="/about" className="hover:text-primary transition-colors">Our Story</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
              <li><Link href="/shipping" className="hover:text-primary transition-colors">Shipping & Returns</Link></li>
              <li><Link href="/care" className="hover:text-primary transition-colors">Jewelry Care</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-lg mb-6 text-background">Newsletter</h4>
            <p className="text-secondary-foreground/70 text-sm mb-4">
              Subscribe to receive updates, access to exclusive deals, and more.
            </p>
            <form className="flex gap-2">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-transparent border-b border-secondary-foreground/30 py-2 px-1 w-full text-sm focus:outline-none focus:border-primary transition-colors placeholder:text-secondary-foreground/30"
              />
              <button className="text-sm uppercase tracking-widest font-medium hover:text-primary transition-colors">
                Join
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-secondary-foreground/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-secondary-foreground/40">
          <p>© 2024 Ethereal Luxe. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-primary">Privacy Policy</a>
            <a href="#" className="hover:text-primary">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
