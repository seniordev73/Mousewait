import { Link, useNavigate, useParams } from 'react-router-dom';
type WdwLoungeNamePropsType = {
  Time: any;
  Roomid: any;
};

export const WdwLoungeName: React.FC<WdwLoungeNamePropsType> = ({
  Time,
  Roomid,
}) => {
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
        {Roomid == '1' ? (
          <p className='my-dis'>
            <Link to={`/disneyworld/lounge`}>Wdw-Talk</Link>
          </p>
        ) : Roomid == '2' ? (
          <p className='my-dis'>
            <Link to={`/disneyworld/lands/2/Wdw-Real-Time/`}>
              Wdw-Real-Time
            </Link>
          </p>
        ) : Roomid == null || Roomid != '1' || Roomid != '2' ? (
          <p className='my-dis'>
            <Link to={`/disneyworld/lands/0/the-hub/`}>The-Hub</Link>
          </p>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};
