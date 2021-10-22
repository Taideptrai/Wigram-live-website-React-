import './LongformListPage.scss';
import { optimisedImageUrl } from 'Utility';
import { Link } from 'react-router-dom';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/themes/splide-default.min.css';
import MenuSlideOut from 'components/MenuSlideOut/MenuSlideOut';
import { useState } from 'react';
import { ReactComponent as FilterGreen } from 'icons/filter-green.svg';
import Filters from 'pages/LivePage/Filters/Filters';
import useFilters from 'pages/LivePage/useFilters';

const LongformListPage = ({
  longforms,
  countries,
  themes,
  columnFiltersApplied,
}) => {
  const filtersData = {
    themes: themes,
    countries: countries,
    analysis: ['Longform', 'Shortform', 'News', 'Data points', 'Articles'],
  };
  const [filtersApplied, setFiltersApplied] = useFilters(themes, countries);
  console.log('filtersApplied', filtersApplied);
  const [isTitleShow, setIsTitleShow] = useState(0);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const expandSplide = () => {
    setIsTitleShow(1);
  };
  const smallSplide = () => {
    setIsTitleShow(0);
  };
  const expandFullSplide = () => {
    setIsTitleShow(2);
  };
  const classDynamicSplide =
    isTitleShow === 0
      ? 'splide'
      : isTitleShow === 1
      ? 'splideHalfWidth'
      : 'splideFullWidth';

  function hideFilters() {
    isFilterOpen(false);
  }
  return (
    <>
      <MenuSlideOut />
      <FilterGreen
        className='filter'
        alt='Filters'
        onClick={() => setIsFilterOpen(!isFilterOpen)}
      />

      {isFilterOpen ? (
        filtersApplied.map((columnFiltersApplied) => (
          <Filters
            width='400px'
            isRight
            columnFiltersApplied={columnFiltersApplied}
            filtersData={filtersData}
            onApply={(updatedFiltersApplied) =>
              changeFilters(updatedFiltersApplied, columnIndex)
            }
            onCancel={hideFilters}
          ></Filters>
        ))
      ) : (
        <></>
      )}

      <div className='longforms-page'>
        <div className='section'>
          <div className={`${isTitleShow == 0 ? 'title' : 'hidden'}`}>
            <h2>Long reads</h2>
            <p>
              All our notes chronological ordered. Try filtering if you are
              looking for something specific
            </p>
          </div>
          <Splide
            className={classDynamicSplide}
            options={{
              type: 'slide',
              perPage: 5,
              perMove: 1,
              focus: 'center',
              arrows: true,
              cover: true,
              pagination: false,
              gap: '1rem',
              lazyLoad: 'sequential',
              updateOnMove: false,
              drag: true,
              start: '0',
              breakpoints: {
                600: {
                  perPage: 2,
                  height: '6rem',
                },
              },
            }}
            onMoved={(splide, newIndex) => {
              if (newIndex === 0) {
                smallSplide();
              } else if (newIndex === 1) {
                expandSplide();
              } else {
                expandFullSplide();
              }
            }}
          >
            {longforms.map((a, i) => (
              <Slide article={a} key={i} />
            ))}
          </Splide>
        </div>
      </div>
    </>
  );
};
//expand splide

//Iso - longdate format
const dateFormat = (dateInput) => {
  const date = new Date(dateInput);
  let longMonth = date.toLocaleString('en-us', { month: 'long' });
  return longMonth + ' ' + date.getDate() + ', ' + date.getFullYear();
};

const Slide = ({ article }) => {
  const imageUrl = optimisedImageUrl(article.image, 'tr:w-600,h-480');
  const dayPublished = dateFormat(article.published_at);
  const country = article?.countries[0]?.name;
  return (
    <SplideSlide className='slide-element'>
      <img className='img' src={imageUrl} />
      <div className='slide-date'>{dayPublished}</div>
      <Link to={`/longform/${article.slug}`}>
        <div className='slide-content'>
          <div className='slide-country'>{country}</div>
          <h1>{article.title}</h1>
          <br />
        </div>
      </Link>
    </SplideSlide>
  );
};

export default LongformListPage;
