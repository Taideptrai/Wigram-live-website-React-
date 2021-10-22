/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react/macro';
import { Link } from 'react-router-dom';
import { optimisedImageUrl } from 'Utility';
import moment from 'moment';
import { useContext, useEffect, useRef, useState } from 'react';
import { ActiveCardContext } from 'ActiveCardContext';

// Returns an list of <ArticleCard>'s for a given date & theme (theme)
const ArticleCard = ({ article }) => {
  const { activeCard, setActiveCard } = useContext(ActiveCardContext);
  const [scaleSize, setScaleSize] = useState(1);
  const [moveXY, setMoveXY] = useState({ x: 0, y: 0 });

  // Animation for Longform click
  // useEffect(() => {
  //   const cardElement = activeCard.element;
  //   if (cardElement && activeCard.id === article.id && activeCard.show) {
  //     // && cardElement.dataset.id === '21'
  //     // TODO: for debug
  //     // To obtain the height of the window minus its horizontal scroll bar and any borders,
  //     // use the root <html> element's clientHeight property.
  //     const htmlElement = document.documentElement;
  //     const cardWidth = cardElement.getBoundingClientRect().width;
  //     const docCenterX = htmlElement.clientWidth / 2;
  //     const docCenterY = htmlElement.clientHeight / 2;
  //
  //     // prettier-ignore
  //     const cardCenterX =
  //       cardElement.getBoundingClientRect().x +
  //       (cardElement.getBoundingClientRect().width / 2);
  //
  //     // prettier-ignore
  //     const cardCenterY =
  //       cardElement.getBoundingClientRect().y +
  //       (cardElement.getBoundingClientRect().height / 2);
  //
  //     setMoveXY({ x: docCenterX - cardCenterX, y: docCenterY - cardCenterY });
  //     const scaleSize = (htmlElement.clientWidth / cardWidth) * 0.7; // Scale to 70%
  //     setScaleSize(scaleSize); // scaleSize
  //   } else {
  //     setMoveXY({ x: 0, y: 0 });
  //     setScaleSize(1);
  //   }
  // }, [activeCard.show]);

  const cardRef = useRef(null);
  if (!article) return null;

  // Countries
  const articleCountriesText = article.countries
    .map((c) => c.name.toUpperCase())
    .join(', ')
    .replace(/,/, ' &'); // Replace first comma with '&'
  const articleCountriesCss = css`
    font-size: 0.7rem;
    margin-bottom: 0.5rem;
  `;
  const articleCountries = (
    <div css={articleCountriesCss}>{articleCountriesText}</div>
  );

  // function onLongformClick(elementRef) {
  //   const element = elementRef.current;
  //   if (element) {
  //     setActiveCard({
  //       ...activeCard,
  //       element: element,
  //       elementId: element.id,
  //       id: +element.dataset?.id,
  //       show: true,
  //       offsetFromTop: window.pageYOffset,
  //       elementWidth: element.getBoundingClientRect().width,
  //     });
  //   }
  // }

  const imageUrl = optimisedImageUrl(article?.image, 'tr:w-337,h-190');
  let articleRendered;
  // Longform
  if (article.article_type === 'longform') {
    // TODO: Move to SCSS file
    const longformCss = css`
      height: 190px;
      text-align: center;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      display: flex;
      background-image: url('${imageUrl}');
      z-index: 1;
      ${activeCard.show &&
      activeCard.id === article.id &&
      `
        pointer-events: none !important;
        z-index: 10;
      `}
      ${!imageUrl &&
      `
        border: 1px solid #A54C1B;
        background-color: black !important;
        color: #527392 !important;
      `}
      transition: 700ms;
      transform: translate(${moveXY.x}px, ${moveXY.y}px) scale(${scaleSize});

      .time-ago {
        position: absolute;
        bottom: 1rem;
        right: 1rem;
      }
    `;

    articleRendered = (
      <Link to={`/longform/${article.slug}`}>
        <div
          css={longformCss}
          ref={cardRef}
          className='card is-clickable'
          // onClick={() => onLongformClick(cardRef)}
          data-id={article.id}
          id={`longform-${article.id}`}
          data-link={`/longform/${article.slug}`}
        >
          {articleCountries}
          {article.title}
          <TypeAndTime article={article}></TypeAndTime>
        </div>
      </Link>
    );
  }
  // Shortform
  else {
    articleRendered = (
      <Link to={`/shortform/${article.slug}`}>
        <div className='card is-clickable'>
          {articleCountries}
          {article.title}
          <TypeAndTime article={article}></TypeAndTime>
        </div>
      </Link>
    );
  }
  return articleRendered;
};

// Cards: Add time/day stamp in bottom right corner(<1hr use mins <24hrs use hrs >24hrs use date (Jun 19))
const TypeAndTime = ({ article }) => {
  const articleTypeText = article.type?.toUpperCase();

  // TODO: Move to SCSS file
  const metaRowCss = css`
    display: flex;
    justify-content: space-between;
    margin-top: 0.5rem;

    .article-type-text {
      color: ${articleTypeText === 'NEWS' ? '#955C45' : '#4AA842'};
      font-size: 0.7rem;
    }

    .time-ago {
      font-family: Avenir;
      color: var(--wigram-blue-text);
      font-size: 0.7rem;
    }
  `;

  function format(date) {
    const currentTime = moment();
    const publishedTime = moment(date);
    const diffMin = currentTime.diff(publishedTime, 'minute');
    const diffHours = currentTime.diff(publishedTime, 'hours');

    if (diffMin < 60) {
      return `${diffMin}m`; // < 1hr use mins / 24m
    } else if (diffHours < 24) {
      return `${diffHours}h`; // < 24hrs use hrs / 5h
    } else {
      return publishedTime.format('MMM D'); // Jun 20
    }
  }

  return (
    <div css={metaRowCss}>
      <div className='article-type-text'>{articleTypeText}</div>
      {!article.in_progress && (
        <div className='time-ago'>{format(article.date)}</div>
      )}
    </div>
  );
};

export default ArticleCard;
