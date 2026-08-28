import { it, expect, describe, vi, beforeEach } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { MemoryRouter, useLocation } from 'react-router';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import { PaymentSummary } from './PaymentSummary';

vi.mock('axios');

describe('PaymentSummary Component', () => {

  let loadCart;

  let paymentSummary;

  let user;

  beforeEach(() => {

    loadCart = vi.fn();

    paymentSummary = {
      "totalItems": 3,
      "productCostCents": 6201,
      "shippingCostCents": 499,
      "totalCostBeforeTaxCents": 6700,
      "taxCents": 670,
      "totalCostCents": 7370
    };

    user = userEvent.setup();

  });

  it('display payment details correctly', () => {
    render(
      <MemoryRouter>
        <PaymentSummary paymentSummary={paymentSummary} loadCart={loadCart} />
      </MemoryRouter>
    );

    // 1st way to test:
    expect(
      screen.getByText('Items (3):')
    ).toBeInTheDocument();

    // 2nd way to test: 
    expect(
      within(screen.getByTestId('product-cost')).getByText('$62.01')
    ).toBeInTheDocument();

    // 3rd way to test and I will keep this way for the rest: 
    const shippingCost = screen.getByTestId('shipping-cost');
    expect(shippingCost).toHaveTextContent('$4.99');

    const totalCostBeforeTax = screen.getByTestId('total-cost-before-tax');
    expect(totalCostBeforeTax).toHaveTextContent('$67.00');

    const tax = screen.getByTestId('tax');
    expect(tax).toHaveTextContent('$6.70');

    const totalCost = screen.getByTestId('total-cost');
    expect(totalCost).toHaveTextContent('$73.70');
  });

  it('click order button', async () => {

    function Location() {
      const location = useLocation();
      return (
        <div data-testid="url-path">
          {location.pathname}
        </div>
      );
    }
    
    render(
      <MemoryRouter>
        <PaymentSummary paymentSummary={paymentSummary} loadCart={loadCart} />
        <Location />
      </MemoryRouter>
    );

    const placeOrderButton = await screen.getByTestId('place-order-button');
    await user.click(placeOrderButton);

    expect(
      screen.getByTestId('url-path')
    ).toHaveTextContent('/orders');

    expect(axios.post).toHaveBeenCalledWith('/api/orders');

    expect(loadCart).toHaveBeenCalled();

  });
});