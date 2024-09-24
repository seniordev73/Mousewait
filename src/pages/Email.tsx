import { useCallback, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../redux/store';
import { useNavigate, Link } from 'react-router-dom';
import qs from 'qs';
import { GET_BASE_URL } from '../constants/apiEndpoints';
const Email = () => {
  return (
    <>
      <div className='des-bg-h'>
        {/*===== MW-banner-sec Start =======*/}
        <div className='MW-banner-sec'>
          <div className='container'>
            <div className='wh-home'>
              <div className='row'>
                <div className='col-xl-12'>
                  <div className='MW-bimg'>
                    <div className='mw-text text-center mwb'>
                      <p>
                        <a
                          href='https://mousewait.org/email/'
                          target='_blank'
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
                        or the{' '}
                        <a href={GET_BASE_URL + '/disneyland/lounge'}>
                          web
                        </a>{' '}
                        (update coming soon!)
                      </p>
                    </div>
                    <div className='mw-text text-center'>
                      <p>
                        Find the best food at Disneyland on our real-time{' '}
                        <a
                          href={GET_BASE_URL + '/disneyland/lounge'}
                          target='_blank'
                        >
                          Disneyland Food Blog!
                        </a>{' '}
                      </p>
                    </div>
                    <div className='mw-text text-center'>
                      <a href='https://mousewait.net/'>
                        PARTNER WITH MOUSEWAIT!
                      </a>
                    </div>
                    <div className='mw-text text-center'>
                      <a
                        href={GET_BASE_URL + '/disneyland/lounge'}
                        target='_blank'
                      >
                        Disneyland Real-Time Lounge
                      </a>{' '}
                      <a
                        href={GET_BASE_URL + '/disneyworld/lounge'}
                        target='_blank'
                      >
                        Disney World Lounge
                      </a>{' '}
                    </div>
                  </div>
                </div>
              </div>
              {/*===== MW-banner-sec End =======*/}
              {/*===== MW-back-sec Start =======*/}
              <div className='container'>
                <div className='row'>
                  <div className='MW-back-sec'></div>
                </div>
              </div>
              {/*===== MW-back-sec End =======*/}
            </div>
          </div>
        </div>
        {/*===== MMW-footer Start =======*/}
      </div>
    </>
  );
};

export default Email;
