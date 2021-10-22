import './MenuSlideOut.scss';
import { useEffect, useRef, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { Link } from 'react-router-dom';
import { ReactComponent as IconMenu } from 'icons/menu.svg';
import { ReactComponent as IconMenuCollapse } from 'icons/menu-collapse.svg';

function MenuSlideOut(props) {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    if (!showMenu) {
      document.body.style.position = 'fixed';
    } else {
      document.body.style.position = 'static';
    }
    setShowMenu(!showMenu);
  };

  const nodeRef = useRef(null);

  useEffect(() => {
    // When navigating to a new page we need to restore scroll back
    return () => {
      document.body.style.position = 'static';
    };
  }, []);

  const currentPath = window.location.pathname;

  return (
    <>
      <MenuHamburger
        handleOnClick={toggleMenu}
        showMenu={showMenu}
      ></MenuHamburger>

      <CSSTransition
        nodeRef={nodeRef}
        in={showMenu}
        timeout={1000}
        classNames='menu-page'
      >
        <div ref={nodeRef} className='menu-page'>
          <div className='section full-height'>
            <div className='container full-height'>
              <div className='columns full-height'>
                <div className='column is-half is-offset-half links-container'>
                  <Link to={`/`}>
                    {currentPath === '/' && (
                      <h1 className='large-link active'>Live</h1>
                    )}
                    {currentPath !== '/' && (
                      <h1 className='large-link'>Live</h1>
                    )}
                  </Link>
                  <Link to={`/longforms`}>
                    {currentPath === '/longforms' && (
                      <h1 className='large-link active'>Long Reads</h1>
                    )}
                    {currentPath !== '/longforms' && (
                      <h1 className='large-link'>Long Reads</h1>
                    )}
                  </Link>
                  <Link to={`/country-packs`}>
                    {currentPath === '/country-packs' && (
                      <h1 className='large-link active'>Country Packs</h1>
                    )}
                    {currentPath !== '/country-packs' && (
                      <h1 className='large-link'>Country Packs</h1>
                    )}
                  </Link>
                  <Link to={`/profile`}>
                    {currentPath === '/profile' && (
                      <h1 className='large-link active'>Profile</h1>
                    )}
                    {currentPath !== '/profile' && (
                      <h1 className='large-link'>Profile</h1>
                    )}
                  </Link>

                  <div className='small-links'>
                    <div className='columns'>
                      <div className='column'>
                        <div>Contact us</div>
                        <div>Report bug</div>
                        <Link to={`/legals`}>
                          {currentPath === '/legals' && (
                            <div className='active'>Legals</div>
                          )}
                          {currentPath !== '/legals' && <div>Legals</div>}
                        </Link>
                      </div>
                      {/*<div className='column'>*/}
                      {/*  <div>Contact us</div>*/}
                      {/*  <div>Report bug</div>*/}
                      {/*</div>*/}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CSSTransition>
    </>
  );
}

function MenuHamburger({ handleOnClick, showMenu }) {
  return (
    <div className='menu-hamburger' onClick={handleOnClick}>
      {!showMenu && <IconMenu></IconMenu>}
      {showMenu && <IconMenuCollapse></IconMenuCollapse>}
    </div>
  );
}

export default MenuSlideOut;
