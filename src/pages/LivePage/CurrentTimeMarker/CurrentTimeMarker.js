/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react/macro';

const CurrentTimeMarker = () => {
  const now = new Date();
  const formattedTime = `${now.getHours()}:${now
    .getMinutes()
    .toString()
    .padStart(2, '0')} AEST`;

  // TODO: Move to SCSS file
  const sCss = css`
    grid-column: 1/12;
    display: flex;
    position: relative;
    .time {
      color: #222222;
      font-size: 0.8rem;
      line-height: 24px;
      position: absolute;
      padding-left: 1rem;
      height: 24px;
      top: -12px;
      width: 100px;
      background-color: var(--wigram-green-primary);
    }
    .line {
      border-top: 1px solid var(--wigram-green-primary);
      height: 2px;
      flex-basis: 100%;
    }
  `;
  return (
    <div css={sCss}>
      {/* Disabled current time, for now */}
      {/* <div className='time'>{formattedTime}</div> */}
      <div className='line'></div>
    </div>
  );
};

export default CurrentTimeMarker;
