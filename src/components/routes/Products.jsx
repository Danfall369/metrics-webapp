import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { SlUserFemale, SlUser } from 'react-icons/sl';
import { GiBigDiamondRing } from 'react-icons/gi';
import { HiOutlineDesktopComputer } from 'react-icons/hi';
import { getProducts, addCategory } from '../../redux/products/productsSlice';
import '../../style/product.css';

function Products() {
  const { products, loading } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  const categoryIcons = {
    "men's clothing": <SlUser className="productsIcon" />,
    "women's clothing": <SlUserFemale className="productsIcon" />,
    jewelery: <GiBigDiamondRing className="productsIcon" />,
    electronics: <HiOutlineDesktopComputer className="productsIcon" />,
  };

  const onHandleClick = (category) => {
    dispatch(addCategory(category));
    navigate(`/Category/${category}`);
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = products.filter((product) => product.category.toLowerCase().includes(query));
    setFilteredProducts(filtered);
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  const uniqueCategories = [...new Set(filteredProducts.map((item) => item.category))];

  const getCategoryCount = (category) => filteredProducts
    .filter((item) => item.category === category).length;

  return (
    <header>
      <div className="catsearchBarCont">
        <input
          className="searchBar"
          type="text"
          placeholder="Search categories..."
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>
      <ul className="listCont">
        {uniqueCategories.map((category) => {
          const item = filteredProducts.find((item) => item.category === category);
          return (
            <li className="category" key={item.id}>
              <button
                className={`categoryCont categoryCont-${category}`}
                type="button"
                onClick={() => onHandleClick(item.category)}
              >
                {categoryIcons[category] || null}
                <div className="cardInfo">
                  <h5 className="card-title">{category}</h5>
                  <p>
                    (
                    {getCategoryCount(category)}
                    )
                  </p>
                </div>
              </button>
            </li>
          );
        })}
      </ul>
    </header>
  );
}

export default Products;
