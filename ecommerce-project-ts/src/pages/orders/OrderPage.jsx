import axios from 'axios'
import { useState, useEffect, Fragment } from 'react'
import { Link } from 'react-router'
import { Header } from '../../components/Header.jsx'
import { OrderGrid } from './OrdersGrid.jsx'
import BuyAgainImage from '../../assets/images/icons/buy-again.png'
import './OrderPage.css'


export function OrderPage({ cart, loadCart }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrdersData = async () => {
      const response = await axios.get('/api/orders?expand=products');
      setOrders(response.data);
    }
    
    fetchOrdersData();
  }, []);


  return (
    <>
      <title>Orders</title>

      <link rel="icon" type="image" href="orders-favicon.png" />

      <Header cart={cart} />

      <div className="orders-page">
        <div className="page-title">Your Orders</div>

        <OrderGrid orders={orders} loadCart={loadCart} />
      </div>
    </>
  );
}