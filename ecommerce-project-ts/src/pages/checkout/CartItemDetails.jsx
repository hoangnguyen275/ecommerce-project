import axios from 'axios';
import { useState } from 'react';
import { formatMoney } from "../../utils/money";

export function CartItemDetails({cartItem, loadCart}) {
  const [isUpdating, setIsUpdating] = useState(false);

  const [quantity, setQuantity] = useState(cartItem.quantity);

  const [invalidUpdate, setInvalidUpate] = useState(false);

  const deleteCartItem = async() => {
    await axios.delete(`/api/cart-items/${cartItem.productId}`);
    await loadCart();
  };

  async function updateQuantity(){
    if (invalidUpdate && isUpdating){
      return;
    }

    if (quantity === 0 && isUpdating){
      setIsUpdating(false);
      return;
    }

    if (isUpdating && quantity !== 0 && !invalidUpdate){
      await axios.put(`/api/cart-items/${cartItem.productId}`, {
        quantity
      });
      await loadCart();
      setIsUpdating(false);
      return;
    } else{
      setIsUpdating(true);
    }
  };

  function saveQuantity(event){
    let value = event.target.value;
    if (Number.isNaN(Number(value))){
      setInvalidUpate(true);
      return;
    }
    setInvalidUpate(false);
    setQuantity(Number(value));    
  }

  function handleKeyDown(event){
    if (event.key === 'Enter'){
      updateQuantity();
    }
    if (event.key === 'Escape'){
      setQuantity(cartItem.quantity);
      setIsUpdating(false);
    }
  }
  

  return (
    <>
      <img data-testid="product-image" className="product-image"
        src={cartItem.product.image} />

      <div className="cart-item-details">
        <div data-testid="product-name" className="product-name">
          {cartItem.product.name}
        </div>
        <div data-testid="product-price" className="product-price">
          {formatMoney(cartItem.product.priceCents)}
        </div>
        <div className="product-quantity">
          <span>
            Quantity: {isUpdating ? <input data-testid="quantity-input" onChange={saveQuantity} onKeyDown={handleKeyDown} className="update-quantity-input" type="text" /> : ''} <span data-testid="product-quantity" className="quantity-label">{cartItem.quantity}</span>
          </span>
          <span data-testid="update-quantity" className="update-quantity-link link-primary"
            onClick={updateQuantity}>
            Update
          </span>
          <span data-testid="delete-quantity" className="delete-quantity-link link-primary"
            onClick={deleteCartItem}>
            Delete
          </span>
        </div>
        {invalidUpdate ? 
        <div data-testid="invalid-message" className="invalid-update">
          Invalid update!
        </div> : ''}
        
      </div>
    </>
  );
}