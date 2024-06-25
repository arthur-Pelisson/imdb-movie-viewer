
import ContentLoader from 'react-content-loader'

const MoviePlaceHolder = (props) => (
  <div className="flex lg:w-1/5 flex-col mt-5 md:w-1/3" >
    <ContentLoader 
    speed={2}
    width="100%"
    height="100%"
    viewBox="0 0 260 450"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="4" y="22" rx="0" ry="0" width="256" height="300" /> 
    <rect x="37" y="339" rx="0" ry="0" width="201" height="17" /> 
    <rect x="39" y="378" rx="0" ry="0" width="78" height="16" /> 
    <rect x="145" y="379" rx="0" ry="0" width="83" height="15" /> 
    <rect x="39" y="409" rx="0" ry="0" width="79" height="14" />
  </ContentLoader>
  </div>
  );

  const MovieImgPlaceHolder = (props) => (
      <ContentLoader 
      speed={2}
      width="100%"
      height="100%"
      viewBox="0 0 260 300"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      {...props}
    >
      <rect x="4" y="22" rx="0" ry="0" width="500" height="300" /> 
    </ContentLoader>
    );

  const MovieGenrePlaceHolder = (props) => (
    <div className="inline-block px-3 py-1 mr-2 mb-2" >
      <ContentLoader 
    speed={2}
    width={80}
    height={50}
    viewBox="0 0 80 50"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="39" y="409" rx="0" ry="0" width="79" height="14" /> 
    <rect x="0" y="13" rx="0" ry="0" width="109" height="21" />
  </ContentLoader>
    </div>
    );

export {MovieGenrePlaceHolder, MoviePlaceHolder, MovieImgPlaceHolder};