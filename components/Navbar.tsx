import React from 'react';
import { Menu, ShoppingBag } from 'lucide-react';

export const Navbar: React.FC = () => {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-luxury-black/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          <Menu className="h-6 w-6 cursor-pointer text-white/70 hover:text-white" />
          <span className="hidden text-xs uppercase tracking-widest text-white/50 sm:block">
            São Paulo • Jardins
          </span>
        </div>
        
        <div className="absolute left-1/2 -translate-x-1/2 transform text-center">
          <h1 className="font-display text-2xl font-bold tracking-[0.2em] text-white">
            MAGNATTAS
          </h1>
        </div>

        <div className="flex items-center gap-6">
          <button className="hidden text-xs font-medium uppercase tracking-widest text-white/70 hover:text-white sm:block">
            Login
          </button>
          <div className="relative cursor-pointer">
            <ShoppingBag className="h-5 w-5 text-white" />
            <span className="absolute -right-1 -top-1 flex h-3 w-3 items-center justify-center rounded-full bg-luxury-gold text-[8px] font-bold text-black">
              1
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
};