import React from 'react';
import { useSelector } from 'react-redux';

function Header() {
  const product = useSelector((state) => state.products);

  return (
    <header>
      <h1>Products</h1>
      <ul>
        <li>
          {product.title}
        </li>
        <li>
          {product.price}
        </li>
        <li>
          {product.description}
        </li>
        <li>
          {product.category}
        </li>
        <li>
          <img src={product.image} alt="productImg" />
        </li>
      </ul>
    </header>
  );
}

export default Header;
