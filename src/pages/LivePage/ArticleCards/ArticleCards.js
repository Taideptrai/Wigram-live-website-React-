import ArticleCard from 'pages/LivePage/ArticleCard/ArticleCard';

const ArticleCards = ({
  columnFiltersApplied,
  filtersApplied,
  date,
  groupBy,
  longforms,
  shortforms,
}) => {
  // step 1) Filter articles
  // step 2) add 'article_type' property so we know how to
  //         render the article (as they need to be combined to sort by time)
  // step 3) convert date string to js date object

  let filteredLongforms = [];
  if (columnFiltersApplied.analysis.includes('Longform')) {
    filteredLongforms = longforms
      ?.filter((lf) => containsTheme(lf, columnFiltersApplied, filtersApplied))
      .filter((lf) => containsDate(lf, date, groupBy))
      .filter((lf) => containsCountries(lf, columnFiltersApplied?.countries))
      .map((lf) => {
        lf.article_type = 'longform';
        lf.date = new Date(lf.date);
        return lf;
      });
  }

  const filteredShortforms = shortforms
    ?.filter((sf) => containsTheme(sf, columnFiltersApplied, filtersApplied))
    .filter((sf) => containsDate(sf, date, groupBy))
    .filter((sf) => containsCountries(sf, columnFiltersApplied?.countries))
    .filter((sf) =>
      columnFiltersApplied.analysis
        .map((t) => {
          // The filter values don't match article.type values so we need to transform the values
          // 'Shortform' => 'analysis'
          // 'News' => 'news'
          return t === 'Shortform' ? 'analysis' : t.toLowerCase();
        })
        .includes(sf.type)
    )
    .map((sf) => {
      sf.article_type = 'shortform';
      sf.date = new Date(sf.date);
      return sf;
    });

  const articles = [...filteredLongforms, ...filteredShortforms];

  // Sort all articles: show the most recent first
  articles.sort((a, b) => b.date.getTime() - a.date.getTime());

  const articleCards = articles.map((article, i) => (
    <ArticleCard article={article} key={i} />
  ));
  return articleCards;
};

function containsTheme(article, columnFiltersApplied, filtersApplied) {
  if (article && columnFiltersApplied && filtersApplied) {
    // If the article only has one theme, then simply check if it matches the current column theme.
    if (article.tags.length === 1) {
      return article.tags[0].id === columnFiltersApplied.themeId;
    }
    // If an article has multiple themes (eg 'Inflation', 'Policy'), then we should only return it if the first matched
    // column (eg 'Inflation'), provided this column is shown. This avoids duplicates being shown.
    else if (article.tags.length > 1) {
      const visibleThemeIds = filtersApplied.map((column) => column.themeId);
      const articleThemesVisible = article.tags.filter((t) =>
        visibleThemeIds.includes(t.id)
      );
      return articleThemesVisible[0]?.id === columnFiltersApplied.themeId;
    }
  }
  return false;
}

// An article can be associated to many countries
// If it contains at one (or more) of the countries we are filtering by then return it
function containsCountries(article, countries) {
  let countryMatch = false;
  countries.forEach((country) => {
    if (article.countries.map((c) => c.id).includes(country))
      countryMatch = true;
  });
  return countryMatch;
}

function containsDate(article, dateToCompare, groupBy) {
  // If article is in progress, then we don't need to worry about the date, so just return true;
  if (article.in_progress) return true;

  dateToCompare = dateToCompare.setHours(0, 0, 0, 0);
  let articleDate = new Date(article.date);
  articleDate.setHours(0, 0, 0, 0);

  // Group by 'Days'
  if (groupBy === 'Days') {
    // compares epoch date format, eg: 1619704800000 === 1619704800000
    return articleDate.getTime() === dateToCompare;
  }

  // Group by 'Weeks'
  else if (groupBy === 'Weeks') {
    const startDate = dateToCompare;
    const endDate = addDays(startDate, 7);
    return (
      articleDate.getTime() <= endDate && articleDate.getTime() >= startDate
    );
  }

  // Group by 'Months'
  else if (groupBy === 'Months') {
    const startDate = dateToCompare;

    let y = new Date(startDate).getFullYear();
    let m = new Date(startDate).getMonth();
    // To get the last day of month, we can add 1 to month and set day as 0.
    // It seems a bit strange, but it works
    let endDate = new Date(y, m + 1, 0).getTime();
    return (
      articleDate.getTime() <= endDate && articleDate.getTime() >= startDate
    );
  }

  // Unknown
  else {
    console.error(
      `Invalid groupBy passed to containsDate(). Must be 'Days', 'Weeks' or 'Months' but got ${groupBy}`
    );
  }
}

function addDays(date, days) {
  let result = new Date(date);
  result.setDate(result.getDate() + days);
  return result.getTime();
}

export default ArticleCards;
