import React, { useContext, useState, useEffect } from "react";
import { GlobalState } from "../../../GlobalState";
import axios from "axios";
import PaypalButton from "./PaypalButton";
import { FiDelete } from "react-icons/fi";

function Cart() {
  const state = useContext(GlobalState);
  const [cart, setCart] = state.userAPI.cart;
  const [token] = state.token;
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const getTotal = () => {
      const total = cart.reduce((prev, item) => {
        return prev + item.price * item.quantity;
      }, 0);

      setTotal(total);
    };

    getTotal();
  }, [cart]);

  const addToCart = async (cart) => {
    await axios.patch(
      "/user/addcart",
      { cart },
      {
        headers: { Authorization: token },
      }
    );
  };

  const increment = (id) => {
    cart.forEach((item) => {
      if (item._id === id) {
        item.quantity += 1;
      }
    });

    setCart([...cart]);
    addToCart(cart);
  };

  const decrement = (id) => {
    cart.forEach((item) => {
      if (item._id === id) {
        item.quantity === 1 ? (item.quantity = 1) : (item.quantity -= 1);
      }
    });

    setCart([...cart]);
    addToCart(cart);
  };

  const removeProduct = (id) => {
    if (window.confirm("Do you want to delete this product?")) {
      cart.forEach((item, index) => {
        if (item._id === id) {
          cart.splice(index, 1);
        }
      });

      setCart([...cart]);
      addToCart(cart);
    }
  };

  const tranSuccess = async (payment) => {
    const { paymentID, address } = payment;

    await axios.post("/api/payment", { cart, paymentID, address },{
        headers: { Authorization: token },
      }
    );

    setCart([]);
    addToCart([]);
    alert("You have successfully placed an order.");
  };

  if (cart.length === 0)
    return (
      <h2 style={{ textAlign: "center", fontSize: "5rem" }}>Cart Empty</h2>
    );

  return (
    <div className="cart">
      <h3
        className="my-4"
        style={{ textAlign: "center", fontSize: "3rem", margin: "20px" }}
      >
        Your Cart
      </h3>
      <div className="cart-item-header">
        <h3 className="cart-item-title">Product</h3>
        <h3>Price</h3>
        <h3 className="cart-item-quanlity">Quantity</h3>
        <h3>Total</h3>
      </div>
      {cart.map((product) => (
        <div className="cart-item" key={product._id}>
          <div className="product-info" onClick={() => removeProduct(product._id)}>
            <span>
              <FiDelete size="1.5rem" />
            </span>
            <div className="product-info-item">
              <img src={product.images.url} alt="" />
              <h2>{product.title}</h2>
            </div>
          </div>
          <div>
            <h3>$ {product.price}</h3>
          </div>
          <div className="amount">
            <button onClick={() => decrement(product._id)}> - </button>
            <span>{product.quantity}</span>
            <button onClick={() => increment(product._id)}> + </button>
          </div>
          <div>
            <h3>$ {product.price * product.quantity}</h3>
          </div>
        </div>
      ))}

      <div className="total">
        <PaypalButton total={total} tranSuccess={tranSuccess} />
        <h3>Subtotal: $ {total}</h3>
      </div>
    </div>
  );
}

export default Cart;
