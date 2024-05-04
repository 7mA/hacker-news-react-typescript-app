import React, { useRef } from 'react';
import NewsFeedList from './NewsFeedList';
import useFetchData from '../server/useFetchData';
import NewsFeedLoading from './NewsFeedLoading';

const NewsFeedContainer = () => {
    const sentinelRef = useRef<HTMLDivElement>(null);
    const { data, loading, error } = useFetchData(sentinelRef);

    return (
        <div>
            {data && <NewsFeedList items={data} />}
            {loading && <NewsFeedLoading />}
            {error && <div>Error: {error.message}</div>}
            <div ref={sentinelRef}></div>
        </div>
    );
};

export default NewsFeedContainer;