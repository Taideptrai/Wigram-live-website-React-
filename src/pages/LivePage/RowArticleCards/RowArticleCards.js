// for each date / column combination, render a list of article cards
import ArticleCards from 'pages/LivePage/ArticleCards/ArticleCards';

const RowArticleCards = ({
  date,
  groupBy,
  shortforms,
  longforms,
  filtersApplied,
}) => {
  if (!date || !filtersApplied) {
    console.warn("'date' and 'filtersApplied' is required for <Row>..", date);
    return null;
  }

  // Don't display the weekend dates (if there are no articles)
  const isWeekend = date.getDay() === 6 || date.getDay() === 0; // sat = 6, sun = 0
  if (isWeekend) {
    // Only do this check if it's a weekend date...
    const count = articleCount({
      filtersApplied,
      date,
      groupBy,
      longforms,
      shortforms,
    });
    if (count === 0) {
      return null; // Don't render anything.
    }
  }

  return (
    <>
      <div className='date-cell'>
        <div className='day-of-month'>{date.getDate()}</div>
        {formattedDate(date)}
      </div>

      {filtersApplied.map((columnFiltersApplied, index) => {
        return (
          <div className='cards-wrapper' key={index}>
            <ArticleCards
              longforms={longforms}
              shortforms={shortforms}
              date={date}
              groupBy={groupBy}
              columnFiltersApplied={columnFiltersApplied}
              filtersApplied={filtersApplied} // Required so we can check if the card has already been shown or not (if has multiple themes)
            ></ArticleCards>
          </div>
        );
      })}
    </>
  );
};

// Gets the count of articles for a given date so we can determine if we should show
// the row if it is a weekend.
function articleCount({
  filtersApplied,
  date,
  groupBy,
  longforms,
  shortforms,
}) {
  let articleCardsCount = 0;
  filtersApplied.forEach((columnFiltersApplied) => {
    articleCardsCount += ArticleCards({
      columnFiltersApplied,
      filtersApplied,
      date,
      groupBy,
      longforms,
      shortforms,
    }).length;
  });
  return articleCardsCount;
}

// Use US date format, eg Jul 30
function formattedDate(date) {
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  return months[date.getMonth()].toUpperCase();
}

export default RowArticleCards;
