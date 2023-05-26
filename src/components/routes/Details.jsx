import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getDetails } from '../../redux/products/productsSlice';
import '../../style/details.css';

function Details() {
  const { details, loading } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getDetails(id));
  }, [dispatch, id]);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <>
      <ul>
        {details && (
          <li className="detailCont" key={details.id}>
            <img src={details.image} alt="productImg" className="detailImg" />
            <div className="detailsInfo">
              <h5 className="detailsTitle">{details.title}</h5>
              <br />
              <p className="detailstext">{details.description}</p>
              <br />
              <p className="detailsPrice">
                {details.price}
                $
              </p>
            </div>
          </li>
        )}
      </ul>
    </>
  );
}

export default Details;
