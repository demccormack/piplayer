import App from '../src/App';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

it('renders', () => {
  const { container } = render(<App />);
  expect(container).toBeInTheDocument();
});
