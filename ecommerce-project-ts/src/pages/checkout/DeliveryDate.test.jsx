import { it, expect, describe} from 'vitest';
import { render, screen } from '@testing-library/react';
import { DeliveryDate } from './DeliveryDate';

describe('DeliveryDate Component', () => {
  it('display delivery date in order detail correctly', () => {
    const selectedDeliveryOption = {
      createdAt: "2026-06-26T02:56:43.169Z",
      deliveryDays: 3,
      estimatedDeliveryTimeMs: 1783180945082,
      id: "2",
      priceCents: 499,
      updatedAt: "2026-06-26T02:56:43.169Z"
    };

    render(
      <DeliveryDate selectedDeliveryOption={selectedDeliveryOption} />
    );

    expect(screen.getByTestId('delivery-date')).toHaveTextContent('Delivery date: Saturday, July 4');
  });
});