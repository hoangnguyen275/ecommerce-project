import { Link } from 'react-router'
import LogoImage from '../../assets/images/logo.png'
import MobileLogoImage from '../../assets/images/mobile-logo.png'
import CheckoutLockIcon from '../../assets/images/icons/checkout-lock-icon.png'
import './checkout-header.css'

export function CheckoutHeader({cart}){
  let totalQuanity = 0;

  cart.forEach((cartItems) => {
    totalQuanity += cartItems.quantity;
  });
  return (
    <div className="checkout-header">
      <div className="header-content">
        <div className="checkout-header-left-section">
          <Link to="/">
            <img className="logo" src={LogoImage} />
            <img className="mobile-logo" src={MobileLogoImage} />
          </Link>
        </div>

        <div data-testid="display-quantity" className="checkout-header-middle-section">
          Checkout (<Link className="return-to-home-link"
            to="/">{totalQuanity} items</Link>)
        </div>

        <div className="checkout-header-right-section">
          <img src={CheckoutLockIcon} />
        </div>
      </div>
    </div>
  );
}