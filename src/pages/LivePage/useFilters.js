import { useEffect, useState } from 'react';

function useFilters(themes, countries) {
  const storedFiltersApplied = JSON.parse(
    localStorage.getItem('filtersApplied')
  );

  if (storedFiltersApplied) {
    // If any new countries (since last save), they should be added to the users applied filters
    storedFiltersApplied.forEach((column) => {
      if (!column.savedAt) {
        // If no savedAt field exists, then default to '01-01-2000'.
        // TODO: This if statement block can be removed after 1st Nov 2021
        column.savedAt = new Date('01-01-2000');
      }
      const newCountries = countries.filter(
        (country) => new Date(country.created_at).getTime() > column.savedAt
      );
      if (newCountries.length > 0) {
        newCountries.forEach((c) => column.countries.push(c.id));
        column.savedAt = new Date().getTime(); // Update savedAt since we made a change
        console.warn('Adding countries', newCountries);
      }
    });

    // Remove any countries from applied filters that no longer in Strapi
    storedFiltersApplied.forEach((column) => {
      const strapiCountryIds = countries.map((c) => c.id);
      column.savedAt = new Date().getTime();
      column.countries = column.countries.filter((countryId) =>
        strapiCountryIds.includes(countryId)
      );
    });
  }

  const defaultFiltersApplied = themes
    .sort((a, b) => a.order - b.order)
    .map((theme) => {
      return {
        savedAt: new Date().getTime(),
        themeId: theme.id,
        countries: countries.map((country) => country.id),
        analysis: ['Longform', 'Shortform', 'News'],
      };
    });
  const [filtersApplied, setFiltersApplied] = useState(
    storedFiltersApplied || defaultFiltersApplied
  );

  // Keep local storage in-sync with filtersApplied
  useEffect(() => {
    if (filtersApplied) {
      localStorage.setItem('filtersApplied', JSON.stringify(filtersApplied));
    }
  }, [filtersApplied]);

  return [filtersApplied, setFiltersApplied];
}

export default useFilters;
