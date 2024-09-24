import { useCallback, useEffect, useRef, useState } from 'react';
import { Search } from '../components/Search';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchLounges,
  fetchRightBarWdw,
  fetchBestViewd,
} from '../redux/lounges/slice';
import { useForm } from 'react-hook-form';
import { useAppDispatch } from '../redux/store';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { GET_BASE_URL_IMAGE } from '../constants/apiEndpoints';
import { GET_URL_PART } from '../constants/apiEndpoints';
// import midbanner from '../assets/img/user_dp.png';
const RightLoungeBest = () => {
  const dispatch = useAppDispatch();
  let sortType: any = null;
  let currentPage: any = null;

  const [bestDay, SetBestDay] = useState<any | string>([]);
  const [bestWeek, SetBestWeek] = useState<any | string>([]);
  const [bestMonth, SetBestMonth] = useState<any | string>([]);
  const [banner, SetBanner] = useState<any | string>([]);
  const [topMw, SetTopMw] = useState<any | string>([]);
  useEffect(() => {
    // window.scrollTo(0, 0);

    dispatch(fetchRightBarWdw({ sortType, currentPage })).then((res: any) => {
      SetBestDay(res.payload[0].bestoftheday);
      SetBestWeek(res.payload[0].bestoftheweek);
      SetBestMonth(res.payload[0].bestofthemonth);
      SetBanner(res.payload[0].banner);
      SetTopMw(res.payload[0].topmw);
    });
  }, []);

  const formatText = (text: any) => {
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
                    <Link to={`/disneyworld/user/${item.user_id}/mypost`}>
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
                  <a
                    href={`${window.location.origin}/${GET_URL_PART}/disneyworld/topmwbyqualitypost`}
                  >
                    MW Quality Top 100
                  </a>
                </li>

                <li>
                  <a
                    href={`${window.location.origin}/${GET_URL_PART}/disneyworld/topmousewaiters/TR`}
                  >
                    Top 100 MouseRank Leaders
                  </a>
                </li>

                <li>
                  <a
                    href={`${window.location.origin}/${GET_URL_PART}/disneyworld/topmousewaiters/MR`}
                  >
                    Monthly Leaders
                  </a>
                </li>
                <li>
                  <a
                    href={`${window.location.origin}/${GET_URL_PART}/disneyworld/topmousewaiters/MWR`}
                  >
                    Monthly Wait Time Leaders
                  </a>
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
              <div
                style={{
                  textAlign: 'center',
                  display: 'block',
                  paddingLeft: '20px',
                }}
              >
                <iframe
                  src='http://rcm.amazon.com/e/cm?lt1=_blank&bc1=FFFFFF&IS2=1&bg1=FFFFFF&fc1=000000&lc1=0000FF&t=allauthenticc-20&o=1&p=8&l=as4&m=amazon&f=ifr&ref=ss_til&asins=B007N6N3N0'
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

            <div className='textmore text-center'>
              <br />
              <a
                href='http://cafepress.com/mousewait'
                style={{
                  color: 'blue',
                  textDecoration: 'underline',
                }}
              >
                {' '}
                NEW! MouseWait Emporium
              </a>
            </div>

            <div>
              <div style={{ paddingLeft: '5px' }}>
                <div>
                  <div
                    className='fb-like-box'
                    data-href='https://www.facebook.com/mousewait'
                    data-width={200}
                    data-show-faces='true'
                    data-stream='true'
                    data-show-border='true'
                    data-header='true'
                  />
                </div>
                <br />
                <br />
                <div>
                  {/* BEGIN: Benchmark Email Signup Form Code */}
                  <noscript>
                    Please enable JavaScript &lt;br /&gt; &lt;a
                    href="https://www.benchmarkemail.com" target=_new
                    style="text-decoration:none;font-family:Arial,Helvetica,sans-serif;font-size:10px;color:#999999;"&gt;Email
                    Marketing&lt;/a&gt; by Benchmark Email
                  </noscript>
                  {/* END: Benchmark Email Signup Form Code */}
                </div>
              </div>
              <br />
            </div>

            <div id='ez-widget'>
              <h1 className='ez-welcome'>
                Get Disneyland and MouseWait News before anyone else! Join our
                Priority Text List today.
              </h1>
              <form
                encType='application/x-www-form-urlencoded'
                action='https://app.grouptexting.com/widgets?_method=subscribe'
                id='ez-form'
                method='post'
                target='subscribed'
                /*    onsubmit="window.open(
                        '',
                        'subscribed',
                        'width=280,' +
                        'height=390,' +
                        'scrollbars=no,resizable=yes,status=no,toolbar=0'
                );
                            " */
              >
                {/*   <input
                  type='hidden'
                  name='serializedData'
                  defaultValue='eNpVUF1P3DAQ/Ct7fg6F+yJc3ioVwaFSIUHVh8KDY2+SBZ8deW1dI8R/Z31cW/FgyTP2zOwOGtPO7XKu9XLTnWNdL9rNqr4w+qxe642xr4r4KoY88j06NImC/+pc2KNVjTpTldIf6OOPan6r+eJctOqpUh2hswduoaq5EEy9z+M1aotR5FeY4Buxx8lpb6Gc25AZf2lK8AP3DC12IaK8TMEjoGOcwU0gDyFHuIsUIqUJHvBPgu/ECVKwevoiU3E2Bpm77P6lPQzavzCIIZQ5yPeQxwqmkMFoD9lzbtlEaiUvlUhItMOZmBFfet06tCX6Vmx1j8ftnz8xQqRpLDdZWHm9O5Imcwq7rQn+Z3RCDSmNzePp46m87cmmoSjWxW9A6ockcHmAJBIBHUVOJwdQKSkobqX9xWp9UVeqL8WX5VXz+rf7Rv3v8U69vb0Dn4md8Q=='
                /> */}
                <div className='ez-el'>
                  <label className='ez-lb' htmlFor='PhoneNumber'>
                    Phone Number
                  </label>
                  <div className='ez-in'>
                    <input
                      id='PhoneNumber'
                      className='ez-text'
                      name='PhoneNumber'
                      type='tel'
                      placeholder='(e.g. 2223334444 no dots)'
                      pattern='^[2-9][0-9]{9}$'
                      required
                    />
                  </div>
                </div>
                <div className='ez-el'>
                  <label className='ez-lb' htmlFor='FirstName'>
                    First Name
                  </label>
                  <div className='ez-in'>
                    <input
                      id='FirstName'
                      className='ez-text'
                      name='FirstName'
                      type='text'
                      autoComplete='off'
                      required
                    />
                  </div>
                </div>
                <div className='ez-el clear'>
                  <div className='ez-in'>
                    <button className='ez-button' type='submit'>
                      Join Now
                    </button>
                  </div>
                </div>
              </form>
              <div id='ez-footer'>
                Msg&amp;data rates may apply. To unsubscribe, text <b>STOP</b>{' '}
                to 7606703130 . For help text <b>HELP</b> anytime. Available in
                USA. Your privacy is always protected and your information will
                not be shared.
              </div>
            </div>

            {/* best of the day */}
            <div className='mwr-Best-Week'>
              <a
                href={`${window.location.origin}/disneyworld/d/L/most-viewed`}
              >
                <h2>Best of The Day</h2>
              </a>

              {bestDay.map((bitem: any) => (
                <div className='bw-s best-day'>
                  <Link
                    to={`/disneyworld/lands-talk/${bitem.mapping_url?.replace(
                      /([~!@#$%^&*()_+=`{}\[\]\|\\:;'<>,.\? ])+/g,
                      '-'
                    )}`}
                  >
                    <img
                      src={
                        GET_BASE_URL_IMAGE +
                        '/disneyworld/chat_images/' +
                        bitem.chat_img
                      }
                      className='card-img-top img-fluid'
                      alt='img'
                    />
                  </Link>

                  <Link
                    to={`/disneyworld/lands-talk/${bitem.mapping_url?.replace(
                      /([~!@#$%^&*()_+=`{}\[\]\|\\:;'<>,.\? ])+/g,
                      '-'
                    )}`}
                  >
                    <h6 style={{ color: 'blue' }}>
                      {formatText(bitem.chat_msg)}
                    </h6>
                  </Link>
                </div>
              ))}
            </div>
            {/* best of the week */}
            <div className='mwr-Best-Week'>
              <a
                href={`${window.location.origin}/disneyworld/w/L/most-viewed`}
              >
                <h2>Best of The Week</h2>
              </a>

              {bestWeek.map((bitem: any) => (
                <div className='bw-s best-day'>
                  <Link
                    to={`/disneyworld/lands-talk/${bitem.mapping_url?.replace(
                      /([~!@#$%^&*()_+=`{}\[\]\|\\:;'<>,.\? ])+/g,
                      '-'
                    )}`}
                  >
                    <img
                      src={
                        GET_BASE_URL_IMAGE +
                        '/disneyworld/chat_images/' +
                        bitem.chat_img
                      }
                      className='card-img-top img-fluid'
                      alt='img'
                    />
                  </Link>

                  <Link
                    to={`/disneyworld/lands-talk/${bitem.mapping_url?.replace(
                      /([~!@#$%^&*()_+=`{}\[\]\|\\:;'<>,.\? ])+/g,
                      '-'
                    )}`}
                  >
                    <h6 style={{ color: 'blue' }}>
                      {formatText(bitem.chat_msg)}
                    </h6>
                  </Link>
                </div>
              ))}
            </div>
            {/* best of the month */}
            <div className='mwr-Best-Week'>
              <a
                href={`${window.location.origin}/disneyworld/m/L/most-viewed`}
              >
                <h2>Best of The Month</h2>
              </a>

              {bestMonth.map((bitem: any) => (
                <div className='bw-s best-day'>
                  <Link
                    to={`/disneyworld/lands-talk/${bitem.mapping_url?.replace(
                      /([~!@#$%^&*()_+=`{}\[\]\|\\:;'<>,.\? ])+/g,
                      '-'
                    )}`}
                  >
                    <img
                      src={
                        GET_BASE_URL_IMAGE +
                        '/disneyworld/chat_images/' +
                        bitem.chat_img
                      }
                      className='card-img-top img-fluid'
                      alt='img'
                    />
                  </Link>

                  <Link
                    to={`/disneyworld/lands-talk/${bitem.mapping_url?.replace(
                      /([~!@#$%^&*()_+=`{}\[\]\|\\:;'<>,.\? ])+/g,
                      '-'
                    )}`}
                  >
                    <h6 style={{ color: 'blue' }}>
                      {formatText(bitem.chat_msg)}
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
