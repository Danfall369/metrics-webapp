import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import store from '../redux/store';
import Details from '../components/routes/Details';

describe('Details', () => {
  it('should render the component', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Details />
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.getByText('Loading...')).toBeTruthy();
  });
});
