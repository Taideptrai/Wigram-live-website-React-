/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react/macro';

// <Quote>3.5 GDP / Expected current account surplus in 2021</Quote>
const Quote = (props) => {
  // TODO: Move to SCSS file
  const cssQuoteBody = css`
    border-top: 1px solid #4aa842;
    border-bottom: 1px solid #4aa842;
    padding-top: 20px;
    padding-bottom: 20px;
    color: #4aa842;
  `;
  const cssQuoteTitle = css`
    font-size: 2rem;
    color: #4aa842;
  `;

  const inputText = props.children;
  if (!inputText) return null;
  // If input text contains `/`, then we split into titleText and bodyText
  const hasTitle = props.children.includes('/');
  if (!hasTitle) {
    return (
      <div className={props.className}>
        <div css={cssQuoteBody}>{inputText}</div>
      </div>
    );
  } else {
    const [titleText, bodyText] = inputText.split('/');
    return (
      <div className={props.className}>
        <div css={cssQuoteTitle}>{titleText}</div>
        <div css={cssQuoteBody}>{bodyText}</div>
      </div>
    );
  }
};
export default Quote;
