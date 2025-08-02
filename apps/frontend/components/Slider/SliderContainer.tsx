import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import styles from './Slider.module.scss';
import Slider from './Slider.tsx';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';

function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

const SliderContainer = ({ slides, onComplete, course, initialIndex = 0 }) => {
  const { data: session } = useSession();
  const [index, setIndex] = useState(initialIndex);
  const router = useRouter();
  const currentSlide = slides[index];
  const initialCategory = currentSlide?.category || '';

  const groupedSlides = slides.reduce((acc, slide, idx) => {
    if (!acc[slide.category]) acc[slide.category] = [];
    acc[slide.category].push({ ...slide, index: idx });
    return acc;
  }, {} as Record<string, any[]>);

  const [expandedCategories, setExpandedCategories] = useState(() => ({
    [initialCategory]: true,
  }));

  const [visitedSlides, setVisitedSlides] = useState<string[]>([]);
  const [lastVisitedSlide, setLastVisitedSlide] = useState(null);
  const hasLoadedProgress = useRef(false);
  const debouncedSaveRef = useRef(null);

  const getSlideVisitedId = (slide) =>
    `${slide.courseSlug}-${slide.slug}`;

  // ✅ Load visitedSlides and lastVisitedSlide on mount
  useEffect(() => {
    const loadProgress = async () => {
      if (!session?.user?.id || !course.slug || hasLoadedProgress.current) return;

      try {
        const res = await fetch(`/api/progress/${course.slug}`);
        const data = await res.json();

        if (data?.visitedSlides && Array.isArray(data.visitedSlides)) {
          setVisitedSlides(data.visitedSlides);
        }

        if (data?.lastSlideSlug && data?.lastCategorySlug) {
          const foundIndex = slides.findIndex(
            (s) =>
              s.slug === data.lastSlideSlug &&
              s.categorySlug === data.lastCategorySlug
          );
          if (foundIndex >= 0) {
            setIndex(foundIndex);
          }
        }

        hasLoadedProgress.current = true;
      } catch (err) {
        console.error("Failed to load progress:", err);
      }
    };

    loadProgress();
  }, [session?.user?.id, course.slug, slides]);

  // Update URL when index changes
  useEffect(() => {
    if (currentSlide) {
      router.replace(
        `/courses/${currentSlide.courseSlug}/${currentSlide.categorySlug}/${currentSlide.slug}`,
        undefined,
        { shallow: true }
      );
    }
  }, [index]);

  // Track visited slide + lastVisitedSlide
  useEffect(() => {
    if (!slides[index]) return;

    const visitedId = getSlideVisitedId(slides[index]);
    if (!visitedSlides.includes(visitedId)) {
      setVisitedSlides((prev) => [...prev, visitedId]);
    }

    const currentCategory = slides[index]?.category;
    if (currentCategory) {
      setExpandedCategories((prev) => ({
        ...prev,
        [currentCategory]: true,
      }));
    }

    setLastVisitedSlide({
      categorySlug: slides[index]?.categorySlug,
      slideSlug: slides[index]?.slug,
    });
  }, [index, slides]);

  // ✅ Debounce setup (once)
  useEffect(() => {
    debouncedSaveRef.current = debounce(async (visitedSlides, lastVisitedSlide) => {
      if (!session?.user?.id || !lastVisitedSlide) return;

      try {
        await fetch(`/api/progress/${course.slug}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ visitedSlides, lastVisitedSlide }),
        });
      } catch (err) {
        console.error("Failed to save progress:", err);
      }
    }, 2000);
  }, [session?.user?.id, course.slug]);

  // Trigger debounced save
  useEffect(() => {
    if (debouncedSaveRef.current) {
      debouncedSaveRef.current(visitedSlides, lastVisitedSlide);
    }
  }, [visitedSlides, lastVisitedSlide]);

  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.sidebar}>
        <div style={{ color: '#fff', display: 'flex', padding: '10px' }}>
          <div>
            <span className={styles.sidebarHeaderTitle} style={{ display: 'block' }}>{course.title}</span>
            <span className={styles.sidebarHeaderCategory}>{course.category}</span>
          </div>
        </div>
        <hr style={{ margin: '10px', borderColor: '#7c80b5' }} />

        {Object.entries(groupedSlides).map(([category, slidesInCategory]) => (
          <div key={category} className={styles.categoryContainer}>
            <h3
              className={styles.sidebarHeader}
              onClick={() => toggleCategory(category)}
              style={{ cursor: 'pointer' }}
            >
              <span>{category}</span>
              <span className={styles.expandIcon}>
                {expandedCategories[category]
                  ? <FontAwesomeIcon icon={faChevronUp} />
                  : <FontAwesomeIcon icon={faChevronDown} />}
              </span>
            </h3>

            <AnimatePresence initial={false}>
              {expandedCategories[category] && (
                <motion.div
                  key={category}
                  initial="collapsed"
                  animate="open"
                  exit="collapsed"
                  variants={{
                    open: { opacity: 1, height: 'auto' },
                    collapsed: { opacity: 0, height: 0 },
                  }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  style={{ overflow: 'hidden' }}
                >
                  <ul className={styles.verticalLineContainer}>
                    {slidesInCategory.map((slide) => {
                      const visitedId = getSlideVisitedId(slide);
                      const isVisited = visitedSlides.includes(visitedId);
                      const isActive = index === slide.index;

                      return (
                        <li
                          key={visitedId}
                          className={`
                            ${isVisited ? styles.visitedLI : ''}
                            ${isActive ? styles.activeLI : ''}
                            ${slide.type === 'quiz' ? styles.quizLI : ''}
                            ${slide.type === 'exercise' ? styles.exerciseLI : ''}
                          `}
                        >
                          <button
                            className={`${styles.navItem} ${isActive ? styles.active : ''}`}
                            onClick={() => setIndex(slide.index)}
                          >
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                              <span>{slide.title}</span>
                              {isVisited && !isActive && (
                                <FontAwesomeIcon color="#26B67F" width="12px" icon={faCheck} />
                              )}
                            </div>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      <Slider
        slides={slides}
        index={index}
        setIndex={setIndex}
        onComplete={onComplete}
      />
    </div>
  );
};

export default SliderContainer;
