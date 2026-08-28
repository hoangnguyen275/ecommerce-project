import { it, expect, describe} from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { CheckoutHeader } from './CheckoutHeader';

describe('CHeckoutHead Component', () => {

  it('display checkout header correctly', () => {
    const cart = [{
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 2,
      deliveryOptionId: '1'
    }, {
      productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
      quantity: 1,
      deliveryOptionId: '2'
    }];

    render(
      <MemoryRouter>
        <CheckoutHeader cart={cart} />
      </MemoryRouter>
    );

    expect(screen.getByTestId('display-quantity')).toHaveTextContent('Checkout (3 items)');


  });
});