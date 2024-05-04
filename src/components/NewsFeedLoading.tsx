import React from 'react';
import NewsFeedLoadingItem from './NewsFeedLoadingItem';

const NewsFeedLoading: React.FC = () => {
    const countArray: number[] = new Array(3).fill(0);
    return (
        <ul className="max-w-4xl mx-auto mb-10">
            {countArray.map((_, index) => (
                <NewsFeedLoadingItem key={index} />
            ))}
            <div className="sr-only">Loading...</div>
        </ul>
    );
};

export default NewsFeedLoading;