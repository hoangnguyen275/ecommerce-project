import { Product } from './Product';
import CheckMarkIcon from '../../assets/images/icons/checkmark.png';

export function ProductsGrid({ products, loadCart }) {
  if (products.length > 0) {
    return (
      <div className="products-grid">
        {products.map((product) => {
          return (
            <Product key={product.id} product={product} loadCart={loadCart} />
          );
        })}
      </div>
    );
  } else {
    return (
      <div className="no-items-display">
        No items found.
      </div>
    );
  }
}