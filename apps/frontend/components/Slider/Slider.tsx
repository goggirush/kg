import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import styles from './Slider.module.scss';
import Button from '../Button/Button';
import ProgressBar from '../ProgressBar/CategoryProgressBar';

const Slider = ({ slides, index, setIndex, onComplete, title }) => {
  const currentSlide = slides[index];
  const currentCategory = currentSlide?.category;

  // Group all slides in the same category
  const categorySlides = slides.filter(slide => slide.category === currentCategory);
  const indexInCategory = categorySlides.findIndex(slide => slide.id === currentSlide?.id);
  const categoryCounts = slides.reduce((acc, slide) => {
    acc[slide.category] = (acc[slide.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const next = () => {
    if (index < slides.length - 1) {
      setIndex(index + 1);
    } else {
      setIndex(slides.length); // Trigger the complete screen
      onComplete?.();
    }
  };

  const prev = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };

  const restart = () => {
    setIndex(0);
  };

  return (
    <div className={`${styles.sliderContainer} ${styles[currentSlide?.type] || ''}`}>

        <>
          {title && <h1 className={styles.header}>{title}</h1>}

          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.2 }}
              className={styles.slideWrapper}
            >
              <div className={styles.slideContent}>
                {typeof currentSlide.content === 'function' ? (
                  <currentSlide.content />
                ) : (
                  currentSlide.content || <p>Slide is empty</p>
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          <div className={styles.footer}>
            <Button text="Previous" onClick={prev} disabled={index === 0} />
            <div className={styles.progress}>
              <ProgressBar currentIndex={indexInCategory + 1} total={categorySlides.length} />
            </div>
            <Button
              text={index === slides.length - 1 ? 'Finish' : 'Next'}
              onClick={next}
            />
          </div>
        </>
    
    </div>
  );
};

export default Slider;
