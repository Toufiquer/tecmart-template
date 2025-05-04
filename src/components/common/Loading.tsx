import React from 'react';
import { motion } from 'framer-motion';

interface FullPageLoaderProps {
  bgColor?: string;
  accentColor?: string;
  message?: string;
}

const AnimatedCircle: React.FC<{
  className: string;
  style: React.CSSProperties;
  animate: import('framer-motion').TargetAndTransition;
  transition: object;
}> = ({ className, style, animate, transition }) => (
  <motion.div className={className} style={style} animate={animate} transition={transition} />
);

const LoadingComponent: React.FC<FullPageLoaderProps> = ({
  bgColor = 'rgba(31, 41, 55, 0.7)', // Semi-transparent gray
  accentColor = '#ec4899', // pink-500
  message = 'Please wait...',
}) => {
  const circleStyle = { borderColor: accentColor };
  const dotStyle = { backgroundColor: accentColor };

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center z-50" style={{ backgroundColor: bgColor }}>
      <div className="p-8 rounded-lg backdrop-blur-sm bg-white/10 flex flex-col items-center">
        <div className="relative h-24 w-24">
          <AnimatedCircle
            className="absolute inset-0 rounded-full border-t-4 border-b-4"
            style={circleStyle}
            animate={{ rotate: 360, scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
          <AnimatedCircle
            className="absolute inset-2 rounded-full border-r-4 border-l-4"
            style={circleStyle}
            animate={{ rotate: -360, scale: [1, 0.8, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{ scale: [0.8, 1.1, 0.8] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div className="h-4 w-4 rounded-full" style={dotStyle} />
          </motion.div>
        </div>

        <motion.p className="mt-6 text-white font-medium text-lg" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
          {message}
        </motion.p>

        <motion.div className="mt-4 w-32 h-1 rounded-full overflow-hidden bg-white/20">
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{
              repeat: Infinity,
              duration: 1.5,
              ease: 'linear',
            }}
            className="h-full w-1/2 rounded-full"
            style={{ backgroundColor: accentColor }}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default LoadingComponent;
