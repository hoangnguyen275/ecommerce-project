import { it, expect, describe, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { DeliveryOptions } from './DeliveryOptions';
import userEvent from '@testing-library/user-event';
import axios from 'axios';

vi.mock('axios');

describe('DeliveryOptions Component', () => {

  let deliveryOptions;

  let cartItem;

  let loadCart;

  let user;

  beforeEach(() => {
    deliveryOptions = [
      {
        id: '1',
        deliveryDays: 7,
        priceCents: 0,
        createdAt: "2026-06-26T02:56:43.168Z",
        updatedAt: "2026-06-26T02:56:43.168Z",
        estimatedDeliveryTimeMs: 1783528996115
      }, {
        id: '2',
        deliveryDays: 3,
        priceCents: 499,
        createdAt: "2026-06-26T02:56:43.169Z",
        updatedAt: "2026-06-26T02:56:43.169Z",
        estimatedDeliveryTimeMs: 1783183396115
      }, {
        id: '3',
        deliveryDays: 1,
        priceCents: 999,
        createdAt: "2026-06-26T02:56:43.170Z",
        updatedAt: "2026-06-26T02:56:43.170Z",
        estimatedDeliveryTimeMs: 1783010596115
      }
    ];

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

  it('display delivery options correctly', () => {
    
    render(
      <DeliveryOptions deliveryOptions={deliveryOptions} cartItem={cartItem} loadCart={loadCart} />
    );

    expect(screen.getByText('Wednesday, July 8')).toBeInTheDocument();
    expect(screen.getByText('Saturday, July 4')).toBeInTheDocument();
    expect(screen.getByText('Thursday, July 2')).toBeInTheDocument();
  });

  it('user click the second delivery option and work correctly', async () => {

     render(
      <DeliveryOptions deliveryOptions={deliveryOptions} cartItem={cartItem} loadCart={loadCart} />
    );

    const userDeliveryOptions = await screen.findAllByTestId('delivery-option');

    await user.click(userDeliveryOptions[1]);

    expect(axios.put).toHaveBeenCalledWith(`/api/cart-items/${cartItem.productId}`,
      {
        deliveryOptionId: deliveryOptions[1].id
      });
  });
});