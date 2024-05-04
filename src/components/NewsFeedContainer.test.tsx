import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import NewsFeedContainer from './NewsFeedContainer';
import useFetchData from '../server/useFetchData';
import FeedItem from '../domain/feedItem';
import { AxiosError } from 'axios';
import { title } from 'process';

interface UseFetchDataReturnType {
  data: FeedItem[] | null;
  loading: boolean;
  error: typeof AxiosError | null;
}

jest.mock('../server/useFetchData', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('NewsFeedContainer', () => {
  it('should display loading component while fetching data', () => {
    (useFetchData as jest.Mock).mockReturnValue({ data: null, loading: true, error: null } as UseFetchDataReturnType);
    render(<NewsFeedContainer />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should display error message when there is an error fetching data', () => {
    const errorMessage = 'Failed to fetch';
    (useFetchData as jest.Mock).mockReturnValue({ data: null, loading: false, error: { message: errorMessage } } as UseFetchDataReturnType);
    render(<NewsFeedContainer />);
    expect(screen.getByText(`Error: ${errorMessage}`)).toBeInTheDocument();
  });

  it('should display the news feed list when data is successfully fetched', async () => {
    const mockData = [{ id: 1, title: 'News Item 1' }, { id: 2, title: 'News Item 2' }];
    (useFetchData as jest.Mock).mockReturnValue({ data: mockData, loading: false, error: null } as UseFetchDataReturnType);
    render(<NewsFeedContainer />);
    await waitFor(() => {
      expect(screen.getByText('News Item 1')).toBeInTheDocument();
      expect(screen.getByText('News Item 2')).toBeInTheDocument();
    });
  });
});