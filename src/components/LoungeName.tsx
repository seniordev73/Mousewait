import { Link, useNavigate, useParams } from 'react-router-dom';
type LoungeNamePropsType = {
  Time: any;
  Roomid: any;
};


export const LoungeName: React.FC<LoungeNamePropsType> = ({ Time, Roomid }) => {
  function converDate(datevalue: any) {
    const date = new Date(datevalue);
    const formattedDate = date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    });
    return formattedDate;
  }

  return (
    <>
      <div className='d-flex'>
        {' '}
        <p>{converDate(Time)}</p>{' '}
        {Roomid == '7' ? (
          <p className='my-dis'>
            <Link to={`/disneyland/lounge`}>Disneyland-Talk</Link>
          </p>
        ) : Roomid == '1' ? (
          <p className='my-dis'>
            <Link to={`/disneyland/lands/1/Disneyland-Real-Time/`}>
              Disneyland-Real-Time
            </Link>
          </p>
        ) : Roomid == null || Roomid == '0' ? (
          <p className='my-dis'>
            <Link to={`/disneyland/lands/0/the-hub/`}>The-Hub</Link>
          </p>
        ) : Roomid == '3' ? (
          <p className='my-dis'>
            <Link to={`/loungeland`}>LoungeLand</Link>
          </p>
        ) : Roomid == '4' ? (
          <p className='my-dis'>
            <Link to={`/club333`}>Club333</Link>
          </p>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};
