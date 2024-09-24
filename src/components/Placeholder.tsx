import ContentLoader from 'react-content-loader'

export const Placeholder = () => {
return (
<ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={500}
    viewBox="0 0 280 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb">
    <circle cx="134" cy="136" r="107" />
    <rect x="0" y="269" rx="10" ry="10" width="280" height="23" />
    <rect x="0" y="312" rx="10" ry="10" width="280" height="88" />
    <rect x="0" y="424" rx="10" ry="10" width="140" height="30" />
    <rect x="165" y="417" rx="24" ry="24" width="112" height="45" />
  </ContentLoader>
)
}

