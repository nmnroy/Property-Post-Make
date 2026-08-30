import { useEffect, useState } from 'react';
import type { PostData } from './PostForm';
import { OnyxLuxury } from './templates/OnyxLuxury';
import { IvoryMinimal } from './templates/IvoryMinimal';
import { SunsetBold } from './templates/SunsetBold';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface PostCardProps {
  data: PostData;
  isExporting?: boolean;
}

export function PostCard({ data, isExporting = false }: PostCardProps) {
  // 3D Tilt Logic
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);
  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ["100%", "-100%"]);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ["100%", "-100%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isExporting) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // Completion Pulse Logic
  const [hasCompleted, setHasCompleted] = useState(false);
  
  const isComplete = data.propertyType.trim() !== '' && 
                     data.location.trim() !== '' && 
                     data.price.trim() !== '' && 
                     data.highlights.length > 0;

  useEffect(() => {
    if (isComplete && !hasCompleted) {
      setHasCompleted(true);
    }
  }, [isComplete, hasCompleted]);

  return (
    <motion.div
      style={!isExporting ? {
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: 1200
      } : {}}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="w-[1080px] h-[1350px] relative shrink-0 transition-shadow duration-300 shadow-[0_30px_60px_-15px_rgba(43,36,32,0.15)] rounded-xl bg-[#F3EDE5]"
    >
      <div 
        className="w-full h-full relative overflow-hidden rounded-xl bg-[#FAF6F1]"
        style={!isExporting ? { transform: "translateZ(20px)", transformStyle: "preserve-3d" } : {}}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={data.template}
            initial={{ opacity: 0, scale: 0.98, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 1.02, filter: 'blur(10px)' }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="w-full h-full absolute inset-0"
            style={!isExporting ? { transformStyle: "preserve-3d" } : {}}
          >
            {data.template === 'onyx' && <OnyxLuxury {...data} />}
            {data.template === 'ivory' && <IvoryMinimal {...data} />}
            {data.template === 'sunset' && <SunsetBold {...data} />}
          </motion.div>
        </AnimatePresence>

        {/* Specular Gleam */}
        {!isExporting && (
          <motion.div
            className="pointer-events-none absolute inset-0 z-50 mix-blend-overlay opacity-30"
            style={{
              background: "linear-gradient(105deg, transparent 20%, white 40%, transparent 60%)",
              backgroundSize: "200% 200%",
              backgroundPositionX: glareX,
              backgroundPositionY: glareY,
            }}
          />
        )}

        {/* Completion Shimmer Pulse */}
        <AnimatePresence>
          {hasCompleted && (
            <motion.div 
              initial={{ opacity: 0, x: '-100%' }}
              animate={{ opacity: [0, 0.5, 0], x: ['-100%', '100%'] }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="absolute inset-0 z-40 bg-gradient-to-r from-transparent via-white to-transparent mix-blend-overlay pointer-events-none"
            />
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
