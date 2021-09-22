import React, { useContext, useState } from "react";
import { GlobalState } from "../../GlobalState";
import Menu from "./icon/menu.svg";
import Close from "./icon/close.svg";
import { Link } from "react-router-dom";
import axios from "axios";
import { BiShoppingBag, BiLogIn } from 'react-icons/bi'
import imageName from '../../images/logo-icon.png'

const Image = props => {
  const { alt, ...otherProps } = props;
  return ( <img alt={alt} {...otherProps} />);
}

function Header() {
  const state = useContext(GlobalState);
  const [isLogged] = state.userAPI.isLogged;
  const [isAdmin] = state.userAPI.isAdmin;
  const [cart] = state.userAPI.cart;
  const [menu, setMenu] = useState(false);

  const logoutUser = async () => {
    await axios.get("/user/logout");
    localStorage.removeItem("firstLogin");
    window.location.href = "/";
  };

  const adminRouter = () => {
    return (
      <>
        <li><Link to="/create_product">Create Product</Link></li>
        <li><Link to="/category">Categories</Link></li>
      </>
    );
  };

  const loggedRouter = () => {
    return (
      <>
        <li><Link to="/history"> History </Link></li>
        <li>
          <Link to="/" onClick={logoutUser}> Logout </Link>
        </li>
      </>
    );
  };

  const styleMenu = {
    left: menu ? 0 : "-100%",
  };

  return (
    <header>
      <div className="menu" onClick={() => setMenu(!menu)}>
        <img src={Menu} alt="" width="30" />
      </div>

      <div className="logo">
          <Link to="/">
            <div className="logo_item">
              {
              isAdmin ?
                <span style={{ fontSize: "18px", fontWeight: "600", color: "#200353"}}>Admin</span>
                : <>
                    <Image alt="Logo" src={imageName} style={{ width: "50px" }} />
                    <span style={{ fontSize: "18px", fontWeight: "600", color: "#200353"}}>Dev Front Shop</span>
                </> 
              }
            </div>
          </Link>
      </div>

      <ul style={styleMenu}>
        <li>
          <Link to="/">{isAdmin ? "Products" : "Shop"}</Link>
        </li>

        {isAdmin && adminRouter()}

        {isLogged && loggedRouter()}

        <li onClick={() => setMenu(!menu)}>
          <img src={Close} alt="" width="30" className="menu" />
        </li>
      </ul>

      {isAdmin ? (
        ""
      ) : (
        <div className="cart-icon">
          <span>{cart.length}</span>
          <Link to="/cart">
            <BiShoppingBag size="2rem"/>
          </Link>
        </div>
      )}
      {isLogged ? (
        ""
      ) : (
        <div className="cart-icon">
          <Link to="/login">
            <BiLogIn size="2rem"/>
          </Link>
        </div>
      )}


    </header>
  );
}

export default Header;
