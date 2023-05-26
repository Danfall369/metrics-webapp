import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { GrUser, GrUserFemale } from 'react-icons/gr';
import { GiBigDiamondRing } from 'react-icons/gi';
import { HiOutlineDesktopComputer } from 'react-icons/hi';
import { getProducts, addCategory } from '../../redux/products/productsSlice';
import '../../style/product.css';

function Products() {
  const { products, loading } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const categoryIcons = {
    "men's clothing": <GrUser className="menIcon" />,
    "women's clothing": <GrUserFemale className="womenIcon" />,
    jewelery: <GiBigDiamondRing className="jewelryIcon" />,
    electronics: <HiOutlineDesktopComputer className="elecIcon" />,
  };

  const onHandleClick = (category) => {
    dispatch(addCategory(category));
    navigate(`/Category/${category}`);
  };

  if (loading) {
    return <h2 className="Loading">Loading...</h2>;
  }

  const uniqueCategories = Array.from(new Set(products.map((item) => item.category)));

  const getCategoryCount = (category) => products
    .filter((item) => item.category === category).length;

  return (
    <header>
      <ul className="listCont">
        {uniqueCategories.map((category) => {
          const item = products.find((item) => item.category === category);
          return (
            <li className="category" key={item.id}>
              <button className={`categoryCont categoryCont-${category}`} type="button" onClick={() => onHandleClick(item.category)}>
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
