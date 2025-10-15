
'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { DMSimulator, ColdCallSimulator, KnowledgeQuiz, TrainingReport } from '@/lib/placeholders/screenshots';

export function Screenshots() {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start end', 'end start'],
  });

  // Subtle parallax effect
  const y1 = useTransform(scrollYProgress, [0, 1], ['-5%', '5%']);
  const y2 = useTransform(scrollYProgress, [0, 1], ['5%', '-5%']);
  const y3 = useTransform(scrollYProgress, [0, 1], ['-3%', '3%']);
  const y4 = useTransform(scrollYProgress, [0, 1], ['3%', '-3%']);

  return (
    <section ref={targetRef} className="py-24 bg-card overflow-hidden">
      <div className="container">
        <h2 className="text-4xl font-bold text-center mb-16 font-headline">
          A Glimpse Inside the Trainer
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <motion.div style={{ y: y1 }}>
               <DMSimulator />
            </motion.div>
            <motion.div style={{ y: y2 }}>
               <KnowledgeQuiz />
            </motion.div>
            <motion.div style={{ y: y3 }}>
                <ColdCallSimulator />
            </motion.div>
            <motion.div style={{ y: y4 }}>
                <TrainingReport />
            </motion.div>
        </div>
      </div>
    </section>
  );
}
