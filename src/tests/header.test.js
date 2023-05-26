import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import Header from '../components/routes/Header';
import '@testing-library/jest-dom/extend-expect';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

test('renders back button when not on the homepage', () => {
  const navigateMock = jest.fn();

  useNavigate.mockReturnValue(navigateMock);

  render(
    <MemoryRouter initialEntries={['/some-page']}>
      <Header />
    </MemoryRouter>,
  );

  const backButton = screen.getByRole('button', { name: /</i });
  expect(backButton).toBeInTheDocument();

  fireEvent.click(backButton);

  expect(navigateMock).toHaveBeenCalledWith(-1, { replace: true });
});
