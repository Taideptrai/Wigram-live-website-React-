/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react/macro';
import { useState } from 'react';
import { SERIES_COLOURS } from './chartConfig';

import { ReactComponent as IconArrow } from './../icons/arrow.svg';

const ChartInfo = ({ chart }) => {
  const wrapperCss = css`
    display: flex;
    flex-wrap: wrap;
    padding: 1rem;
    flex-direction: column;
    height: 100%;
  `;
  // We want the last flex item to take up 100% of the space available.
  // To do this we set flex grow = 1, which makes the container take up 100% but the content is still
  // at the top. To push content to the bottom make it a flex container
  // and then use justify-content: flex-end;
  const lastItemContainer = css`
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  `;
  const headingCss = css`
    font-size: 0.9rem;
    letter-spacing: 0.1rem;
    text-transform: uppercase;
    margin-bottom: 0.8rem;
    color: #666;
  `;
  const textCss = css`
    white-space: pre-wrap; // maintains line breaks set in CMS
  `;

  return (
    <div css={wrapperCss}>
      {/* LEGEND */}
      <div>
        <div css={headingCss}>LEGEND</div>
        {chart?.series?.map((series, i) => (
          <SeriesInfo {...series} key={i}></SeriesInfo>
        ))}
      </div>

      {/* COMPRISES */}
      {chart?.series_comprises && (
        <div>
          <div css={headingCss}>COMPRISES</div>
          <div css={textCss}>{chart?.series_comprises}</div>
        </div>
      )}

      {/* SOURCE */}
      {chart?.source && (
        <div css={lastItemContainer}>
          <div>
            <div css={headingCss}>SOURCE</div>
            <div css={textCss}>{chart?.source}</div>
          </div>
        </div>
      )}
    </div>
  );
};

const SeriesInfo = ({ name, comprises, colour }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const canExpand = comprises?.length > 0;

  const seriesHeadingCss = css`
    font-size: 1rem;
    padding-left: 0.5rem;
    border-left: 3px solid ${SERIES_COLOURS[colour]};
    margin-bottom: 0.5rem;
    ${canExpand && `cursor: pointer;`}
  `;

  const comprisesCss = css`
    color: #999999;
    white-space: pre-wrap;
    margin-left: 1.25rem;
  `;

  function toggle(e) {
    setIsExpanded(!isExpanded);
    const collapsed = isExpanded;
  }

  const iconCss = css`
    width: 0.75rem;
    margin-left: 0.5rem;
    ${isExpanded && `transform: rotate(180deg);`}
  `;

  return (
    <div className='mb-5'>
      <div css={seriesHeadingCss} onClick={toggle}>
        {name} {canExpand && <IconArrow css={iconCss} />}
      </div>
      {isExpanded && <div css={comprisesCss}>{comprises}</div>}
    </div>
  );
};

export default ChartInfo;
