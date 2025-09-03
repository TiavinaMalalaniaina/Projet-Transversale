import { render, screen } from '@testing-library/react';
import App from './App';

test('renders App title', () => {
  render(<App />);

  // On suppose que ton App contient un titre avec "Gestion des stocks"
  const titleElement = screen.getByText(/gestion des stocks/i);
  expect(titleElement).toBeInTheDocument();
});
