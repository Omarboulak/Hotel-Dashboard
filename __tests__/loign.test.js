import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { Login } from '../src/login/Login';
import { AuthProvider } from '../src/login/context/loginContext';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

describe('Login Component', () => {
  const mockNavigate = jest.fn();
  
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(require('react-router-dom'), 'useNavigate').mockImplementation(() => mockNavigate);
  });

  const renderComponent = () => {
    return render(
      <MemoryRouter>
        <AuthProvider>
          <Login onLogin={jest.fn()} />
        </AuthProvider>
      </MemoryRouter>
    );
  };

  it('debe llamar a onLogin y navegar con credenciales correctas', async () => {
    const mockOnLogin = jest.fn();
    
    const { container } = render(
      <MemoryRouter>
        <AuthProvider>
          <Login onLogin={mockOnLogin} />
        </AuthProvider>
      </MemoryRouter>
    );

    const emailInput = screen.getByTestId('inputEmail');
    const passwordInput = screen.getByTestId('inputPassword');
    const loginButton = screen.getByTestId('buttonLogin');

    await act(async () => {
      fireEvent.change(emailInput, { target: { value: '123' } });
      fireEvent.change(passwordInput, { target: { value: '123' } });
      fireEvent.click(loginButton);
    });

    expect(screen.getByTestId('buttonLogin')).not.toBeDisabled();
    expect(mockOnLogin).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith('/Room');
  });

  it('debe mostrar error con credenciales incorrectas', async () => {
    window.alert = jest.fn();
    
    renderComponent();

    const emailInput = screen.getByTestId('inputEmail');
    const passwordInput = screen.getByTestId('inputPassword');
    const loginButton = screen.getByTestId('buttonLogin');

    await act(async () => {
      fireEvent.change(emailInput, { target: { value: 'wrong' } });
      fireEvent.change(passwordInput, { target: { value: 'wrong' } });
      fireEvent.click(loginButton);
    });

    expect(window.alert).toHaveBeenCalledWith('El usuario no existe');
  });
});