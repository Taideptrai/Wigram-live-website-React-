/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react/macro';
import Button from 'components/Button/Button';

// TODO: Move to SCSS file
const ThemeSelectorCss = css`
  padding: 1rem;
  background-color: var(--wigram-green-primary);

  h1 {
    color: var(--wigram-grey-0);
    font-size: 24px;
    font-weight: 700;
    margin-top: 14px;
    margin-bottom: 14px;
    cursor: pointer;

    &.disabled {
      cursor: not-allowed;
      color: var(--wigram-green-text-disabled-2);
    }
  }

  position: absolute;
  top: 86px; // TODO: Have wrapper set positioning, not component
  z-index: 1;
  width: 100%;

  .buttons-wrapper {
    display: flex;
    justify-content: flex-end;
  }
`;

const ThemeSelector = ({
  themes,
  currentThemeId, // Exclude the currently selected theme from the selection list
  disabledThemeIds, // Disable all theme that are currently used from the selection list
  onThemeClick,
  onRemoveClick,
}) => {
  // disabledThemeIds contains exactly one themeId for each column, so we can use it to determine
  // the number of columns. This is used to disabled the 'Remove' button if column count is 1.
  const numberOfColumns = disabledThemeIds.length;

  return (
    <div css={ThemeSelectorCss}>
      {themes.map((theme, i) => {
        if (currentThemeId === theme.id) {
          return (
            <h1 key={i} className='disabled'>
              {theme.name}
            </h1>
          );
        } else {
          return (
            <h1 key={i} onClick={() => onThemeClick(theme.id)}>
              {theme.name}
            </h1>
          );
        }
      })}

      <div className='buttons-wrapper'>
        <Button
          type='underlined'
          onClick={onRemoveClick}
          disabled={numberOfColumns === 1}
        >
          Remove
        </Button>
      </div>
    </div>
  );
};

export default ThemeSelector;
