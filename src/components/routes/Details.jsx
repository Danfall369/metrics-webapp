import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import { getDetails } from '../../redux/products/productsSlice';
import '../../style/details.css';

function Details() {
  const { details, loading } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getDetails(id));
  }, [dispatch, id]);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  const onNavigateBack = () => {
    navigate(-1);
  };

  return (
    <>
      <ul>
        <li>
          <Button variant="primary" onClick={onNavigateBack}>Back</Button>
        </li>
        {details ? (
          <li key={details.id}>
            <Card style={{ width: '18rem' }}>
              <Card.Body>
                <Card.Title>{details.title}</Card.Title>
                <Card.Img variant="top" src={details.image} alt="productImg" className="IMG" />
                <Card.Text>{details.description}</Card.Text>
                <Card.Text>{details.price}</Card.Text>
              </Card.Body>
            </Card>
          </li>
        ) : (
          <li>No details found.</li>
        )}
      </ul>
    </>
  );
}

export default Details;
