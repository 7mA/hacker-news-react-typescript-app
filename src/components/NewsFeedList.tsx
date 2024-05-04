import React from 'react';
import NewsFeedItem from './NewsFeedItem';
import FeedItem from '../domain/feedItem';

interface NewsFeedListProps {
    items: FeedItem[] | null;
}

const NewsFeedList: React.FC<NewsFeedListProps> = ({ items }) => {
  return (items && 
    <ul className="max-w-4xl mx-auto mb-10">
      {items.map(item => (
        <NewsFeedItem key={item.id} item={item} />
      ))}
    </ul>
  );
};

export default NewsFeedList;