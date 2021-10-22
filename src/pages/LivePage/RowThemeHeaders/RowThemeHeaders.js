import './RowThemeHeaders.scss';
import { useEffect, useState } from 'react';
import ThemeSelector from 'pages/LivePage/ThemeSelector/ThemeSelector';
import Filters from 'pages/LivePage/Filters/Filters';
import MenuSlideOut from 'components/MenuSlideOut/MenuSlideOut';
import { ReactComponent as FilterBlue } from 'icons/filter-blue.svg';
import { ReactComponent as FilterGreen } from 'icons/filter-green.svg';
import { ReactComponent as IconPlus } from 'icons/plus.svg';
import { ReactComponent as IconUpChevronGreen } from 'icons/up-chevron-green.svg';
import produce from 'immer';

const RowThemeHeaders = ({
  filtersData,
  filtersApplied,
  setFiltersApplied,
  cancelAllFilters,
}) => {
  const [showThemeSelectorIndex, setShowThemeSelectorIndex] = useState(null);
  const [showFiltersIndex, setShowFiltersIndex] = useState(null);

  // Allows any visible dropdowns to be cleared
  // when clicking outside of them.
  useEffect(() => {
    if (cancelAllFilters) {
      hideFilters();
      hideThemeSelector();
    }
  }, [cancelAllFilters]);

  const maxColumnsAllowed = filtersData.themes.length;

  document.documentElement.style.setProperty(
    '--filters-applied-count',
    filtersApplied.length
  );

  function hasDefaultFilters(columnFiltersApplied) {
    const defaultCountriesSelected =
      columnFiltersApplied.countries.length === filtersData.countries.length;

    const defaultAnalysisSelected =
      columnFiltersApplied.analysis.length === 3 &&
      columnFiltersApplied.analysis.every((a) =>
        ['Longform', 'Shortform', 'News'].includes(a)
      );
    return defaultCountriesSelected && defaultAnalysisSelected;
  }

  function filtersCount(columnFiltersApplied) {
    if (hasDefaultFilters(columnFiltersApplied)) return undefined;
    return (
      columnFiltersApplied.countries.length +
      columnFiltersApplied.analysis.length
    );
  }

  function changeTheme(themeId, columnIndex) {
    // Set the column theme
    setFiltersApplied(
      produce((draft) => {
        draft[columnIndex].savedAt = new Date().getTime();
        draft[columnIndex].themeId = themeId;
      })
    );
    // Then hide the theme selector
    hideThemeSelector();
  }

  function changeFilters(updatedFiltersApplied, columnIndex) {
    setFiltersApplied(
      produce((draft) => {
        draft[columnIndex].savedAt = new Date().getTime();
        draft[columnIndex].countries = updatedFiltersApplied.countries;
        draft[columnIndex].analysis = updatedFiltersApplied.analysis;
      })
    );
    hideFilters();
  }

  function onFilterClick(columnIndex) {
    if (showFiltersIndex === columnIndex) {
      hideFilters();
    } else {
      hideThemeSelector();
      setShowFiltersIndex(columnIndex);
    }
  }

  function onHeadingClick(columnIndex) {
    if (showThemeSelectorIndex === columnIndex) {
      hideThemeSelector();
    } else {
      hideFilters();
      setShowThemeSelectorIndex(columnIndex);
    }
  }

  function removeColumn(columnIndex) {
    const withOutIndex = filtersApplied.filter((_, i) => i !== columnIndex);
    setFiltersApplied(withOutIndex);
    setShowThemeSelectorIndex(null);
    setShowFiltersIndex(null);
  }

  function addNewColumn() {
    const usedThemeIds = filtersApplied.map((column) => column.themeId);
    const unusedThemes = filtersData.themes
      .filter((t) => !usedThemeIds.includes(t.id))
      .map((t) => t.id);

    if (unusedThemes.length > 0) {
      setFiltersApplied(
        produce((draft) => {
          draft.push({
            savedAt: new Date().getTime(),
            themeId: unusedThemes[0], // Choose the first unused theme
            countries: filtersData.countries.map((country) => country.id),
            analysis: ['Longform', 'Shortform', 'News'],
          });
        })
      );
    } else {
      console.warn('! New column NOT allowed. All themes have been allocated.');
    }
  }

  function hideFilters() {
    setShowFiltersIndex(null);
  }

  function hideThemeSelector() {
    setShowThemeSelectorIndex(null);
  }

  return (
    <div className='row-theme-headers'>
      <MenuSlideOut />

      <div className='date-cell'></div>

      {filtersApplied.map((columnFiltersApplied, columnIndex) => {
        const theme = filtersData.themes.find(
          (t) => t.id === columnFiltersApplied.themeId
        );

        return (
          <div key={columnIndex} className='header-wrapper'>
            {showThemeSelectorIndex === columnIndex && (
              <ThemeSelector
                themes={filtersData.themes}
                currentThemeId={columnFiltersApplied.themeId}
                disabledThemeIds={filtersApplied.map((f) => f.themeId)}
                onThemeClick={(themeId) => changeTheme(themeId, columnIndex)}
                onRemoveClick={() => removeColumn(columnIndex)}
              ></ThemeSelector>
            )}

            {showFiltersIndex === columnIndex && (
              <Filters
                columnFiltersApplied={columnFiltersApplied}
                filtersData={filtersData}
                onApply={(updatedFiltersApplied) =>
                  changeFilters(updatedFiltersApplied, columnIndex)
                }
                onCancel={hideFilters}
              ></Filters>
            )}
            <div className='header-cell'>
              <h1 onClick={(e) => onHeadingClick(columnIndex)}>
                {theme.name}
                <span className='svg-wrapper'>
                  <IconUpChevronGreen />
                </span>
              </h1>

              <div className='icons'>
                {filtersCount(columnFiltersApplied) && (
                  <div className='filter-count'>
                    {filtersCount(columnFiltersApplied)}
                  </div>
                )}

                {hasDefaultFilters(columnFiltersApplied) ? (
                  <FilterBlue
                    alt='Filters'
                    onClick={() => onFilterClick(columnIndex)}
                  />
                ) : (
                  <FilterGreen
                    alt='Filters'
                    onClick={() => onFilterClick(columnIndex)}
                  />
                )}
              </div>
            </div>
          </div>
        );
      })}

      <div className='add-cell'>
        {filtersApplied.length < maxColumnsAllowed && (
          <IconPlus alt='Add new column' onClick={addNewColumn} />
        )}
      </div>
    </div>
  );
};

export default RowThemeHeaders;
