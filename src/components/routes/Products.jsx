import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import { getProducts, addDetails } from '../../redux/products/productsSlice';

function Header() {
  const { products, loading } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const filterProducts = useCallback(() => {
    const filtered = products.filter((item) => {
      const titleMatch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
      const priceMatch = item.price.toString().includes(searchQuery);
      const categoryMatch = item.category.toLowerCase().includes(searchQuery.toLowerCase());

      return titleMatch || priceMatch || categoryMatch;
    });

    setFilteredProducts(filtered);
  }, [products, searchQuery]);

  useEffect(() => {
    filterProducts();
  }, [filterProducts]);

  const onHandleClick = (id) => {
    dispatch(addDetails(id));
    navigate(`/Details/${id}`);
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <header>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search..."
      />
      <ul>
        {filteredProducts.map((item) => (
          <li key={item.id}>
            <Card style={{ width: '18rem' }}>
              <Card.Body>
                <Button variant="primary" onClick={() => onHandleClick(item.id)}>Details</Button>
                <Card.Title>{item.title}</Card.Title>
                <Card.Img variant="top" src={item.image} alt="productImg" className="IMG" />
                <Card.Title>
                  {item.price}
                  $
                </Card.Title>
              </Card.Body>
            </Card>
          </li>
        ))}
      </ul>
    </header>
  );
}

export default Header;
