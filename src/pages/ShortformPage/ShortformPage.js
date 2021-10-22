import React, { useEffect, useState } from 'react';
import './ShortformPage.scss';
import ReactMarkdown from 'react-markdown';
import Button from 'components/Button/Button';
import LeftNav from 'components/LeftNav/LeftNav';
import moment from 'moment';
import { Document, Page } from 'react-pdf';
import { optimisedImageUrl } from 'Utility';
import { useResizeDetector } from 'react-resize-detector';

import { ReactComponent as LeftChevron } from 'icons/left-chevron.svg';
import { ReactComponent as RightChevron } from 'icons/right-chevron.svg';
import { CustomVideo } from '../../components/Video/Video';

const ShortformPage = ({ article }) => {
  useEffect(() => {
    document.body.style.position = 'fixed';
    return () => {
      document.body.style.position = 'static';
    };
  }, []);

  if (!article) return null;
  return (
    <>
      <LeftNav showBack='true' isDark='true'/>
      <div className='shortform-page with-side-nav'>
        <div className='page-columns columns is-marginless'>
          <LeftColumn article={article} />
          <RightColumn article={article} />
        </div>
      </div>
    </>
  );
};

// Left column can be in 3 states:
// 1) English/Chinese content
// 2) Image
// 3) Chart image
// 4) PDF Doc
// 5) No content / blank
const LeftColumn = ({ article }) => {
  if (article.english_content && article.chinese_content) {
    return <EnglishChineseColumn article={article} />;
  } else if (article.images?.length > 0) {
    return <ImagesColumn article={article} />;
  } else if (article.pdf) {
    return <PdfDocColumn article={article} />;
  } else if (article.video_url) {
    return <VideoColumn article={article} />;
  } else {
    // Some content is required to prevent page scroll
    return <div className='column'>&nbsp;</div>;
  }
};

const PdfDocColumn = ({ article }) => {
  const [totalPages, setTotalPages] = useState(null);
  // We need to set width in px for the <Page>. We can't use css like 100%
  // as this causes the pdf to scale incorrectly. 'react-resize-detector' npm package
  // is used to help detect column size and also supports re-size.
  const { width, height, ref } = useResizeDetector();
  function onDocumentLoadSuccess({ numPages }) {
    setTotalPages(numPages);
  }

  // We can't read from Strapi directly as there are CORS issues.
  // So, instead we use Image Kit url.
  const urlWithCors = optimisedImageUrl(article.pdf);
  return (
    <div className='column pdf-column' ref={ref}>
      <Document file={urlWithCors} onLoadSuccess={onDocumentLoadSuccess}>
        {[...Array(totalPages)].map((num, i) => (
          <Page pageNumber={i + 1} key={i} width={width} />
        ))}
      </Document>
    </div>
  );
};

const EnglishChineseColumn = ({ article }) => {
  const [englishActive, setEnglishActive] = useState(true);
  const [content, setContent] = useState(article.english_content);

  const setLanguage = (language) => {
    if (language === 'english') {
      setContent(article.english_content);
      setEnglishActive(true);
    } else if (language === 'chinese') {
      setContent(article.chinese_content);
      setEnglishActive(false);
    }
  };

  return (
    <div className='column eng-ch-column'>
      <div className='body'>
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
      <div className='footer'>
        <Button
          type={englishActive ? 'primary' : 'secondary'}
          onClick={() => setLanguage('english')}
        >
          English
        </Button>
        <Button
          type={!englishActive ? 'primary' : 'secondary'}
          onClick={() => setLanguage('chinese')}
        >
          Chinese
        </Button>
        {article.content_source_url && (
          <Button
            type='secondary'
            href={article.content_source_url}
            target='_blank'
          >
            Source
          </Button>
        )}
      </div>
    </div>
  );
};

const ImagesColumn = ({ article }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  if (!article.images || article.images.length === 0) return null;

  function prevClicked(e) {
    e.stopPropagation();
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  }

  function nextClicked(e) {
    e.stopPropagation();
    if (currentImageIndex < article.images.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  }

  const imageUrl = optimisedImageUrl(
    article.images[currentImageIndex],
    'tr:w-900'
  );

  return (
    <div className='column images-column'>
      <div className='image-wrapper'>
        <img src={imageUrl} />
      </div>

      {article.images.length > 1 && (
        <div className='bottom-nav'>
          <div className='slide-count'>
            <div className='count'>{`0${currentImageIndex + 1}`}</div>
            <div className='count-total'>/ 0{article.images.length}</div>
          </div>
          <div className='left-right-arrows'>
            <LeftChevron onClick={prevClicked} />
            <RightChevron onClick={nextClicked} />
          </div>
        </div>
      )}
    </div>
  );
};

const VideoColumn = ({ article }) => {
  return (
    <div style={{ width: '50vw' }}>
      <div
        className={'bg-image'}
        style={{
          backgroundImage:
            "url('https://cdn.bongdaplus.vn/Assets/Media/2021/10/03/17/soi-keo-liverpool-vs-man-city.jpg')",
        }}
      />
      <div className={'bg-video'}>
        <CustomVideo url={'https://vimeo.com/621525525'} isDesktop />
      </div>
    </div>
  );
};

// Right column always contains the article content (only)
const RightColumn = ({ article }) => {
  // Date & time
  const jsDate = new Date(article.date);
  const date = moment(jsDate).format('MMM DD, YYYY');
  const time = moment(jsDate).format('h:mm A');

  const tags = article.tags.map((t) => t.name).join(', ');
  const countries = article.countries.map((t) => t.name).join(', ');

  const articleType =
    article.type?.substr(0, 1).toUpperCase() + article.type?.substr(1);

  return (
    <div className='column article-column'>
      <div className='country'>{countries}</div>
      <h2 className='article-heading'>{article.title}</h2>

      <div className='article-text'>
        <ReactMarkdown>{article.description}</ReactMarkdown>
      </div>
      {article.detail?.trim() && (
        <div className='article-comment'>
          <div className='comment-title'>Wigram Comment</div>
          <ReactMarkdown>{article.detail?.trim()}</ReactMarkdown>
        </div>
      )}

      <div className='columns article-meta-row'>
        <div className='column'>
          <h3>AUTHOR</h3>
          <div className='text'>{article.author?.name}</div>
        </div>
        <div className='column'>
          <h3>DATE</h3>
          <div className='text'>{date}</div>
        </div>
        <div className='column'>
          <h3>TIME</h3>
          <div className='text'>{time}</div>
        </div>
      </div>

      <div className='columns article-meta-row'>
        <div className='column'>
          <h3>ANALYSIS</h3>
          <div className='text'>{articleType}</div>
        </div>
        <div className='column'>
          <h3>THEME</h3>
          <div className='text'>{tags}</div>
        </div>
        <div className='column'></div>
      </div>
    </div>
  );
};

export default ShortformPage;
