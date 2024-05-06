import { useState, useEffect, useRef } from 'react';
import axios, { AxiosError } from 'axios';
import FeedItem from '../domain/feedItem';

function useFetchData(sentinelRef: React.RefObject<HTMLDivElement>) {
  const [data, setData] = useState<FeedItem[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<typeof AxiosError | null>(null);
  const keyListCache = useRef<number[] | null>(null);
  const startCount = useRef<number | null>(null);

  const pageSize = 20;
  const firstViewSize = 100;

  const fetchKeyList = async () => {
    let keyList: number[] = [];
    if (keyListCache.current) {
      keyList = keyListCache.current;
    } else {
      const keyResponse = await axios.get('https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty');
      keyList = keyResponse.data;
      keyListCache.current = keyList;
    }
  }

  const fetchData = async (start: number) => {
    try {
      setLoading(true);
      let keyList = keyListCache.current ?? [];
      const limitedKeyList = keyList.slice(start, start + pageSize);

      const promises = limitedKeyList.map(key => axios.get(`https://hacker-news.firebaseio.com/v0/item/${key}.json?print=pretty`));
      const detailResponseList = await Promise.all(promises);

      setData(prevData => {
        const newData = [...prevData ?? [], ...detailResponseList.map(response => response.data)];
        return newData.filter((item, index, self) => index === self.findIndex(t => t.id === item.id));
      });
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err);
      } else {
        console.error('予期しないエラー', err);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const observerCallback = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      if (entries[0].isIntersecting && !loading && startCount.current && keyListCache.current?.length) {
        if (startCount.current < keyListCache.current?.length) {
          fetchData(startCount.current);
          startCount.current += pageSize;
        } else {
          observer.disconnect();
        }
      }
    };
  
    const observer = new IntersectionObserver(observerCallback);
    if (sentinelRef.current) {
      observer.observe(sentinelRef.current);
    }
  
    return () => {
      if (sentinelRef.current) {
        observer.unobserve(sentinelRef.current);
      }
    };
  }, [loading, sentinelRef])

  useEffect(() => {
    fetchKeyList().then(() => {
      if (!startCount.current) {
        startCount.current = 0;
      }
      while (startCount.current < firstViewSize) {
        fetchData(startCount.current);
        startCount.current += pageSize;
      }
    });
    
    
  }, []);

  return { data, loading, error };
}

export default useFetchData;