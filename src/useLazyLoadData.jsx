import { useEffect, useState } from "react";

/**
 * Custom hook for lazy loading data from multiple files
 * @param {string[]} files - Array of file paths to load
 * @param {boolean} inView - Whether the component is in view
 * @returns {Object|null} - Merged data from all files or null if not loaded
 */
export default function useLazyLoadData(files, inView) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!inView || !Array.isArray(files) || files.length === 0) {
      setData(null);
      setError(null);
      return;
    }

    let isMounted = true;

    const loadData = async () => {
      setLoading(true);
      setError(null);

      try {
        const results = await Promise.all(
          files.map(async (filePath) => {
            try {
              const content = await import(filePath);
              return content.default || content;
            } catch (err) {
              throw new Error(`Failed to load: ${filePath}`);
            }
          })
        );

        if (!isMounted) return;

        // Merge all results into a single object
        const mergedData = results.reduce((acc, content) => {
          const extractedData = extractArraysFromContent(content);
          return { ...acc, ...extractedData };
        }, {});

        setData(mergedData);
      } catch (error) {
        if (isMounted) {
          setError(error.message || "Failed to load data");
          setData(null);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, [files, inView]);

  return { data, error, loading };
}

/**
 * Extracts arrays from content or returns the original content
 * @param {Object} content - The content to process
 * @returns {Object} - Processed content with arrays extracted
 */
function extractArraysFromContent(content) {
  const arrays = Object.entries(content)
    .filter(([_, value]) => Array.isArray(value))
    .reduce((acc, [key, value]) => {
      acc[key] = value;
      return acc;
    }, {});

  return Object.keys(arrays).length > 0 ? arrays : content;
}
