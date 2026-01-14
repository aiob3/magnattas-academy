import React, { forwardRef } from 'react';

interface ShirtCanvasProps {
  id?: string;
  className?: string;
}

// This component visually constructs the shirt for the user to see and for us to capture/edit
export const ShirtCanvas = forwardRef<HTMLDivElement, ShirtCanvasProps>(({ id, className }, ref) => {
  return (
    <div 
      ref={ref}
      id={id}
      className={`relative flex aspect-[3/4] w-full max-w-md flex-col items-center justify-center overflow-hidden bg-neutral-900 shadow-2xl ${className}`}
    >
      {/* Background/Base Shirt Texture Simulation */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-neutral-800 to-black opacity-100" />
      
      {/* Shirt Silhouette Placeholder (In a real app, this would be a transparent PNG of the shirt) */}
      <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay"></div>
      
      {/* The Explicit Message */}
      <div className="z-10 flex flex-col items-center gap-6 p-8 text-center mix-blend-screen">
        <h2 className="font-sans text-5xl font-black uppercase leading-[0.85] tracking-tighter text-white sm:text-6xl md:text-7xl">
          NEGÓCIOS<br />
          CAROS
        </h2>
        
        <h2 className="font-sans text-5xl font-black uppercase leading-[0.85] tracking-tighter text-white/90 sm:text-6xl md:text-7xl">
          AMIGOS<br />
          RAROS
        </h2>
      </div>

      {/* Brand Tag */}
      <div className="absolute bottom-8 text-[10px] uppercase tracking-[0.3em] text-white/30">
        Magnattas SP • Limited
      </div>
    </div>
  );
});

ShirtCanvas.displayName = 'ShirtCanvas';