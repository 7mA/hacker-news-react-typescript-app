import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import NewsFeedList from './NewsFeedList';
import FeedItem from '../domain/feedItem';

// NewsFeedItem コンポーネントをモック化
jest.mock('../../src/components/NewsFeedItem', () => {
  // モックコンポーネントの実装
  return ({ item }: { item: FeedItem }) => <li>{item.title}</li>;
});

describe('NewsFeedList', () => {
  // テスト用のFeedItem配列を作成
  const mockItems: FeedItem[] = [
    { id: 1, title: 'Test Title 1', url: 'https://test1.com', score: 100, by: 'user1', time: 0, descendants: 50 },
    { id: 2, title: 'Test Title 2', url: 'https://test2.com', score: 200, by: 'user2', time: 0, descendants: 100 },
  ];

  it('renders correctly with items prop', () => {
    render(<NewsFeedList items={mockItems} />);

    // 各アイテムのタイトルが表示されているか確認
    expect(screen.getByText('Test Title 1')).toBeInTheDocument();
    expect(screen.getByText('Test Title 2')).toBeInTheDocument();
  });

  it('does not render when items is null', () => {
    const { container } = render(<NewsFeedList items={null} />);
    // コンテナが空であることを確認
    expect(container).toBeEmptyDOMElement();
  });
});