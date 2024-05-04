import React from 'react';
import FeedItem from '../domain/feedItem';
import getTimeDiff from '../utils/timeUtil';

interface NewsFeedItemProps {
    item: FeedItem | null;
}

const NewsFeedItem: React.FC<NewsFeedItemProps> = React.memo(({ item }) => {
    return (item &&
        <li className="bg-white shadow-md rounded-lg p-4 mt-5 md:hover:bg-sky-100 md:hover:ring-sky-500 md:text-center text-left">
            <a href={item.url ?? `https://news.ycombinator.com/item?id=${item.id}`} className="text-lg font-bold text-blue-500 hover:text-blue-700">
                {item.title}</a>
            <p className="text-gray-700 md:mt-0 mt-3">{item.score} point(s) by {item.by} {getTimeDiff(item.time)} ago | {item.descendants} comment(s)</p>
        </li>
    );
});

export default NewsFeedItem;