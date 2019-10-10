import React from 'react';
import SickButton from './styles/SickButton';
import CartStyles from './styles/CartStyles';
import Supreme from './styles/Supreme';
import CloseButton from './styles/CloseButton';

const Cart = () => (
  <CartStyles open>
    <header>
      <CloseButton title="close">&times;</CloseButton>
      <Supreme>Your Cart</Supreme>
      <p>You have __ items in your cart.</p>
    </header>
    <footer>
      <p>$10.00</p>
      <SickButton>Checkout</SickButton>
    </footer>
  </CartStyles>
);

export default Cart;
