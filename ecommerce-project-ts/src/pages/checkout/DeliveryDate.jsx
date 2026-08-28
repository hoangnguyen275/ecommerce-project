import dayjs from 'dayjs';

export function DeliveryDate({selectedDeliveryOption}) {
  return (
    <div data-testid="delivery-date" className="delivery-date">
      Delivery date: {dayjs(selectedDeliveryOption.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
    </div>
  );
}