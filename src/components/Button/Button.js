/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react/macro';

const Button = ({ children, type = 'primary', width, ...otherAttr }) => {
  // TODO: Move to SCSS file
  const buttonCss = css`
    ${type === 'primary' &&
    `color: var(--wigram-grey-0);
     background-color: var(--wigram-green-primary);
      :hover {
        box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.3);
      }
      :focus {
        background-color: var(--wigram-green-0);
        border-color: var(--wigram-green-0);
      }
    `};

    ${type === 'secondary' &&
    `color: var(--wigram-grey-0);
     background-color: white;
     border: 1px solid #666;
      :hover {
        border: 1px solid var(--wigram-grey-0);
        box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.3);
      }
      :focus {
        border: 1px solid var(--wigram-grey-0);
        background-color: #EEEEEE;
      }
    `};

    ${type === 'dark' &&
    `color: white;
     background-color: var(--wigram-grey-0);
     border: var(--wigram-grey-0);
      :hover {
        color: white;
        border: 1px solid var(--wigram-grey-0);
        box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.3);
      }
    `};

    ${type === 'outline' &&
    `color: var(--wigram-grey-0);
     background-color: transparent;
     border-color: var(--wigram-grey-0);
      :hover {
        border-color: var(--wigram-grey-0);
        box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.3);
      }
    `};

    ${type === 'underlined' &&
    `color: var(--wigram-grey-0);
     height: 1.9rem;
     background-color: transparent !important;
     border: 0px;
     border-radius: 0px;
     border-bottom: 2px solid #222;
     padding: 0px !important;
     :hover {
       border-bottom: 2px solid #222;
     }
     :disabled {
        color: var(--wigram-green-text-disabled);
        border-bottom: 2px solid var(--wigram-green-text-disabled);
     }
    `};

    // If contains icon, then reduce right margin
    svg {
      margin-right: -8px;
    }

    padding: 0.5rem 1rem;
    font-size: 0.9rem;
    border-radius: 2px;

    // Full width button
    ${width === 'full' && `width: 100%;`}

    :focus {
      outline: none !important;
      box-shadow: none !important;
    }
  `;

  if (otherAttr.href) {
    return (
      <a className='button' css={buttonCss} {...otherAttr}>
        {children}
      </a>
    );
  } else {
    return (
      <button className='button' css={buttonCss} {...otherAttr}>
        {children}
      </button>
    );
  }
};

export default Button;
