/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react/macro';
import { useEffect, useState } from 'react';
import Button from 'components/Button/Button';
import produce from 'immer';
import { gsap } from 'gsap/dist/gsap';

import { ReactComponent as UpChevronBlack } from 'icons/up-chevron-black.svg';
import { ReactComponent as IconTick } from 'icons/tick.svg';
import { ReactComponent as IconTickOff } from 'icons/tick-off.svg';

const Filters = ({
  columnFiltersApplied,
  filtersData,
  onCancel,
  onApply,
  width,
  isRight,
}) => {
  // We need to take a local copy of the applied filters so we can make changes to the
  // data but only Apply the changes to the main dataset once Apply is clicked.
  const [localFiltersApplied, setLocalFiltersApplied] =
    useState(columnFiltersApplied);

  const [countriesExpanded, setCountriesExpanded] = useState(true);
  const [analysisExpanded, setAnalysisExpanded] = useState(false);

  // TODO: Move to SCSS file
  const widthAll = width ? width : '100%';
  const rightAll = isRight ? '0px' : '';
  const filtersCss = css`
    background-color: var(--wigram-green-primary);
    color: var(--wigram-grey-0);
    position: absolute;
    top: 86px;
    height: calc(100vh - 86px);
    overflow-y: scroll;
    right: ${rightAll};
    z-index: 2;
    width: ${widthAll};
    ::-webkit-scrollbar {
      display: none;
    }
    .group-header {
      padding: 1rem;
      font-size: 0.8rem;
      letter-spacing: 0.2em;
      border-bottom: 1px solid #3f8f39;
      border-top: 1px solid #3f8f39;
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      align-content: center;

      svg {
        height: 20px;
      }
    }

    .country-options-wrapper {
      height: 0;
      overflow: hidden;
      // This make it look nicer when both menus are collapsed as it shows 1px divider, not 2px.
      margin-top: -1px;
    }

    .analysis-options-wrapper {
      height: 0;
      overflow: hidden;
    }

    .body {
      padding: 1rem;
      padding-top: 0.5rem;

      .option {
        cursor: pointer;
        display: grid;
        grid-template-columns: 38px 1fr;
        align-items: center;
        justify-self: center;
        svg {
          height: 38px;
          justify-self: start;
        }
        .text {
        }
      }

      .btn-wrapper {
        display: flex;
        padding: 0.5rem;
        padding-bottom: 0px;
        justify-content: space-between;
      }
    }

    .btn-wrapper {
      padding: 1rem;
      Button {
        margin-bottom: 0.5rem;
      }
    }
  `;

  function onCountryClick(countryId, checked) {
    setLocalFiltersApplied(
      produce((draft) => {
        if (checked) {
          draft.countries.push(countryId);
        } else {
          draft.countries = draft.countries.filter((id) => id !== countryId);
        }
      })
    );
  }

  function selectAllCountries() {
    setLocalFiltersApplied(
      produce((draft) => {
        draft.countries = filtersData.countries.map((c) => c.id);
      })
    );
  }

  function clearAllCountries() {
    setLocalFiltersApplied(
      produce((draft) => {
        draft.countries = [];
      })
    );
  }

  // On initial page load, expand the countries options
  useEffect(() => {
    gsap.to('.country-options-wrapper', {
      duration: 0.4,
      height: 'auto',
      delay: 0.4,
    });
    gsap.to('.icon-countries-open-close', {
      rotation: 180,
      duration: 0.5,
      delay: 0.4,
    });
  }, []);

  // TODO: Improvement - Move logic to useEffect hook
  //  and watch for changes of countriesExpanded
  function toggleCountries() {
    if (!countriesExpanded) {
      // open animation
      gsap.to('.country-options-wrapper', { duration: 0.5, height: 'auto' });
      gsap.to('.icon-countries-open-close', {
        rotation: 180,
        duration: 0.7,
      });
      if (analysisExpanded) toggleAnalysis();
    } else {
      // close animation
      gsap.to('.country-options-wrapper', { duration: 0.5, height: 0 });
      gsap.to('.icon-countries-open-close', {
        rotation: 0,
        duration: 0.7,
      });
    }
    setAnalysisExpanded(false);
    setCountriesExpanded(!countriesExpanded);
  }

  function toggleAnalysis() {
    if (!analysisExpanded) {
      // open animation
      gsap.to('.analysis-options-wrapper', { duration: 0.5, height: 'auto' });
      gsap.to('.icon-analysis-open-close', {
        rotation: 180,
        duration: 0.7,
      });
      if (countriesExpanded) toggleCountries();
    } else {
      // close animation
      gsap.to('.analysis-options-wrapper', { duration: 0.5, height: 0 });
      gsap.to('.icon-analysis-open-close', {
        rotation: 0,
        duration: 0.7,
      });
    }
    setCountriesExpanded(false);
    setAnalysisExpanded(!analysisExpanded);
  }

  function selectAllAnalysis() {
    setLocalFiltersApplied(
      produce((draft) => {
        draft.analysis = filtersData.analysis;
      })
    );
  }

  function clearAllAnalysis() {
    setLocalFiltersApplied(
      produce((draft) => {
        draft.analysis = [];
      })
    );
  }

  function onAnalysisClick(item, checked) {
    setLocalFiltersApplied(
      produce((draft) => {
        if (checked) {
          draft.analysis.push(item);
        } else {
          draft.analysis = draft.analysis.filter((x) => x !== item);
        }
      })
    );
  }

  const analysisOptions = filtersData.analysis.map((item, i) => (
    <Option
      option={item}
      key={i}
      onClick={(country, isChecked) => onAnalysisClick(item, isChecked)}
      idsSelected={localFiltersApplied.analysis}
    ></Option>
  ));

  const countryOptions = filtersData.countries.map((country, i) => (
    <Option
      option={country}
      key={i}
      onClick={(country, isChecked) => onCountryClick(country.id, isChecked)}
      idsSelected={localFiltersApplied.countries}
    ></Option>
  ));

  return (
    <div css={filtersCss}>
      <div className='group-header' onClick={toggleCountries}>
        COUNTRIES
        <UpChevronBlack
          className='icon-countries-open-close'
          alt='open and close'
          width='20'
        />
      </div>

      <div className='country-options-wrapper'>
        <div className='body'>
          {countryOptions}
          <div className='btn-wrapper'>
            <Button
              type='underlined'
              onClick={selectAllCountries}
              disabled={
                localFiltersApplied.countries.length ===
                filtersData.countries.length
                  ? true
                  : null
              }
            >
              Select All
            </Button>
            <Button
              type='underlined'
              onClick={clearAllCountries}
              disabled={
                localFiltersApplied.countries.length === 0 ? true : null
              }
            >
              Clear All
            </Button>
          </div>
        </div>
      </div>

      <div className='group-header' onClick={toggleAnalysis}>
        ANALYSIS
        <UpChevronBlack
          className='icon-analysis-open-close'
          alt='open and close'
          width='20'
        />
      </div>
      <div className='analysis-options-wrapper'>
        <div className='body'>
          {analysisOptions}
          <div className='btn-wrapper'>
            <Button
              type='underlined'
              onClick={selectAllAnalysis}
              disabled={
                localFiltersApplied.analysis.length ===
                filtersData.analysis.length
                  ? true
                  : null
              }
            >
              Select All
            </Button>
            <Button
              type='underlined'
              onClick={clearAllAnalysis}
              disabled={localFiltersApplied.analysis.length === 0 ? true : null}
            >
              Clear All
            </Button>
          </div>
        </div>
      </div>

      <div className='btn-wrapper'>
        <Button
          type='dark'
          onClick={() => onApply(localFiltersApplied)}
          width='full'
        >
          Apply
        </Button>
        <Button type='outline' onClick={onCancel} width='full'>
          Cancel
        </Button>
      </div>
    </div>
  );
};

const Option = ({ option, idsSelected, onClick }) => {
  const isChecked = idsSelected.includes(option.id || option);
  const willBeChecked = !isChecked;

  return (
    <div className='option' onClick={() => onClick(option, willBeChecked)}>
      {isChecked ? <IconTick width='38' /> : <IconTickOff width='38' />}
      <div className='text'>{option.name || option}</div>
    </div>
  );
};

export default Filters;
