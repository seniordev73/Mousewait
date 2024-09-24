import { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../redux/store';
import { Link } from 'react-router-dom';
import { Placeholder } from '../components/Placeholder';
import { selectLounges } from '../redux/lounges/selectors';
import midBanner from '../assets/img/mid-banner-img.png';
import { fetchTopMwByQualityPost } from '../redux/lounges/slice';
import { GET_BASE_URL_IMAGE, dTime } from '../constants/apiEndpoints';
const TopMwByQualityPost = (props: any) => {
  const dispatch = useAppDispatch();

  /* reducer se data lene per user name k click per data nai aata */
  /* const { mwByQuality, status } = useSelector(selectLounges); */

  const { status } = useSelector(selectLounges);

  const [topMw, SetTopMw] = useState<any | string>([]);
  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(fetchTopMwByQualityPost({})).then((res: any) => {
      SetTopMw(res.payload);
    });
  }, []);

  return (
    <>
      <div className='mid-main'>
        <div className='container'>
          <div className='mid-sec'>
            <div className='banner-img'>
              <Link to={`/disneyland/lounge`}>
                <img
                  src={midBanner}
                  className='img-fluid'
                  alt='mid-banner-img'
                />
              </Link>
            </div>
            <section className='msgs'>
              <div
                className='disneyrealt'
                style={{ textAlign: 'center', color: 'red' }}
              >
                MouseWait Quality Top 100
              </div>
              <div>
                {status === 'error' ? (
                  <div className='content__error-info'>
                    <h2>Error</h2>
                    <p>Please try to open the page later.</p>
                  </div>
                ) : (
                  <div className='mid-card-sec'>
                    {status === 'loading'
                      ? [...new Array(9)].map((_, index) => (
                          <Placeholder key={index} />
                        ))
                      : topMw?.map((obj: any) => (
                          <div className='card-v rounded myconversion'>
                            <div className='d-flex flex-row'>
                              <div className='small-c'>
                                <a>
                                  <img
                                    src={
                                      GET_BASE_URL_IMAGE +
                                      '/disneyland/images/thumbs/' +
                                      obj.image +
                                      dTime
                                    }
                                    className='com-imggg'
                                    style={{
                                      verticalAlign: 'middle',
                                      borderRadius: '50%',
                                      height: '50px',
                                      width: '50px',
                                    }}
                                  />
                                </a>
                              </div>

                              <div
                                className='d-flex'
                                style={{
                                  marginTop: '1rem',
                                  marginLeft: '1rem',
                                }}
                              >
                                <p
                                  className='commentlist'
                                  style={{ marginTop: '-1rem' }}
                                >
                                  <Link
                                    to={`/disneyland/user/${obj.user_id}/mypost`}
                                    style={{
                                      marginRight: '0.5rem',
                                      color: 'rgb(0, 0, 0)',
                                      textDecoration: 'underline',
                                    }}
                                  >
                                    {obj.user_name}
                                  </Link>
                                  <span className='com-tt'>
                                    <span>{obj.rank}</span>
                                    <span style={{ marginLeft: '0.5rem' }}>
                                      #{obj.position}
                                    </span>
                                  </span>
                                  <br />
                                  <span className='co-l'>
                                    {obj.net_total_likes_points}
                                  </span>
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                  </div>
                )}
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default TopMwByQualityPost;
