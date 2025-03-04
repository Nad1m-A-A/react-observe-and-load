import { useEffect, useState, useRef } from "react";

/**
 * Custom hook to track if an element is in view using Intersection Observer
 * @param {Object} options - Configuration options
 * @param {string} [options.rootMargin='0px'] - Margin around the root element
 * @param {number} [options.threshold=0] - Number between 0 and 1 indicating the percentage of the target's visibility
 * @param {boolean} [options.triggerOnce=false] - Whether to trigger the callback only once
 * @param {Element} [options.root=null] - The element that is used as the viewport
 * @returns {Object} Object containing ref and inView state
 */
export default function useElementObserver({
  rootMargin = "0px",
  threshold = 0,
  triggerOnce = true,
  root = null,
} = {}) {
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    let isMounted = true;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!isMounted) return;

        if (entry.isIntersecting) {
          setInView(true);
          if (triggerOnce) {
            observer.disconnect();
          }
        } else if (!triggerOnce) {
          setInView(false);
        }
      },
      {
        root,
        rootMargin,
        threshold,
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      isMounted = false;
      if (currentRef) {
        observer.unobserve(currentRef);
      }
      observer.disconnect();
    };
  }, [rootMargin, threshold, triggerOnce, root]);

  return { ref, inView };
}
