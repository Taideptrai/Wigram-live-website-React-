import './LeftNav.scss';
import MenuSlideOut from 'components/MenuSlideOut/MenuSlideOut';
import { useHistory } from 'react-router-dom';
import { ReactComponent as LeftChevron } from 'icons/left-chevron.svg';
import { ReactComponent as LeftChevronWhite } from 'icons/left-chevron-white.svg';
import { ReactComponent as AudioIcon } from 'icons/audio.svg';
import { ReactComponent as AudioIconWhite } from 'icons/audio-white.svg';
import { ReactComponent as PrintIcon } from 'icons/print.svg';
import { ReactComponent as PrintIconWhite } from 'icons/print-white.svg';
import { ReactComponent as DownloadIcon } from 'icons/download.svg';
import { ReactComponent as DownloadIconWhite } from 'icons/download-white.svg';

const LeftNav = ({ children, showMenu, showBack, isDark = false }) => {
  let history = useHistory();

  if (isDark) {
    document.documentElement.style.setProperty(
      '--side-nav-background-color',
      'var(--wigram-blue-1)'
    );
  } else {
    document.documentElement.style.setProperty(
      '--side-nav-background-color',
      '#dddcd8'
    );
  }
  const [leftChevron, audioIcon, printIcon, downloadIcon] = isDark
    ? [
        <LeftChevronWhite />,
        <AudioIconWhite />,
        <PrintIconWhite onClick={() => window.print()} />,
        <DownloadIconWhite />,
      ]
    : [
        <LeftChevron />,
        <AudioIcon />,
        <PrintIcon onClick={() => window.print()} />,
        <DownloadIcon />,
      ];

  function goBack() {
    // If the user opens a page from a shared link, then there is no page history
    const canGoBack = !!history.location.key;
    if (canGoBack) {
      history.goBack();
    } else {
      history.push('/');
    }
  }

  return (
    <>
      {showMenu && <MenuSlideOut />}
      <div className='left-nav'>
        {showBack && (
          <div className='back-icon' onClick={goBack}>
            {leftChevron}
          </div>
        )}
        {children}

        {showBack && (
          <div className='icon-set'>
            {/*{audioIcon}*/}
            {printIcon}
            {downloadIcon}
          </div>
        )}
      </div>
    </>
  );
};

export default LeftNav;
