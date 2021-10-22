import React from 'react';
import './ShortformPageMobile.scss';
import { CustomVideo } from '../../components/Video/Video';

function ShortformPageMobile() {
  return (
    <div className='shortform-page-mobile'>
      <CustomVideo url={'https://vimeo.com/621525525'} />
    </div>
  );
}

export default ShortformPageMobile;
