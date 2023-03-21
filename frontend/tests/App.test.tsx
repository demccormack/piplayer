import App from '../src/App';
import { render } from '@testing-library/react';

it('renders', () => {
  const { container } = render(<App />);
  expect(container).toBeInTheDocument();
});
