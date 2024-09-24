import { useCallback, useEffect, useRef, useState } from 'react';
import { Search } from '../components/Search';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchLounges,
  fetchRightBar,
  fetchBestViewd,
} from '../redux/lounges/slice';
import { useForm } from 'react-hook-form';
import { useAppDispatch } from '../redux/store';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { GET_BASE_URL_IMAGE, GET_MINI_DATA } from '../constants/apiEndpoints';
// import midbanner from '../assets/img/user_dp.png';
const RightLoungeBest = () => {
  const dispatch = useAppDispatch();
  let sortType: any = null;
  let currentPage: any = null;

  const [tag, SetTag] = useState<any | string>([]);
  const [bestDay, SetBestDay] = useState<any | string>([]);
  const [bestWeek, SetBestWeek] = useState<any | string>([]);
  const [bestMonth, SetBestMonth] = useState<any | string>([]);
  const [banner, SetBanner] = useState<any | string>([]);
  const [topMw, SetTopMw] = useState<any | string>([]);
  useEffect(() => {
    // window.scrollTo(0, 0);

    dispatch(fetchRightBar({ sortType, currentPage })).then((res: any) => {
      SetTag(res.payload[0].tagdata);
      SetBestDay(res.payload[0].bestoftheday);
      SetBestWeek(res.payload[0].bestoftheweek);
      SetBestMonth(res.payload[0].bestofthemonth);
      SetBanner(res.payload[0].banner);
      SetTopMw(res.payload[0].topmw);
    });
  }, []);

  /*   const formatText = (text: any) => {
    let content = text?.split(/((?:#|@|https?:\/\/[^\s]+)[a-zA-Z]+)/);
    let hashtag;

    return content?.map((word: any) => {
      if (word.startsWith('#')) {
        hashtag = word.replace('#', '');
        return (
          <Link to={`/disneyland/hash/${hashtag}`}>
            <a style={{ color: 'blue', textDecoration: 'underline' }}>{word}</a>
          </Link>
        );
      } else {
        return word;
      }
    });
  }; */

  function removeTags(string: any) {
    let newstring = string
      .replace(/<[^>]*>/g, ' ')
      .replace(/\s{2,}/g, ' ')
      .trim();
    let content = newstring?.split(/((?:#|@|https?:\/\/[^\s]+)[a-zA-Z]+)/);
    let hashtag;

    return content?.map((word: any) => {
      if (word.startsWith('#')) {
        hashtag = word.replace('#', '');
        return (
          <Link to={`/disneyland/hash/${hashtag}`}>
            <a style={{ color: 'blue', textDecoration: 'underline' }}>{word}</a>
          </Link>
        );
      } else {
        return word;
      }
    });
  }
  const [open, setIsopen] = useState(false);

  const ToggleSidebar = () => {
    open === true ? setIsopen(false) : setIsopen(true);
  };
  //console.log(window.location.origin);
  return (
    <>
      {/*-mw-right-c section start -*/}
      <div className='mw-right-c rounded mt-3'>
        <div className='card-body'>
          {/* <h6 className='donate-h'>
            Your Donations Help Us Make MouseWait Better!
          </h6> */}

          {/* <div className='don-c text-center paypal-cc'>
            <form action='https://www.paypal.com/cgi-bin/webscr' method='post'>
              <input type='hidden' name='cmd' defaultValue='_s-xclick' />
              <input
                type='hidden'
                name='hosted_button_id'
                defaultValue='R4S4DFM9R2R3U'
              />
              <input
                type='image'
                src='https://www.paypal.com/en_US/i/btn/btn_donateCC_LG.gif'
                name='submit'
                alt='PayPal - The safer, easier way to pay online!'
              />
            </form>
          </div> */}

          <div className='mw-week-s mt-2'>
            <h4>TOP MWs of the WEEK</h4>
            <div className='week-link'>
              <ul className='m-0 p-0'>
                {topMw.map((item: any) => (
                  <li>
                    {item.counter}.{' '}
                    <Link to={`/disneyland/user/${item.user_id}/mypost`}>
                      {item.user_name}
                    </Link>
                    {item.weekly_rank} <strong>#{item.rmkposition}</strong>
                  </li>
                ))}
              </ul>
            </div>
            <div className='week-link-2'>
              <ul className='m-0 p-0'>
                <li>
                  <Link to={`/disneyland/topmwbyqualitypost`}>
                    MW Quality Top 100
                  </Link>
                </li>

                <li>
                  <a
                    href={`${window.location.origin}/disneyland/topmousewaiters/TR`}
                  >
                    Top 100 MouseRank Leaders
                  </a>
                </li>

                <li>
                  <a
                    href={`${window.location.origin}/disneyland/topmousewaiters/MR`}
                  >
                    Monthly Leaders
                  </a>
                </li>
                <li>
                  <a
                    href={`${window.location.origin}/disneyland/topmousewaiters/MWR`}
                  >
                    Monthly Wait Time Leaders
                  </a>
                </li>
                <li>
                  <Link to={`/disneyland/topnewsfeatured`}>Top 50 News</Link>
                </li>
              </ul>
            </div>

            {/* mwr-add-section start */}

            <div className='mwr-ad1'>
              {banner.map((item: any) => (
                <a href={`${item.banner_url}`}>
                  <img
                    src={
                      GET_BASE_URL_IMAGE +
                      '/disneyland/images/banner_fullsize/' +
                      item.banner_image
                    }
                    className='card-img-top img-fluid'
                    alt='img'
                  />
                </a>
              ))}
            </div>
            {/* mwr-add-section end */}

            <div className='week-link-3 text-center'>
              <ul className='m-0 p-0'>
                <li>
                  <a href={'https://bit.ly/4coOHa'}>MouseWait for iPhone</a>
                </li>
                <li>
                  <a
                    href={
                      'https://www.appbrain.com/app/disneyland-mousewait-1-0/com.MW'
                    }
                  >
                    MouseWait for Android
                  </a>
                </li>
                <li>
                  <a href={'https://bit.ly/15Qda1F'}>Disneyland Trivia</a>
                </li>
                <li>
                  <a href={'https://bit.ly/goateffect'}>Goat Effect</a>
                </li>
                <li>
                  <a href={'https://facebook.mousewait.com'}>
                    Follow us on Facebook
                  </a>
                </li>
                <li>
                  <a href={'https://twitter.com/mousewait'}>
                    Follow us on Twitter
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <br />
              <div>
                <a
                  style={{ fontSize: '13px', fontWeight: 'bold' }}
                  href='https://amzn.to/OUTbbI'
                  target='_blank'
                >
                  <img
                    src={GET_BASE_URL_IMAGE + '/disneyland/images/a-banner.png'}
                    width='98%'
                    height={90}
                    alt='Use this link to do your shopping on Amazon.com and MouseWait benefits from your purchases!'
                    title='Use this link to do your shopping on Amazon.com and MouseWait benefits from your purchases!'
                  />
                </a>{' '}
                <br />
              </div>
              <br />
              <div
                style={{
                  textAlign: 'center',
                  display: 'block',
                  paddingLeft: '20px',
                }}
              >
                <iframe
                  src='https://rcm-na.amazon-adsystem.com/e/cm?lt1=_blank&bc1=000000&IS2=1&bg1=FFFFFF&fc1=000000&lc1=0000FF&t=allauthenticc-20&o=1&p=8&l=as4&m=amazon&f=ifr&ref=ss_til&asins=B00EXQDIK6'
                  style={{ width: '120px', height: '240px' }}
                  scrolling='no'
                  marginWidth={0}
                  marginHeight={0}
                  frameBorder={0}
                />
              </div>
              <br />
              <br />
            </div>

            <div className='mwr-text-s'>
              <div className='wwr-link tags'>
                <ul>
                  {' '}
                  {tag.map((item: any) => (
                    <li className={`tag${item.id}`}>
                      <Link
                        to={`/disneyland/tag/${item.tags_name?.replaceAll(
                          ' ',
                          '-'
                        )}`}
                      >
                        {item.tags_name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            {/* best of the day */}
            <div className='mwr-Best-Week'>
              <a href={`${window.location.origin}/disneyland/d/L/most-viewed`}>
                <h2>Best of The Day</h2>
              </a>

              {bestDay.map((bitem: any) => (
                <div className='bw-s best-day'>
                  <Link
                    to={`/disneyland/lands-talk/${bitem.mapping_url?.replace(
                      /([~!@#$%^&*()_+=`{}\[\]\|\\:;'<>,.\? ])+/g,
                      '-'
                    )}`}
                  >
                    <img
                      src={
                        GET_BASE_URL_IMAGE +
                        '/disneyland/chat_images/' +
                        bitem.chat_img
                      }
                      className='card-img-top img-fluid'
                      alt='img'
                    />
                  </Link>

                  <Link
                    to={`/disneyland/lands-talk/${bitem.mapping_url?.replace(
                      /([~!@#$%^&*()_+=`{}\[\]\|\\:;'<>,.\? ])+/g,
                      '-'
                    )}`}
                  >
                    {/*    <h6
                      style={{ color: 'blue' }}
                      dangerouslySetInnerHTML={{
                        __html: formatText(
                          bitem.chat_msg.split(/\s+/).slice(0, 10).join(' ')
                        ),
                      }}
                    /> */}

                    <h6 style={{ color: 'blue' }}>
                      {removeTags(
                        bitem.chat_msg.split(/\s+/).slice(0, 10).join(' ')
                      )}
                    </h6>
                  </Link>
                </div>
              ))}
            </div>
            {/* best of the week */}
            <div className='mwr-Best-Week'>
              <a href={`${window.location.origin}/disneyland/w/L/most-viewed`}>
                <h2>Best of The Week</h2>
              </a>

              {bestWeek.map((bitem: any) => (
                <div className='bw-s best-day'>
                  <Link
                    to={`/disneyland/lands-talk/${bitem.mapping_url.GET_MINI_DATA?.replace(
                      /([~!@#$%^&*()_+=`{}\[\]\|\\:;'<>,.\? ])+/g,
                      '-'
                    )}`}
                  >
                    <img
                      src={
                        GET_BASE_URL_IMAGE +
                        '/disneyland/chat_images/' +
                        bitem.chat_img
                      }
                      className='card-img-top img-fluid'
                      alt='img'
                    />
                  </Link>

                  <Link
                    to={`/disneyland/lands-talk/${bitem.mapping_url?.replace(
                      /([~!@#$%^&*()_+=`{}\[\]\|\\:;'<>,.\? ])+/g,
                      '-'
                    )}`}
                  >
                    <h6 style={{ color: 'blue' }}>
                      {removeTags(
                        bitem.chat_msg.split(/\s+/).slice(0, 10).join(' ')
                      )}
                    </h6>
                  </Link>
                </div>
              ))}
            </div>
            {/* best of the month */}
            <div className='mwr-Best-Week'>
              <a href={`${window.location.origin}/disneyland/m/L/most-viewed`}>
                <h2>Best of The Month</h2>
              </a>

              {bestMonth.map((bitem: any) => (
                <div className='bw-s best-day'>
                  <Link
                    to={`/disneyland/lands-talk/${bitem.mapping_url.GET_MINI_DATA?.replace(
                      /([~!@#$%^&*()_+=`{}\[\]\|\\:;'<>,.\? ])+/g,
                      '-'
                    )}`}
                  >
                    <img
                      src={
                        GET_BASE_URL_IMAGE +
                        '/disneyland/chat_images/' +
                        bitem.chat_img
                      }
                      className='card-img-top img-fluid'
                      alt='img'
                    />
                  </Link>

                  <Link
                    to={`/disneyland/lands-talk/${bitem.mapping_url?.replace(
                      /([~!@#$%^&*()_+=`{}\[\]\|\\:;'<>,.\? ])+/g,
                      '-'
                    )}`}
                  >
                    <h6 style={{ color: 'blue' }}>
                      {removeTags(
                        bitem.chat_msg.split(/\s+/).slice(0, 10).join(' ')
                      )}
                    </h6>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/*-mw-right-c section end -*/}
    </>
  );
};

export default RightLoungeBest;
