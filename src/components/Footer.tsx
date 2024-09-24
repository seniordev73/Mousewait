import logoSvg from '../assets/img/pizza-logo.svg'
import { Link } from "react-router-dom";

import { useSelector } from 'react-redux'
import { selectCart } from '../redux/cart/selectors'
import { useLocation } from 'react-router';
import { useEffect, useRef } from 'react'


const Footer = () => {

  return (
    <section className="Mouse-Wait-sec">
    <nav className="navbar navbar-expand-lg">
      <div className="container">
        <a className="navbar-brand" href="#">
          <img
            src="images/MouseWait.png"
            className="img-fluid"
            alt="MouseWait-logo"
          />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <div className="bar">
            <i className="fa-solid fa-bars" />
          </div>
        </button>
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link" href="#">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                MouseWait
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                MouseWait
              </a>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                MouseWait
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <a className="dropdown-item" href="#">
                    Action
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Another action
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Something else here
                  </a>
                </li>
              </ul>
            </li>
          </ul>
          <div className="MW-button d-flex">
            <button type="button" className="MW-btn">
              Sign In
            </button>
            <button type="button" className="MW-btn">
              Login
            </button>
          </div>
        </div>
      </div>
    </nav>
  </section>
  )
}

export default Footer