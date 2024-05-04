import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

// NewsFeedContainer コンポーネントをモック化
jest.mock('./components/NewsFeedContainer', () => {
  return {
    __esModule: true,
    default: () => <div data-testid="mockNewsFeedContainer"></div>,
  };
});

describe('App', () => {
  it('renders App component correctly', () => {
    render(<App />);

    // タイトルが正しく表示されているか確認
    expect(screen.getByText(/Hacker News Top Stories/i)).toBeInTheDocument();

    // NewsFeedContainer コンポーネントがレンダリングされているか確認
    expect(screen.getByTestId('mockNewsFeedContainer')).toBeInTheDocument();
  });
});