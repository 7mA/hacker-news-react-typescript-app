import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../src/App';

test('renders title', () => {
  render(<App />);
  const linkElement = screen.getByText(/Hacker News/i);
  expect(linkElement).toBeInTheDocument();
});
