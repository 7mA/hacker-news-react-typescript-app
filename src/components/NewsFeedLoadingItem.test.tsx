import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import NewsFeedLoadingItem from './NewsFeedLoadingItem';

describe('NewsFeedLoadingItem', () => {
  it('renders correctly', () => {
    render(<NewsFeedLoadingItem />);
    
    // NewsFeedLoadingItem コンポーネントがレンダリングされているか確認
    // ここでは、特定のクラス名を持つ要素が存在するかどうかで確認しています
    expect(screen.getByRole('listitem')).toHaveClass('animate-pulse');
  });
});