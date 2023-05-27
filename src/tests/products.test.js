import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';

import Products from '../components/routes/Products';

// Mock Redux store
const store = configureStore({
  reducer: {
    products: () => ({
      products: [
        {
          id: 1,
          category: "men's clothing",
          // ... other product properties
        },
        {
          id: 2,
          category: "women's clothing",
          // ... other product properties
        },
        {
          id: 3,
          category: 'jewelery',
          // ... other product properties
        },
        {
          id: 4,
          category: 'electronics',
          // ... other product properties
        },
      ],
      loading: false,
    }),
  },
});

test('search bar filters categories correctly', () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <Products />
      </MemoryRouter>
    </Provider>,
  );

  // Type 'electronics' in the search bar
  const searchBar = screen.getByPlaceholderText('Search categories...');
  fireEvent.change(searchBar, { target: { value: 'electronics' } });

  // Check if only 'electronics' category is displayed
  expect(screen.getByText('electronics')).toBeInTheDocument();
  expect(screen.queryByText("men's clothing")).not.toBeInTheDocument();
  expect(screen.queryByText("women's clothing")).not.toBeInTheDocument();
  expect(screen.queryByText('jewelery')).not.toBeInTheDocument();

  // Clear the search bar
  fireEvent.change(searchBar, { target: { value: '' } });

  // Check if all categories are displayed again
  expect(screen.getByText('electronics')).toBeInTheDocument();
  expect(screen.getByText("men's clothing")).toBeInTheDocument();
  expect(screen.getByText("women's clothing")).toBeInTheDocument();
  expect(screen.getByText('jewelery')).toBeInTheDocument();
});
