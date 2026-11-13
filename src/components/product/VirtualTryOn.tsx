'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';

interface VirtualTryOnProps {
  productImage: string;
  productName: string;
}

export default function VirtualTryOn({ productImage, productName }: VirtualTryOnProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<'upload' | 'processing' | 'result'>('upload');
  const [userPhoto, setUserPhoto] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleOpen = () => {
    setIsOpen(true);
    setStep('upload');
    setUserPhoto(null);
    document.body.style.overflow = 'hidden';
  };

  const handleClose = () => {
    setIsOpen(false);
    document.body.style.overflow = '';
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUserPhoto(e.target?.result as string);
        processAI();
      };
      reader.readAsDataURL(file);
    }
  };

  const processAI = () => {
    setStep('processing');
    // Mock 3 second AI processing delay
    setTimeout(() => {
      setStep('result');
    }, 3000);
  };

  return (
    <>
      <button
        onClick={handleOpen}
        className="w-full flex items-center justify-center gap-2 py-4 mt-3 border border-neutral-200 dark:border-neutral-800 text-sm font-medium tracking-widest uppercase hover:border-neutral-900 dark:hover:border-neutral-100 transition-colors"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="17 8 12 3 7 8" />
          <line x1="12" y1="3" x2="12" y2="15" />
        </svg>
        AI Virtual Try-On
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-neutral-900/60 backdrop-blur-sm animate-fade-in">
          <div 
            className="fixed inset-0" 
            onClick={step !== 'processing' ? handleClose : undefined} 
          />
          
          <div className="relative w-full max-w-lg bg-white dark:bg-neutral-900 rounded-xl shadow-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 animate-slide-up">
            
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-neutral-100 dark:border-neutral-800">
              <h3 className="text-sm font-medium uppercase tracking-widest text-neutral-900 dark:text-white">
                Virtual Try-On
              </h3>
              <button 
                onClick={handleClose}
                disabled={step === 'processing'}
                className="p-2 text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors disabled:opacity-50"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="p-6 md:p-8 flex flex-col items-center">
              
              {step === 'upload' && (
                <div className="w-full text-center">
                  <div className="w-24 h-32 mx-auto mb-6 relative rounded-lg overflow-hidden bg-neutral-100 dark:bg-neutral-800">
                    <Image src={productImage} alt={productName} fill className="object-cover" />
                  </div>
                  <h4 className="text-lg font-light mb-2">See how it fits you.</h4>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-8 max-w-sm mx-auto">
                    Upload a full-body photo of yourself to generate a personalized AI fitting.
                  </p>
                  
                  <input 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    ref={fileInputRef}
                    onChange={handleFileChange}
                  />
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="px-8 py-3 bg-neutral-900 dark:bg-white text-white dark:text-black text-sm font-medium uppercase tracking-widest hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors w-full"
                  >
                    Upload Photo
                  </button>
                </div>
              )}

              {step === 'processing' && (
                <div className="w-full text-center py-12">
                  <div className="relative w-32 h-32 mx-auto mb-8">
                    {userPhoto && (
                      <div className="absolute inset-0 rounded-full overflow-hidden opacity-50 blur-sm">
                        <Image src={userPhoto} alt="User" fill className="object-cover" />
                      </div>
                    )}
                    <div className="absolute inset-0 border-2 border-neutral-200 dark:border-neutral-800 border-t-neutral-900 dark:border-t-white rounded-full animate-spin" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="animate-pulse">
                        <path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83" />
                      </svg>
                    </div>
                  </div>
                  <h4 className="text-lg font-light animate-pulse">Generating Fit...</h4>
                  <p className="text-xs text-neutral-400 mt-2 uppercase tracking-widest">Our AI is mapping the garment</p>
                </div>
              )}

              {step === 'result' && userPhoto && (
                <div className="w-full text-center">
                  <div className="relative w-full aspect-[3/4] bg-neutral-100 dark:bg-neutral-800 rounded-lg overflow-hidden mb-6">
                    {/* Mock result: User photo background, Product overlaid */}
                    <Image src={userPhoto} alt="Your Fit" fill className="object-cover" />
                    <div className="absolute inset-0 flex items-center justify-center mix-blend-multiply dark:mix-blend-screen opacity-90">
                      <Image src={productImage} alt={productName} fill className="object-contain p-8" />
                    </div>
                  </div>
                  <h4 className="text-lg font-light mb-4">Your AI Fit</h4>
                  <div className="flex gap-3">
                    <button 
                      onClick={() => setStep('upload')}
                      className="flex-1 px-4 py-3 border border-neutral-200 dark:border-neutral-800 text-xs font-medium uppercase tracking-widest hover:border-neutral-900 dark:hover:border-neutral-100 transition-colors"
                    >
                      Try Another
                    </button>
                    <button 
                      onClick={handleClose}
                      className="flex-1 px-4 py-3 bg-neutral-900 dark:bg-white text-white dark:text-black text-xs font-medium uppercase tracking-widest hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors"
                    >
                      Looks Good
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      )}
    </>
  );
}
