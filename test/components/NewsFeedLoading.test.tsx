import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import NewsFeedLoading from '../../src/components/NewsFeedLoading';

// NewsFeedLoadingItem コンポーネントをモック化
jest.mock('../../src/components/NewsFeedLoadingItem', () => {
  // モックコンポーネントの実装
  return () => <li>Loading item...</li>;
});

describe('NewsFeedLoading', () => {
  it('renders three NewsFeedLoadingItem components', () => {
    render(<NewsFeedLoading />);

    // モック化された NewsFeedLoadingItem コンポーネントのインスタンスが3つレンダリングされているか確認
    const loadingItems = screen.getAllByText('Loading item...');
    expect(loadingItems.length).toBe(3);
  });

  it('contains a hidden "Loading..." message for screen readers', () => {
    render(<NewsFeedLoading />);

    // スクリーンリーダー用の "Loading..." メッセージが存在するか確認
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});