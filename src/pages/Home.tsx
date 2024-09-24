import { useCallback, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../redux/store';
import { useNavigate, Link } from 'react-router-dom';
import qs from 'qs';
import { Categories, categories } from '../components/Categories';
import { Sort, list, SortTypeParams } from '../components/Sort';
import { PizzaBlock } from '../components/PizzaBlock';
import { Placeholder } from '../components/Placeholder';
import { Pagination } from '../components/Pagination';
import { fetchPizzas } from '../redux/pizzas/slice';
import { selectPizzas } from '../redux/pizzas/selectors';
import { selectFilters } from '../redux/filter/selectors';
// @ts-ignore
import MetaTags from 'react-meta-tags';
import {
  setCategoryId,
  setSortType,
  setCurrentPage,
  setFilters,
} from '../redux/filter/slice';
import { GET_BASE_URL } from '../constants/apiEndpoints';
import mouseLogo from '../assets/img/bottomimage.jpg';
import mainBanner from '../assets/img/MouseWait-img.png';

type SearchPizzaParams = {
  sortProperty: string;
  order: string;
  category: string;
  search: string;
  currentPage: string;
};

const Home = () => {
  const { categoryId, sortType, currentPage, searchValue } =
    useSelector(selectFilters);

  const dispatch = useAppDispatch();
  const { items, status } = useSelector(selectPizzas);
  const navigate = useNavigate();
  const isSearch = useRef(false);

  // To check if the Home coponent was rendered
  const isMounted = useRef(false);

  // If was the first render and params were changed
  useEffect(() => {
    if (isMounted.current) {
      const params = {
        categoryId: categoryId > 0 ? categoryId : null,
        sortProperty: sortType.sortProperty,
        currentPage,
      };
      const queryString = qs.stringify(params, { skipNulls: true });

      navigate(`/?${queryString}`);
    }

    isMounted.current = true;
  }, [categoryId, sortType.sortProperty, currentPage]);

  // If was the first then check URl-params and dispatch them to store
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(
        window.location.search.substring(1)
      ) as unknown as SearchPizzaParams;

      const sortType = list.find(
        (obj) => obj.sortProperty === params.sortProperty
      );
      if (sortType) {
        dispatch(
          setFilters({
            searchValue: params.search,
            categoryId: Number(params.category),
            currentPage: Number(params.currentPage),
            sortType,
          })
        );
      }
      isSearch.current = true;
    }
  }, []);

  // Get data from the server
  useEffect(() => {
    window.scrollTo(0, 0);

    if (!isSearch.current) {
      dispatch(fetchPizzas({ sortType, categoryId, currentPage, searchValue }));
    }

    isSearch.current = false;
  }, [categoryId, sortType.sortProperty, searchValue, currentPage]);

  const changeCategory = useCallback(
    (id: number) => dispatch(setCategoryId(id)),
    [categoryId]
  );

  const changeSort = useCallback(
    (obj: SortTypeParams) => dispatch(setSortType(obj)),
    []
  );

  return (
    <>
      <div className='des-bg-h'>
        {/*===== MW-banner-sec Start =======*/}

        <MetaTags>
          <title>Mousewait</title>
          <meta
            name='description'
            content='MouseWait provides a wealth of information for both casual and frequent visitors to the Disneyland Resort. It does exactly what it claims and more, and it does it extremely well. If you have plans to visit the Disneyland Resort in the future, or are an Annual Passholder, this app is an absolute must.'
          />
          <meta property='og:title' content='Mousewait' />
          <meta
            property='og:image'
            content='https://mousewait.com/static/media/MouseWait-img.fed12113160621608cfe.png'
          />
          <meta
            property='og:description'
            content='MouseWait provides a wealth of information for both casual and frequent visitors to the Disneyland Resort. It does exactly what it claims and more, and it does it extremely well. '
          />
        </MetaTags>
        <div className='MW-banner-sec'>
          <div className='container'>
            <div className='wh-home'>
              <div className='row'>
                <div className='col-xl-12'>
                  <div className='MW-bimg'>
                    <img
                      src={mainBanner}
                      className='img-fluid'
                      alt='MouseWait-logo'
                    />
                    <div className='mw-text text-center mwb'>
                      <p>
                        <a
                          href='https://mousewait.org/email/'
                          className='bold-l'
                        >
                          Get weekly Disneyland news in your inbox!
                        </a>
                        <br />
                        We curate <strong>positive</strong> and{' '}
                        <strong>uplifting</strong> news about Disneyland to save
                        you time and money
                      </p>
                    </div>
                    <div className='mw-text text-center'>
                      <p>
                        Visit the MouseWait Social Lounge via our{' '}
                        <a
                          href='https://apps.apple.com/us/app/mousewait-disneyland-lounge/id331771613'
                          target='_blank'
                        >
                          {' '}
                          iOS app
                        </a>{' '}
                        or the <Link to='disneyland/lounge'>web</Link> (update
                        coming soon!)
                      </p>
                    </div>
                    <div className='mw-text text-center'>
                      <p>
                        Find the best food at Disneyland on our real-time{' '}
                        <Link to='disneyland/lounge'>
                          Disneyland Food Blog!
                        </Link>
                      </p>
                    </div>
                    <div className='mw-text text-center'>
                      <a href='https://mousewait.net/'>
                        PARTNER WITH MOUSEWAIT!
                      </a>
                    </div>
                    <div className='mw-text text-center'>
                      <Link to='disneyland/lounge'>Disneyland Real-Time Lounge</Link>
                      |<Link to='disneyworld/lounge'>Disney World Lounge</Link>
                    </div>
                  </div>
                </div>
              </div>
              {/*===== MW-banner-sec End =======*/}
              {/*===== MW-back-sec Start =======*/}
              <div className='container'>
                <div className='row'>
                  <div className='MW-back-sec'>
                    <img
                      src={mouseLogo}
                      className='img-fluid'
                      alt='MouseWait-logo'
                    />
                  </div>
                </div>
              </div>
              {/*===== MW-back-sec End =======*/}
            </div>
          </div>
        </div>
        {/*===== MMW-footer Start =======*/}
        <section className='MW-footer'>
          <div className='container'>
            <div className='row'>
              <div className='MW-Social'>
                <div className='social-icons text-center'>
                  <ul className='p-0 m-0'>
                    <li>
                      <a href='https://www.facebook.com/MouseWait/'>
                        <i className='fa-brands fa-facebook' />
                      </a>
                    </li>
                    <li>
                      <a href={GET_BASE_URL}>
                        <i className='fas fa-home' />
                      </a>
                    </li>
                    <li>
                      <a href={GET_BASE_URL}>
                        <i className='fa-solid fa-envelope' />
                      </a>
                    </li>
                    <li>
                      <a href='https://www.instagram.com/mousewait/'>
                        <i className='fa-brands fa-instagram' />
                      </a>
                    </li>
                    <li>
                      <a href='https://twitter.com/mousewait'>
                        <i className='fa-brands fa-twitter' />
                      </a>
                    </li>
                    <li>
                      <a href='https://www.pinterest.com/mousewait/'>
                        <i className='fa-brands fa-pinterest' />
                      </a>
                    </li>
                  </ul>
                </div>
                <div className='footer-t text-center'>
                  <p>
                    MouseWait for Disneyland <br />© {new Date().getFullYear()}{' '}
                    audio rush LLC. All rights reserved.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
