import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import { getProducts, addDetails } from '../../redux/products/productsSlice';

function Header() {
  const { products, loading } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  const onHandleClick = (id) => {
    dispatch(addDetails(id));
    navigate(`/Details/${id}`);
  };

  return (
    <header>
      <ul>
        {products.map((item) => (
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
