import { useEffect, useRef } from "react";

export function useInfiniteScroll(fetchItems: () => void, loading: boolean, isFetching: React.MutableRefObject<boolean>, dependency: any) {
    const lastItemRef = useRef<HTMLHeadingElement>(null);
    const observerRef = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
        if (lastItemRef.current) {
          // Clean up previous observer
          if (observerRef.current) {
            observerRef.current.disconnect();
          }
    
          const observer = new IntersectionObserver(async (entries) => {
            const entry = entries[0];
    
            // Load more items when reaching last item
            if (entry.isIntersecting) {
              if (isFetching.current) {
                // Wait until able to fetch
                while (isFetching.current) {
                  await new Promise((resolve) => setTimeout(resolve, 100)); // Wait for 100ms before trying again
                }
              }
              fetchItems();
            }
          });
          observer.observe(lastItemRef.current);
    
          // Save observer reference for cleanup
          observerRef.current = observer;
    
          // See last item
          lastItemRef.current.style.backgroundColor = "#899";
        }
      }, [dependency]);

      return lastItemRef
}