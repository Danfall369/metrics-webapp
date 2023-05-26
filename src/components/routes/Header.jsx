import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { BsMic } from 'react-icons/bs';
import { BiUserCircle } from 'react-icons/bi';
import '../../style/header.css';

function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  const onNavigateBack = () => {
    navigate(-1, { replace: true });
  };

  const showBackButton = location.pathname !== '/';

  return (
    <header className="header">
      {showBackButton && (
        <button type="button" className="backButton" onClick={onNavigateBack}>
          &#60;
        </button>
      )}
      <h1 className="headerTitle">D&apos;Fall Store</h1>
      <div className="headerIcons">
        <BsMic className="headerIcon" />
        <BiUserCircle className="headerIcon" />
      </div>
    </header>
  );
}

export default Header;
