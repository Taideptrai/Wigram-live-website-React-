import ArticleCards from 'pages/LivePage/ArticleCards/ArticleCards';

const RowInProgressCards = ({ filtersApplied, shortforms, longforms }) => {
  if ((shortforms.length === 0) & (longforms.length === 0)) return null;

  return (
    <>
      <div className='date-cell'></div>
      {filtersApplied.map((columnFiltersApplied, index) => {
        return (
          <div className='cards-wrapper' key={index}>
            <ArticleCards
              longforms={longforms}
              shortforms={shortforms}
              columnFiltersApplied={columnFiltersApplied}
              filtersApplied={filtersApplied} // Required so we can check if the card has already been shown or not (if has multiple themes)
            ></ArticleCards>
          </div>
        );
      })}
    </>
  );
};

export default RowInProgressCards;
