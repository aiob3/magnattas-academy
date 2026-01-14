import React, { useRef } from 'react';
import { Navbar } from './components/Navbar';
import { ShirtCanvas } from './components/ShirtCanvas';
import { AIEditor } from './components/AIEditor';
import { Button } from './components/Button';
import { ArrowRight, Star } from 'lucide-react';

export default function App() {
  const shirtRef = useRef<HTMLDivElement>(null);

  return (
    <div className="min-h-screen bg-luxury-black pb-20 text-white selection:bg-luxury-gold selection:text-black">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 pt-10 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="mb-12 text-center sm:mb-16">
          <div className="mb-4 flex items-center justify-center gap-2">
            <Star className="h-4 w-4 fill-luxury-gold text-luxury-gold" />
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-luxury-gold">
              Collection 001 • São Paulo
            </span>
            <Star className="h-4 w-4 fill-luxury-gold text-luxury-gold" />
          </div>
          <h2 className="mb-6 font-display text-4xl font-bold uppercase leading-tight tracking-tight sm:text-6xl md:text-7xl">
            Negócios Caros
            <span className="block text-white/30">Amigos Raros</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg font-light text-white/60">
            A statement piece for those who move silence in a noisy world. 
            Designed for the collector, available exclusively at MAGNATTAS.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12">
          
          {/* Left Column: Product Visual */}
          <div className="lg:col-span-7 lg:sticky lg:top-24">
             <div className="relative flex w-full flex-col items-center">
                {/* The Source of Truth Shirt Element */}
                <ShirtCanvas ref={shirtRef} className="rounded-sm shadow-2xl shadow-luxury-gold/5" />
                
                <div className="mt-8 flex w-full max-w-md items-center justify-between text-xs font-medium uppercase tracking-widest text-white/40">
                  <span>100% Cotton Heavyweight</span>
                  <span>Made in Brazil</span>
                </div>
             </div>
          </div>

          {/* Right Column: Interaction & AI */}
          <div className="space-y-10 lg:col-span-5">
            
            {/* Standard Purchase Info */}
            <div className="border-b border-white/10 pb-8">
              <div className="mb-4 flex items-baseline justify-between">
                <h3 className="font-display text-2xl font-bold text-white">The "Raros" Tee</h3>
                <span className="text-xl font-light text-white">R$ 499,00</span>
              </div>
              <p className="mb-6 text-sm leading-relaxed text-white/50">
                Oversized fit. Dropped shoulders. The definitive uniform for high-stakes negotiation. 
                Strictly limited quantity available at our Jardins showroom.
              </p>
              
              <div className="flex gap-4">
                 <Button className="w-full bg-white text-black hover:bg-neutral-200">
                    Add to Cart
                 </Button>
              </div>
            </div>

            {/* AI Editor Section */}
            <div>
               <div className="mb-6">
                 <h4 className="font-display text-xl font-bold uppercase tracking-wider text-luxury-gold">
                    Make It Unique
                 </h4>
                 <p className="mt-2 text-sm text-white/60">
                   Use our <span className="text-white">Gemini 2.5 AI</span> powered studio to visualize this piece in different environments or with artistic filters before you buy.
                 </p>
               </div>
               
               <AIEditor shirtRef={shirtRef} />
            </div>

            {/* Social Proof / Location */}
            <div className="rounded-lg bg-white/5 p-6">
               <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-luxury-gold/20 text-luxury-gold">
                    <ArrowRight className="h-5 w-5 -rotate-45" />
                  </div>
                  <div>
                    <h5 className="font-bold text-white">Visit the Showroom</h5>
                    <p className="mt-1 text-xs text-white/50">
                      Rua Oscar Freire, 1100<br/>
                      Jardins, São Paulo - SP
                    </p>
                  </div>
               </div>
            </div>

          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-24 border-t border-white/10 py-12">
        <div className="mx-auto max-w-7xl px-4 text-center text-xs uppercase tracking-widest text-white/30">
          © 2024 MAGNATTAS SP. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
}