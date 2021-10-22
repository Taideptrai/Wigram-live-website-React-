import './LongformPage.scss';
import { useEffect, useState } from 'react';
import Chart from 'chart/Chart';
import { gsap } from 'gsap/dist/gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/dist/ScrollToPlugin';
import Banner from 'pages/LongformPage/Banner/Banner';
import LeftNav from 'components/LeftNav/LeftNav';
import SectionNav from 'pages/LongformPage/SectionNav/SectionNav';
import moment from 'moment';

import { ReactComponent as DownArrowIcon } from 'icons/down-arrow.svg';

const LongformPage = ({ article }) => {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

  // Side nav
  const [activeNavItem, setActiveNavItem] = useState(null);
  const [goToSection, setGoToSection] = useState();
  const [currentSection, setCurrentSection] = useState(null);

  // Watch for section to scroll into view
  useEffect(() => {
    // Reset to null (as page might be scrolled down, but we scroll to top programmatically)
    setTimeout(() => {
      setActiveNavItem(null);
    }, 30);

    ['Top', 'Summary', 'Details', 'Chart'].map((idOfElement) => {
      const element = document.getElementById(idOfElement);
      if (element) {
        gsap.to(element, {
          scrollTrigger: {
            trigger: element,
            scroller: document.getElementById('modal-overlay'),
            start: 'top-=100 top', // Move marker 100px above each div section
            end: 'bottom-=100 top',
            onEnter: () => onScrollSectionChange(idOfElement),
            onEnterBack: () => onScrollSectionChange(idOfElement),
            // markers: true,
          },
        });
      }
    });

    // On unmount, kill all scroll triggers
    return () => {
      let triggers = ScrollTrigger.getAll();
      triggers.forEach((trigger) => {
        trigger.kill();
      });
    };
  }, []);

  // On side nav click, scroll to section
  // https://greensock.com/scrolltoplugin/
  useEffect(() => {
    if (goToSection) {
      gsap.to(window, {
        duration: 0.7,
        scrollTo: { y: `#${goToSection}`, offsetY: -10 },
      });
    }
  }, [goToSection]);

  if (!article) return null;

  // When manually scrolling to sections, update side nav
  function onScrollSectionChange(sectionId) {
    if (sectionId === 'Top') {
      setActiveNavItem(null);
    } else {
      setActiveNavItem(sectionId);
    }
  }

  let navItems = ['Summary', 'Details'];
  if (article.charts.length > 0) {
    navItems.push('Chart');
  }

  const jsDate = new Date(article.published_at);
  const date = moment(jsDate).format('DD MMMM YY');
  const tags = article.tags.map((t) => t.name).join(', ');

  // When down arrow is clicked, then scroll to next section
  function goToNextSection() {
    let nextSection = navItems[0];
    if (currentSection) {
      const currentIndex = navItems.findIndex(
        (item) => item === currentSection
      );
      nextSection = navItems[currentIndex + 1];
    }
    if (nextSection) {
      gsap.to(window, {
        duration: 0.7,
        scrollTo: { y: `#${nextSection}`, offsetY: -10 },
      });
    }
  }

  return (
    <>
      <LeftNav showBack='true'></LeftNav>

      <SectionNav
        navItems={navItems}
        inputActiveNav={activeNavItem}
        onNavClick={(sectionId) => setGoToSection(sectionId)}
        className={activeNavItem !== null ? 'fixed' : 'outer-wrapper'}
        outputActiveNav={setCurrentSection}
      />

      <div id='content-wrapper' className='with-side-nav'>
        {/* Banner */}
        <div data-anchor='Banner with-side-nav'>
          <Banner article={article}></Banner>
        </div>

        {/* Next section button shortcut */}
        <div className='btn-next-section' onClick={goToNextSection}>
          <DownArrowIcon />
        </div>

        <div id='Top'></div>
        {/* Summary */}
        <div id='Summary' className='lf-section'>
          <div className='extra-padding'>
            <div className='grid'>
              <div className='grid-left'></div>
              <div className='grid-center'>
                <p>{article?.summary}</p>
              </div>
              <div className='grid-right'>
                <div className='meta-data'>
                  <div className='small-heading'>AUTHOR</div>
                  <div className='text'>{article.author?.name || 'N/A'}</div>
                  <div className='small-heading'>DATE</div>
                  <div className='text'>{date || 'N/A'}</div>
                  <div className='small-heading'>TAGS</div>
                  <div className='text'>{tags}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Details */}
        <div id='Details' className='lf-section grey-bg'>
          <div className='extra-padding'>
            <div className='grid'>
              <p className='grid-center'>{article?.detail}</p>
            </div>
          </div>
        </div>
        {/* Charts */}
        {article.charts.map((chart, i) => (
          <div key={i} id='Chart' className='lf-section'>
            <div className='chart-wrapper'>
              <Chart chart={chart}></Chart>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default LongformPage;
