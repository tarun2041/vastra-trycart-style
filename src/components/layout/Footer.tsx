import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { 
  ShoppingBag, 
  Phone, 
  Mail, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube,
  Send
} from 'lucide-react';

const Footer: React.FC = () => {
  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Newsletter subscription logic here
  };

  return (
    <footer className="bg-primary text-white border-t border-primary-light">
      <div className="container mx-auto px-4">
        {/* Newsletter Section */}
        <div className="py-16 border-b border-white/10">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-3xl font-bold mb-3">Stay in the Loop</h3>
            <p className="text-white/70 mb-8 text-lg">
              Get the latest fashion trends and exclusive offers delivered to your inbox
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex gap-3 max-w-md mx-auto">
              <Input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:bg-white/20"
                required
              />
              <Button type="submit" className="bg-accent text-white hover:bg-accent-light px-6 shadow-glow">
                <Send className="w-4 h-4 mr-2" />
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center shadow-brand">
                <ShoppingBag className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold">VastraBazaar</span>
            </div>
            <p className="text-white/70 text-sm leading-relaxed">
              India's fastest fashion delivery platform. Get your favorite clothes in just 10 minutes with our revolutionary TryCart feature.
            </p>
            <div className="flex gap-3">
              <Button variant="ghost" size="icon" className="w-9 h-9 bg-white/10 hover:bg-accent hover:text-white transition-all duration-300">
                <Facebook className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" className="w-9 h-9 bg-white/10 hover:bg-accent hover:text-white transition-all duration-300">
                <Twitter className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" className="w-9 h-9 bg-white/10 hover:bg-accent hover:text-white transition-all duration-300">
                <Instagram className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" className="w-9 h-9 bg-white/10 hover:bg-accent hover:text-white transition-all duration-300">
                <Youtube className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-5">Quick Links</h4>
            <div className="space-y-3">
              <Link to="/products" className="block text-sm text-white/70 hover:text-accent transition-all duration-300 hover:translate-x-1">
                Shop All
              </Link>
              <Link to="/products/Men" className="block text-sm text-white/70 hover:text-accent transition-all duration-300 hover:translate-x-1">
                Men's Fashion
              </Link>
              <Link to="/products/Women" className="block text-sm text-white/70 hover:text-accent transition-all duration-300 hover:translate-x-1">
                Women's Fashion
              </Link>
              <Link to="/products/Kids" className="block text-sm text-white/70 hover:text-accent transition-all duration-300 hover:translate-x-1">
                Kids' Collection
              </Link>
              <Link to="/products/Accessories" className="block text-sm text-white/70 hover:text-accent transition-all duration-300 hover:translate-x-1">
                Accessories
              </Link>
              <Link to="/trycart" className="block text-sm text-white/70 hover:text-accent transition-all duration-300 hover:translate-x-1">
                TryCart Innovation
              </Link>
            </div>
          </div>

          {/* Customer Support */}
          <div>
            <h4 className="font-bold text-lg mb-5">Customer Support</h4>
            <div className="space-y-3">
              <Link to="/contact" className="block text-sm text-white/70 hover:text-accent transition-all duration-300 hover:translate-x-1">
                Contact Us
              </Link>
              <Link to="/faq" className="block text-sm text-white/70 hover:text-accent transition-all duration-300 hover:translate-x-1">
                FAQ
              </Link>
              <Link to="/terms" className="block text-sm text-white/70 hover:text-accent transition-all duration-300 hover:translate-x-1">
                Terms & Conditions
              </Link>
              <Link to="/privacy" className="block text-sm text-white/70 hover:text-accent transition-all duration-300 hover:translate-x-1">
                Privacy Policy
              </Link>
              <Link to="/refund" className="block text-sm text-white/70 hover:text-accent transition-all duration-300 hover:translate-x-1">
                Refund Policy
              </Link>
              <Link to="/careers" className="block text-sm text-white/70 hover:text-accent transition-all duration-300 hover:translate-x-1">
                Careers
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold text-lg mb-5">Get in Touch</h4>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-sm text-white/70">
                <Phone className="w-4 h-4 text-accent" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-white/70">
                <Mail className="w-4 h-4 text-accent" />
                <span>support@vastrabazaar.com</span>
              </div>
              <div className="flex items-start gap-3 text-sm text-white/70">
                <MapPin className="w-4 h-4 mt-0.5 text-accent" />
                <span>
                  123 Fashion Street,<br />
                  Mumbai, Maharashtra 400001
                </span>
              </div>
            </div>
          </div>
        </div>

        <Separator className="bg-white/10" />

        {/* Bottom Footer */}
        <div className="py-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-white/70">
            © 2024 VastraBazaar. All rights reserved. | Clothing in 10 minutes
          </p>
          <div className="flex gap-6 text-sm text-white/70">
            <span>Made with <span className="text-accent">❤️</span> in India</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;