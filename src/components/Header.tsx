import logoSvg from '../assets/img/pizza-logo.svg';
import { Link } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { selectCart } from '../redux/cart/selectors';
import { useLocation } from 'react-router';
import { useEffect, useRef } from 'react';
import Logo from '../assets/img/MouseWait.png';

const Header = () => {
  const { items, totalPrice, totalCaunt } = useSelector(selectCart);

  const isMounted = useRef(false);

  // Set cart items to localStorage after second rerender
  useEffect(() => {
    if (isMounted.current) {
      const json = JSON.stringify(items);
      localStorage.setItem('cart', json);
    }
    isMounted.current = true;
  }, [items]);

  const location = useLocation();

  return (
    <section className='Mouse-Wait-sec'>
      <nav className='navbar navbar-expand-lg'>
        <div className='container'>

          {/*    <button
            className='navbar-toggler'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#navbarSupportedContent'
            aria-controls='navbarSupportedContent'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <div className='bar'>
              <i className='fa-solid fa-bars' />
            </div>
          </button> */}
          <div
            className='collapse navbar-collapse justify-content-end'
            id='navbarSupportedContent'
          ></div>
        </div>
      </nav>
    </section>
  );
};

export default Header;
