import { render, screen } from '@testing-library/react';
import App from './App';

it('renders a video', () => {
  render(<App />);
  const video = screen.getByText('video');
  expect(video).toBeInTheDocument();
});
