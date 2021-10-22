/** @jsxImportSource @emotion/react */
import './LivePage.scss';
import { css } from '@emotion/react/macro';
import { useContext, useEffect, useState } from 'react';
import useFilters from './useFilters';
import RowThemeHeaders from './RowThemeHeaders/RowThemeHeaders';
import RowInProgressCards from './RowInProgressCards/RowInProgressCards';
import CurrentTimeMarker from './CurrentTimeMarker/CurrentTimeMarker';
import RowArticleCards from './RowArticleCards/RowArticleCards';
import { ActiveCardContext } from 'ActiveCardContext';
import GroupBy from './GroupBy/GroupBy';

const LivePage = ({ longforms, shortforms, themes, countries }) => {
  const { activeCard } = useContext(ActiveCardContext);
  const storedGroupBy = JSON.parse(localStorage.getItem('groupBy'));
  const [cancelAllFilters, setCancelAllFilters] = useState(false);
  const [groupBy, setGroupBy] = useState(storedGroupBy || 'Days'); // 'days', 'weeks', 'months'

  useEffect(() => {
    localStorage.setItem('groupBy', JSON.stringify(groupBy));
  }, [groupBy]);

  const filtersData = {
    themes: themes,
    countries: countries,
    analysis: ['Longform', 'Shortform', 'News', 'Data points', 'Articles'],
  };
  const [filtersApplied, setFiltersApplied] = useFilters(themes, countries);

  // TODO: Move to SCSS file
  const rowCss = css`
    background-color: var(--wigram-blue-2);
    display: grid;
    grid-template-columns: 86px repeat(${themes.length}, 370px);
    padding: 0px 60px 0px 0px;
    .date-cell {
      background-color: var(--wigram-blue-1);
      font-size: 0.6rem;
      font-family: Avenir, sans-serif;
      color: var(--wigram-blue-text);
      padding-top: 1rem;
      padding-bottom: 1rem;
      text-align: center;
      grid-column: 1/2;
      .day-of-month {
        font-size: 0.8rem;
        font-weight: 600;
      }
    }

    .gap-date-cell {
      background-color: var(--wigram-blue-1);
      grid-column: 1/2;
      height: 20px;
    }

    // TODO: move to component
    .cards-wrapper {
      border-right: 1px solid #191d2b;
      padding: 1rem;
      .card {
        font-size: 1rem;
        margin-bottom: 1rem;
        color: white;
        padding: 1rem;
        background-color: var(--wigram-blue-3);
      }
      &.no-padding {
        padding: 0px;
      }
    }
  `;

  // TODO: Find another way to solve this. Move useState variables from RowThemeHeaders to index.js?
  function updateCancelAllFilters(event) {
    // All click events of the page bubble up to this top level event
    // so we need to be selective about which events we respond to.
    if (
      event.target.className === 'date-cell' ||
      event.target.className === 'cards-wrapper' ||
      event.target.className === 'page-wrapper'
    ) {
      // Trigger property change in <RowThemeHeaders> so it hides the filters
      setCancelAllFilters(true);
      setTimeout(() => {
        setCancelAllFilters(false);
      }, 500);
    }
  }

  return (
    <>
      <div className='live-page'>
        <GroupBy groupBy={groupBy} setGroupBy={setGroupBy} />
        {/*{activeCard.show && <Overlay />}*/}

        <div onClick={updateCancelAllFilters} className='page-wrapper'>
          {/*<Navbar type={'feed'} opacity={0}></Navbar>*/}
          <RowThemeHeaders
            filtersData={filtersData}
            filtersApplied={filtersApplied}
            setFiltersApplied={setFiltersApplied}
            groupBy={groupBy}
            setGroupBy={setGroupBy}
            cancelAllFilters={cancelAllFilters}
          />

          <div css={rowCss}>
            <RowInProgressCards
              filtersApplied={filtersApplied}
              shortforms={shortforms.filter(
                (a) => a.in_progress && hasDisplayedTheme(a, filtersApplied)
              )}
              longforms={longforms.filter(
                (a) => a.in_progress && hasDisplayedTheme(a, filtersApplied)
              )}
            />
          </div>

          <CurrentTimeMarker />

          <div css={rowCss}>
            <div className='gap-date-cell'></div>
            {filtersApplied.map((c, i) => (
              <div className='cards-wrapper no-padding' key={i}></div>
            ))}
          </div>

          <div css={rowCss}>
            {/* List of RowArticles (by day) */}
            {listOfDays(90, groupBy).map((d, index) => (
              <RowArticleCards
                date={d}
                groupBy={groupBy}
                filtersApplied={filtersApplied}
                longforms={longforms.filter((a) => !a.in_progress)}
                shortforms={shortforms.filter((a) => !a.in_progress)}
                key={index}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

function listOfDays(daysAgo, groupBy, currentList = []) {
  if (daysAgo === -1) return currentList.reverse();
  const dateToAdd = new Date();
  dateToAdd.setDate(dateToAdd.getDate() - daysAgo);

  const isSaturday = dateToAdd.getDay() === 6; // sat = 6, sun = 0
  const isFirstDayOfMonth = dateToAdd.getDate() === 1; // getDate(), 1 - 31
  // Include every day. We will filter out weekends in <RowArticleCards>
  if (groupBy === 'Days') {
    currentList.push(dateToAdd);
  }
  // Only include Saturdays as we want to group by week Saturday to Saturday
  // The business reason for this is that when clients come into work on Monday and view
  // Wigram they should see any content that was published over the weekend.
  else if (groupBy === 'Weeks' && isSaturday) {
    currentList.push(dateToAdd);
  }
  // We should only return the first day of the months, eg 1st May, 1st June etc
  else if (groupBy === 'Months' && isFirstDayOfMonth) {
    currentList.push(dateToAdd);
  }
  return listOfDays(daysAgo - 1, groupBy, currentList);
}

function hasDisplayedTheme(article, filtersApplied) {
  return (
    intersect(
      article.tags.map((t) => t.id),
      filtersApplied.map((c) => c.themeId)
    ).length > 0
  );
}

// Given 2 arrays, returns the common values.
function intersect(array1, array2) {
  var t;
  if (array2.length > array1.length) {
    t = array2;
    array2 = array1;
    array1 = t;
  } // indexOf to loop over shorter
  return array1.filter(function (e) {
    return array2.indexOf(e) > -1;
  });
}

export default LivePage;
