import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import NewsFeedItem from '../../src/components/NewsFeedItem';
import FeedItem from '../../src/domain/feedItem';

// getTimeDiff モック関数を作成
jest.mock('../../src/utils/timeUtil', () => ({
  __esModule: true,
  default: jest.fn(() => '1 hour'),
}));

describe('NewsFeedItem', () => {
  // テスト用のFeedItemオブジェクトを作成
  const mockItem: FeedItem = {
    id: 1,
    title: 'Test Title',
    url: 'https://test.com',
    score: 100,
    by: 'testUser',
    time: 0, // getTimeDiff モック関数によって '1 hour' と表示される
    descendants: 50,
  };

  it('renders correctly with item prop', () => {
    render(<NewsFeedItem item={mockItem} />);

    // タイトルが表示されているか確認
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    // 投稿者とスコアが表示されているか確認
    expect(screen.getByText('100 point(s) by testUser 1 hour ago | 50 comment(s)')).toBeInTheDocument();
    // リンクが正しいか確認
    expect(screen.getByRole('link')).toHaveAttribute('href', 'https://test.com');
  });

  it('renders correctly without url prop', () => {
    const itemWithoutUrl = { ...mockItem, url: undefined };
    render(<NewsFeedItem item={itemWithoutUrl} />);

    // URLがない場合のフォールバックURLが正しいか確認
    expect(screen.getByRole('link')).toHaveAttribute('href', `https://news.ycombinator.com/item?id=${mockItem.id}`);
  });

  it('does not render when item is null', () => {
    const { container } = render(<NewsFeedItem item={null} />);
    // コンテナが空であることを確認
    expect(container).toBeEmptyDOMElement();
  });
});