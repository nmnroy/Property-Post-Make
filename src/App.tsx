import { useState, useRef, useEffect } from 'react';
import { PostForm } from './components/PostForm';
import type { PostData } from './components/PostForm';
import { PostCard } from './components/PostCard';
import { toPng } from 'html-to-image';
import { Download, Loader2, Sparkles, CheckCircle2 } from 'lucide-react';
import { Logo } from './components/Logo';
import { BackgroundArt } from './components/BackgroundArt';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';
import confetti from 'canvas-confetti';

const INITIAL_DATA: PostData = {
  template: 'onyx',
  propertyType: '4 BHK Villa',
  location: 'Sushant Golf City, Lucknow',
  price: '₹2.5 Cr onwards',
  highlights: ['3000 sq.ft', 'Corner plot', 'Ready to move']
};

function App() {
  const [postData, setPostData] = useState<PostData>(INITIAL_DATA);
  const [isExporting, setIsExporting] = useState(false);
  const [exportSuccess, setExportSuccess] = useState(false);
  const postRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleDownload = async () => {
    if (!postRef.current) return;
    try {
      setIsExporting(true);
      
      const dataUrl = await toPng(postRef.current, {
        cacheBust: true,
        pixelRatio: 2,
        width: 1080,
        height: 1350,
        style: {
          transform: 'scale(1)',
          transformOrigin: 'top left',
          margin: '0'
        }
      });
      
      const link = document.createElement('a');
      const slug = postData.propertyType 
        ? postData.propertyType.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
        : 'post';
      link.download = `naman-estates-${slug}.png`;
      link.href = dataUrl;
      link.click();

      // Trigger Confetti and Success State
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#B8695A', '#E8C9BE', '#FAF6F1']
      });
      setExportSuccess(true);
      setTimeout(() => setExportSuccess(false), 2000);
      
    } catch (err) {
      console.error('Failed to generate image', err);
      alert('Failed to generate image. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 15 } }
  };

  return (
    <div className="min-h-screen bg-[#FAF6F1] flex flex-col font-sans text-[#2B2420] relative overflow-x-hidden selection:bg-[#B8695A]/20">
      
      {/* Background Architectural Sketch */}
      <BackgroundArt />

      {/* Ambient cursor-reactive glow */}
      <motion.div 
        className="pointer-events-none fixed inset-0 z-0 opacity-40 transition-opacity duration-1000"
        animate={{
          background: `radial-gradient(800px circle at ${mousePos.x}px ${mousePos.y}px, rgba(232, 201, 190, 0.25), transparent 40%)`
        }}
      />

      <motion.div 
        className="relative z-10 flex flex-col min-h-screen"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {/* Top Header */}
        <motion.header variants={itemVariants} className="border-b border-[#D9CEC0] px-4 md:px-8 py-4 shrink-0 bg-[#FAF6F1]">
          <div className="max-w-[1400px] mx-auto flex justify-between items-center">
            <div className="flex items-center gap-4">
              <motion.div 
                animate={{ rotateY: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="w-12 h-12 bg-gradient-to-br from-[#E8C9BE]/50 to-[#F3EDE5] border border-[#E8C9BE] rounded-xl flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(184,105,90,0.15)]"
              >
                <Logo size={28} variant="clay" />
              </motion.div>
              <div>
                <h1 className="text-xl md:text-2xl font-bold tracking-tight text-[#2B2420] flex items-center gap-3">
                  Naman Estates 
                </h1>
                <p className="text-sm text-[#7A6A63] mt-0.5 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-[#B8695A]" />
                  Property Post Maker
                </p>
              </div>
            </div>
          </div>
        </motion.header>

        {/* Main Content Workspace */}
        <main className="flex-1 max-w-[1400px] w-full mx-auto p-4 md:p-8 flex flex-col lg:flex-row gap-6 md:gap-8">
          
          {/* Left panel: Form */}
          <motion.div variants={itemVariants} className="w-full lg:w-[450px] xl:w-[500px] shrink-0 flex flex-col gap-6">
            <PostForm data={postData} onChange={setPostData} />
          </motion.div>
          
          {/* Right panel: Live Preview */}
          <motion.div variants={itemVariants} className="w-full flex-1 flex flex-col gap-4 bg-[#F3EDE5] p-3 md:p-5 rounded-3xl border border-[#D9CEC0] shadow-[0_8px_30px_rgba(184,105,90,0.06)] relative min-h-[600px]">
            <div className="flex flex-col sm:flex-row gap-4 justify-end items-start sm:items-center w-full mb-2">
              <motion.button 
                whileHover={{ scale: 1.02, boxShadow: '0 0 20px rgba(184,105,90,0.3)' }}
                whileTap={{ scale: 0.97 }}
                onClick={handleDownload}
                disabled={isExporting}
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#B8695A] to-[#995346] text-[#FAF6F1] px-6 py-3 rounded-xl font-bold transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-lg text-sm w-full sm:w-auto relative overflow-hidden shrink-0"
              >
                <AnimatePresence mode="wait">
                  {exportSuccess ? (
                    <motion.div key="success" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5" /> Saved!
                    </motion.div>
                  ) : isExporting ? (
                    <motion.div key="exporting" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex items-center gap-2">
                      <Loader2 className="w-5 h-5 animate-spin" /> Exporting...
                    </motion.div>
                  ) : (
                    <motion.div key="download" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex items-center gap-2">
                      <Download className="w-5 h-5" /> Download Post
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
            
            <div className="flex-1 w-full min-h-[520px] sm:min-h-[600px] md:min-h-[700px] lg:min-h-[780px] xl:min-h-[880px] 2xl:min-h-[960px] overflow-hidden bg-[#FAF6F1] rounded-2xl border border-[#D9CEC0] p-2 relative flex items-center justify-center">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-[0.35] sm:scale-[0.42] md:scale-[0.48] lg:scale-[0.55] xl:scale-[0.62] 2xl:scale-[0.68]">
                <div ref={postRef} className="shrink-0 rounded-lg overflow-hidden shadow-2xl" style={{ width: '1080px', height: '1350px' }}>
                  <PostCard data={postData} isExporting={isExporting} />
                </div>
              </div>
            </div>
          </motion.div>

        </main>

        {/* Global Footer */}
        <motion.footer variants={itemVariants} className="w-full py-6 mt-auto text-center shrink-0">
          <p className="text-xs font-medium text-[#2B2420]/40 tracking-wide uppercase">
            Built by Naman using Claude for the MLH assignment
          </p>
        </motion.footer>

      </motion.div>
    </div>
  );
}

export default App;
