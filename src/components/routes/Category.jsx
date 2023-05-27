import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getCategory, addDetails } from '../../redux/products/productsSlice';
import '../../style/category.css';

function Category() {
  const { category, loading } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { category: categoryName } = useParams();
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    dispatch(getCategory(categoryName));
  }, [dispatch, categoryName]);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  const filteredCategory = category.filter((item) => {
    const titleMatches = item.title.toLowerCase().includes(searchQuery.toLowerCase());
    const priceMatches = item.price.toString().includes(searchQuery);

    return titleMatches || priceMatches;
  });

  const onHandleClick = (id) => {
    dispatch(addDetails(id));
    navigate(`/Details/${id}`);
  };

  return (
    <>
      <div className="search-barCont">
        <input
          className="searchBar"
          type="text"
          placeholder="Search by title or price"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <ul className="catList">
        {filteredCategory.map((item) => {
          const {
            id, image, title, price,
          } = item;
          return (
            <li key={id}>
              <button className={`elementsCat elementsCat-${id}`} type="button" onClick={() => onHandleClick(id)}>
                <img src={image} alt="itemIMG" className="catImg" />
                <div className="catInfo">
                  <h5 className="cartTitle">{title}</h5>
                  <br />
                  <p className="catPrice">
                    <strong>
                      {price}
                      $
                    </strong>
                  </p>
                  <br />
                  <p><b>More Details</b></p>
                </div>
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default Category;
