import { it, expect, describe, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import { CartItemDetails } from './CartItemDetails';

vi.mock('axios');

describe('CartItemDetails Component', () => {

  let cartItem;

  let loadCart;

  let user;

  beforeEach(() => {
    cartItem = {
      createdAt: '2026-06-30T15:04:37.309Z',
      deliveryOptionId: '2',
      id: 8,
      product: {
        createdAt: "2026-06-26T02:56:43.172Z",
        id: "3ebe75dc-64d2-4137-8860-1f5a963e534b",
        image: "images/products/elegant-white-dinner-plate-set.jpg",
        keywords: ['plates', 'kitchen', 'dining'],
        name: "2 Piece White Dinner Plate Set",
        priceCents: 2067,
        rating: { stars: 4, count: 37 },
        updatedAt: "2026-06-26T02:56:43.172Z"
      },
      productId: '3ebe75dc-64d2-4137-8860-1f5a963e534b',
      quantity: 3,
      updatedAt: "2026-06-30T15:18:49.212Z"
    };

    loadCart = vi.fn();

    user = userEvent.setup();

  });

  it('display product information correctly', () => {
    render(
      <CartItemDetails cartItem={cartItem} loadCart={loadCart} />
    );

    const productName = screen.getByTestId('product-name');
    expect(productName).toHaveTextContent('2 Piece White Dinner Plate Set');

    expect(
      screen.getByTestId('product-image')
    ).toHaveAttribute('src', 'images/products/elegant-white-dinner-plate-set.jpg');
  });

  it('delete span works correctly', async () => {

    render(
      <CartItemDetails cartItem={cartItem} loadCart={loadCart} />
    );

    const deleteQuantity = screen.getByTestId('delete-quantity');

    await user.click(deleteQuantity);

    expect(axios.delete).toHaveBeenCalledWith(`/api/cart-items/${cartItem.productId}`);

    expect(loadCart).toHaveBeenCalled();
  });

  it('update span works correctly', async () => {
    render(
      <CartItemDetails cartItem={cartItem} loadCart={loadCart} />
    );

    // update from 3 to 12 quantity instead:

    const updateQuantity = screen.getByTestId('update-quantity');

    await user.click(updateQuantity);

    expect(screen.getByTestId('quantity-input')).toBeInTheDocument();

    let quantityInput = screen.getByTestId('quantity-input');

    await user.type(quantityInput, '13');

    // simulate user press ENTER:

    await user.keyboard('{Enter}');

    expect(screen.queryByTestId('quantity-input')).not.toBeInTheDocument();

    expect(axios.put).toHaveBeenCalledWith(
      `/api/cart-items/${cartItem.productId}`,
      {
        quantity: 13
      }
    );

    expect(loadCart).toHaveBeenCalled();

    // update from 3 to 'abc' quantity, it should display invalid message:

    await user.click(updateQuantity);

    expect(screen.getByTestId('quantity-input')).toBeInTheDocument();

    quantityInput = screen.getByTestId('quantity-input');

    await user.type(quantityInput, 'abc');

    expect(screen.getByTestId('invalid-message')).toBeInTheDocument();

    await user.clear(quantityInput);

    expect(screen.queryByTestId('invalid-message')).not.toBeInTheDocument();

    // then try to update quantity to 20 after clear the previous input:

    await user.type(quantityInput, '20');

    await user.keyboard('{Enter}');

    expect(screen.queryByTestId('quantity-input')).not.toBeInTheDocument();

    expect(axios.put).toHaveBeenCalledWith(
      `/api/cart-items/${cartItem.productId}`,
      {
        quantity: 20
      }
    );

    expect(loadCart).toHaveBeenCalled();

  });

});