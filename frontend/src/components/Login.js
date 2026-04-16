import { render, screen, fireEvent } from '@testing-library/react';
import Login from './Login';

jest.mock('axios');

test('user can type and click login', () => {
  render(<Login setIsLoggedIn={() => {}} setIsLoginPage={() => {}} />);

  const usernameInput = screen.getByPlaceholderText('Username');
  const passwordInput = screen.getByPlaceholderText('Password');
  const button = screen.getByRole('button', { name: /login/i });

  // simulate typing
  fireEvent.change(usernameInput, { target: { value: 'testuser' } });
  fireEvent.change(passwordInput, { target: { value: 'testpass' } });

  // simulate click
  fireEvent.click(button);

  // check values updated
  expect(usernameInput.value).toBe('testuser');
  expect(passwordInput.value).toBe('testpass');
});