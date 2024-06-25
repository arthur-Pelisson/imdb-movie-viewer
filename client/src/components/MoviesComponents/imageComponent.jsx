import React, { useState } from 'react';
import { MovieImgPlaceHolder } from '../placeholder/moviePlaceHolder';
const ImageComponent = (props) => {
    const [loaded, setLoaded] = useState(false);

  const handleLoad = () => {
    setLoaded(true);
  }

    return (
      <React.Fragment>
        { !loaded && <MovieImgPlaceHolder/> }
        <img
            className="imgMovies h-[424px] max-w-[283px] m-auto max-w-[282px] 2lg:"
            src={"https://image.tmdb.org/t/p/w500" +props.movie.poster_path}
            alt={props.movie.title}
            onLoad={handleLoad}
            hidden={!loaded}
            />
      </React.Fragment>
    );
  
}

export default ImageComponent;