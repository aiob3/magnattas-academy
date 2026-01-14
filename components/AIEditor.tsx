import React, { useState, useRef } from 'react';
import { editImageWithGemini } from '../services/geminiService';
import { Button } from './Button';
import { Wand2, Download, RefreshCw, AlertCircle } from 'lucide-react';
import html2canvas from 'html2canvas';

interface AIEditorProps {
  shirtRef: React.RefObject<HTMLDivElement>;
}

export const AIEditor: React.FC<AIEditorProps> = ({ shirtRef }) => {
  const [prompt, setPrompt] = useState('');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt || !shirtRef.current) return;
    setLoading(true);
    setError(null);

    try {
      // 1. Capture the current shirt HTML as an image
      const canvas = await html2canvas(shirtRef.current, {
        useCORS: true,
        backgroundColor: '#000000', // Ensure black background
        scale: 1 // Moderate scale for performance
      });
      
      const base64Image = canvas.toDataURL('image/jpeg', 0.8);

      // 2. Send to Gemini for editing
      const resultImage = await editImageWithGemini(base64Image, prompt);
      setGeneratedImage(resultImage);
    } catch (err) {
      setError("Failed to generate image. Please try a different prompt.");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (generatedImage) {
      const link = document.createElement('a');
      link.href = generatedImage;
      link.download = 'magnattas-custom-edit.png';
      link.click();
    }
  };

  return (
    <div className="flex w-full flex-col gap-6 rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
      <div className="flex items-center gap-2 border-b border-white/10 pb-4">
        <Wand2 className="h-5 w-5 text-luxury-gold" />
        <h3 className="font-display text-lg font-bold tracking-widest text-white">
          AI Customizer Studio
        </h3>
      </div>

      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-white/60">
          Describe your vision
        </label>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="E.g., Make it look like a vintage polaroid, add a neon glow, place it in a futuristic garage..."
          className="h-24 w-full resize-none rounded-lg border border-white/10 bg-black/50 p-4 text-sm text-white placeholder-white/30 focus:border-luxury-gold focus:outline-none focus:ring-1 focus:ring-luxury-gold"
        />
      </div>

      {error && (
        <div className="flex items-center gap-2 text-xs text-red-400">
          <AlertCircle className="h-4 w-4" />
          {error}
        </div>
      )}

      <Button 
        onClick={handleGenerate} 
        disabled={!prompt} 
        isLoading={loading}
        className="w-full"
      >
        {loading ? 'Consulting Gemini...' : 'Generate Design'}
      </Button>

      {generatedImage && (
        <div className="animate-fade-in mt-6 space-y-4 rounded-lg border border-white/10 bg-black p-4">
          <div className="mb-2 text-xs font-bold uppercase tracking-widest text-luxury-gold">
            Result
          </div>
          <div className="relative overflow-hidden rounded-lg bg-neutral-900">
            <img 
              src={generatedImage} 
              alt="Generated Shirt" 
              className="h-full w-full object-cover"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
             <Button variant="outline" onClick={() => setGeneratedImage(null)} className="w-full py-2 text-xs">
               <RefreshCw className="mr-2 h-3 w-3" /> Discard
             </Button>
             <Button variant="secondary" onClick={handleDownload} className="w-full py-2 text-xs">
               <Download className="mr-2 h-3 w-3" /> Save
             </Button>
          </div>
        </div>
      )}
    </div>
  );
};