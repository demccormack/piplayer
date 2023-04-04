import App from '../src/App';
import { render, screen } from '@testing-library/react';

it('renders the app', () => {
  const { container } = render(<App />);
  expect(container).toBeInTheDocument();
});

it('renders the title', () => {
  render(<App />);
  expect(
    screen.getByRole('heading', { name: 'Pi Player' }),
  ).toBeInTheDocument();
});
