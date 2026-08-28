import axios from 'axios';
import dayjs from 'dayjs';
import { Header } from '../../components/Header';
import { Link } from 'react-router';
import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import './TrackingPage.css'

export function TrackingPage({ cart }) {
  const { orderId, productId } = useParams();
  const [order, setOrder] = useState(null);
  useEffect(() => {
    const fetchOrdersData = async () => {
      const response = await axios.get(`/api/orders/${orderId}?expand=products`);
      setOrder(response.data);
    }

    fetchOrdersData();
  }, [orderId]);

  if (!order) {
    return null;
  }

  const orderProduct = order.products.find((product) => {
    return productId === product.productId;
  });

  const totalDeliveryTimeMs = Number(orderProduct.estimatedDeliveryTimeMs) - Number(order.orderTimeMs);
  const timePassedMs = dayjs().valueOf() - order.orderTimeMs;
  const deliveryPercent = (timePassedMs / totalDeliveryTimeMs) * 100;


  return (
    <>
      <title>Tracking Orders</title>

      <link rel="icon" type="image" href="tracking-favicon.png" />

      <Header cart={cart} />

      <div className="tracking-page">
        <div className="order-tracking">
          <Link className="back-to-orders-link link-primary" to="/orders">
            View all orders
          </Link>

          <div className="delivery-date">
            {deliveryPercent >= 100 ? 'Delivered on ' : 'Arriving on '} {dayjs(orderProduct.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
          </div>

          <div className="product-info">
            {orderProduct.product.name}
          </div>

          <div className="product-info">
            Quantity: {orderProduct.quantity}
          </div>

          <img className="product-image" src={orderProduct.product.image} />

          <div className="progress-labels-container">
            <div className={`progress-label ${(deliveryPercent < 33) && 'current-status'}`}>
              Preparing
            </div>
            <div className={`progress-label ${(deliveryPercent >= 33) && (deliveryPercent < 100) && 'current-status'}`}>
              Shipped
            </div>
            <div className={`progress-label ${(deliveryPercent >= 100) && 'current-status'}`}>
              Delivered
            </div>
          </div>

          <div className="progress-bar-container">
            <div className="progress-bar" style={{width:`${deliveryPercent}%`}}></div>
          </div>
        </div>
      </div>
    </>
  );


}