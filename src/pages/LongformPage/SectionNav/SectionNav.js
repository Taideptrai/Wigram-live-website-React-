import { useEffect, useState } from 'react';
import './SectionNav.scss';

const SectionNav = ({
  navItems,
  inputActiveNav,
  onNavClick,
  outputActiveNav,
  ...rest
}) => {
  const [activeNav, setActiveNav] = useState(inputActiveNav);
  const [ignoreInputActiveNav, setIgnoreInputActiveNav] = useState(false);
  useEffect(() => {
    if (!ignoreInputActiveNav) {
      setActiveNav(inputActiveNav);
    }
    if (outputActiveNav) outputActiveNav(inputActiveNav);
  }, [inputActiveNav]);

  function navClick(navText) {
    // Ignore inputs from scroll position when users clicks nav
    setIgnoreInputActiveNav(true);
    setTimeout(() => {
      setIgnoreInputActiveNav(false);
    }, 1500);
    onNavClick(navText);
    setActiveNav(navText);
  }

  return (
    <div {...rest}>
      <div className='wrapper'>
        {navItems?.map((item) => {
          const isActive = activeNav === item;
          return (
            <div
              key={item}
              className={isActive ? 'active' : ''}
              onClick={() => navClick(item)}
            >
              {item}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SectionNav;
