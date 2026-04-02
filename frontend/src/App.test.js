import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock('axios');

test('renders login button', () => {
  render(<App />);
  
  const button = screen.getByRole('button', { name: /login/i });
  
  expect(button).toBeInTheDocument();
});