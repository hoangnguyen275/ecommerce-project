import { it, expect, describe, vi, beforeEach } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import axios from 'axios';
import { HomePage } from './HomePage';
import userEvent from '@testing-library/user-event';

vi.mock('axios');

describe('HomePage component', () => {
  let loadCart;

  let user;

  beforeEach(() => {
    loadCart = vi.fn();

    user = userEvent.setup();

    axios.get.mockImplementation(async (urlPath) => {
      if (urlPath === '/api/products') {
        return {
          data: [{
            id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            image: "images/products/athletic-cotton-socks-6-pairs.jpg",
            name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
            rating: {
              stars: 4.5,
              count: 87
            },
            priceCents: 1090,
            keywords: ["socks", "sports", "apparel"]
          },
          {
            id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
            image: "images/products/intermediate-composite-basketball.jpg",
            name: "Intermediate Size Basketball",
            rating: {
              stars: 4,
              count: 127
            },
            priceCents: 2095,
            keywords: ["sports", "basketballs"]
          }]
        };
      }
    });
  });

  it('display the products correctly', async () => {
    render(
      <MemoryRouter>
        <HomePage cart={[]} loadCart={loadCart} />
      </MemoryRouter>
    );
    const productContainers = await screen.findAllByTestId('product-container');

    expect(productContainers.length).toBe(2);


    expect(
      within(productContainers[0]).getByText('Black and Gray Athletic Cotton Socks - 6 Pairs')
    ).toBeInTheDocument();

    expect(
      within(productContainers[1]).getByText('Intermediate Size Basketball')
    ).toBeInTheDocument();
  });

  it('Add to Cart buttons work correctly', async () => {
    render(
      <MemoryRouter>
        <HomePage cart={[]} loadCart={loadCart} />
      </MemoryRouter>
    );
    const productContainers = await screen.findAllByTestId('product-container');

    let quantitySelector = within(productContainers[0]).getByTestId('quantity-selector');

    let addToCartButton = within(productContainers[0]).getByTestId('add-to-cart-button');

    await user.selectOptions(quantitySelector, '2');

    await user.click(addToCartButton);

    expect(axios.post).toHaveBeenNthCalledWith( 1,
      '/api/cart-items',
      {
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 2
      }
    );

    quantitySelector = within(productContainers[1]).getByTestId('quantity-selector');

    addToCartButton = within(productContainers[1]).getByTestId('add-to-cart-button');

    await user.selectOptions(quantitySelector, '3');
    
    await user.click(addToCartButton);

    expect(axios.post).toHaveBeenNthCalledWith( 2,
      '/api/cart-items',
      {
        productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity: 3
      }
    );

    expect(loadCart).toHaveBeenCalledTimes(2);
  });
});
