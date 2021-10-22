import './global.scss';
import { useEffect, useState } from 'react';
import { fetchAPI } from './lib/api';
import { withAuthenticator } from '@aws-amplify/ui-react';
import { Auth } from 'aws-amplify';
import { ActiveCardContext } from './ActiveCardContext';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useParams,
} from 'react-router-dom';
import PlotlyChart from './chart/PlotlyChart';
import ScrollToTop from 'components/ScrollToTop';

// pages
import CountryPacksPage from 'pages/CountryPacksPage/CountryPacksPage';
import ProfilePage from 'pages/ProfilePage/ProfilePage';
import LivePage from 'pages/LivePage/LivePage';
import LongformListPage from './pages/LongformListPage/LongformListPage';
import ShortformPage from 'pages/ShortformPage/ShortformPage';
import LongformPage from 'pages/LongformPage/LongformPage';
import LegalsPage from 'pages/LegalsPage/LegalsPage';
import ClearStorage from './pages/ClearStorage';
import LivePageMobile from 'pages/LivePage/LivePageMobile';
import LongformPageMobile from 'pages/LongformPage/LongformPageMobile';
import ShortformPageMobile from 'pages/ShortformPage/ShortformPageMobile';

function App() {
  // Auth
  const [user, setUser] = useState();
  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then((user) => {
        console.log('User: ', user);
        setUser(user);
      })
      .catch((err) => setUser(null));
  }, []);

  // Data setup
  const [data, setData] = useState({
    isLoading: true,
    isError: false,
    longforms: [],
    shortforms: [],
    themes: [],
    countries: [],
    countryPacks: [],
  });
  useEffect(() => {
    async function fetchMyAPI() {
      // Requests only return return published entries by default
      const [longforms, shortforms, themes, countries, countryPacks] =
        await Promise.all([
          fetchAPI('/longforms'),
          fetchAPI('/shortforms'),
          fetchAPI('/tags'), // TODO: Rename to themes
          fetchAPI('/countries'),
          fetchAPI('/country-packs'),
        ]);

      // We are unable to set the display order of collections such as 'tags'.
      // To get around this we have defined individual fields in strapi, such as tag_1, tag_2 etc.
      // We then build up a `tags` collection from these individual fields, and drop them from the object.
      const alteredShortforms = shortforms.map((sf) => {
        const newShortform = { ...sf };
        newShortform.tags = [];
        if (sf.tag_1) newShortform.tags.push(sf.tag_1);
        if (sf.tag_2) newShortform.tags.push(sf.tag_2);
        if (sf.tag_3) newShortform.tags.push(sf.tag_3);
        if (sf.tag_4) newShortform.tags.push(sf.tag_4);
        delete newShortform.tag_1;
        delete newShortform.tag_2;
        delete newShortform.tag_3;
        delete newShortform.tag_4;
        return newShortform;
      });

      const alteredLongforms = longforms.map((lf) => {
        const newLongform = { ...lf };
        newLongform.tags = [];
        if (lf.tag_1) newLongform.tags.push(lf.tag_1);
        if (lf.tag_2) newLongform.tags.push(lf.tag_2);
        if (lf.tag_3) newLongform.tags.push(lf.tag_3);
        if (lf.tag_4) newLongform.tags.push(lf.tag_4);
        delete newLongform.tag_1;
        delete newLongform.tag_2;
        delete newLongform.tag_3;
        delete newLongform.tag_4;
        return newLongform;
      });

      setData({
        isLoading: false,
        longforms: alteredLongforms,
        shortforms: alteredShortforms,
        themes,
        countries,
        countryPacks,
      });
      // console.log(longforms, shortforms, themes, countries);
    }

    fetchMyAPI();
  }, []);

  const LongformPageWrapper = () => {
    let { slug } = useParams();
    return (
      <LongformPage article={data.longforms.find((a) => a.slug === slug)} />
    );
  };

  const LongformPageMobileWrapper = () => {
    let { slug } = useParams();
    return (
      <LongformPageMobile
        article={data.longforms.find((a) => a.slug === slug)}
      />
    );
  };

  const ShortformPageWrapper = () => {
    let { slug } = useParams();
    return (
      <ShortformPage article={data.shortforms.find((a) => a.slug === slug)} />
    );
  };

  const ShortformPageMobileWrapper = () => {
    let { slug } = useParams();
    return (
      <ShortformPageMobile
        article={data.shortforms.find((a) => a.slug === slug)}
      />
    );
  };

  const [activeCard, setActiveCard] = useState({
    id: null,
    element: null,
    elementId: null,
    initialScale: 1,
    show: false,
    offsetFromTop: 0,
  });

  // Debug Info
  // useEffect(() => {
  //   console.log(activeCard);
  // }, [activeCard]);

  if (data.isLoading) return 'loading...';
  return (
    <div className='App'>
      <ActiveCardContext.Provider value={{ activeCard, setActiveCard }}>
        <Router>
          <Switch>
            <Route exact path='/profile'>
              <ScrollToTop>
                <ProfilePage user={user} />
              </ScrollToTop>
            </Route>
            <Route exact path='/shortform/:slug'>
              <ScrollToTop>
                <ShortformPageWrapper />
              </ScrollToTop>
            </Route>
            <Route exact path='/legals'>
              <LegalsPage />
            </Route>
            <Route exact path='/country-packs'>
              <CountryPacksPage countryPacks={data.countryPacks} />
            </Route>
            <Route exact path='/longforms'>
              <LongformListPage {...data} longforms={data.longforms} />
            </Route>
            <Route exact path='/longform/:slug'>
              <ScrollToTop>
                <LongformPageWrapper />
              </ScrollToTop>
            </Route>
            <Route path='/clear'>
              <ClearStorage />
            </Route>
            {/* Mobile Routes */}
            <Route path='/m/longform/:slug'>
              <ScrollToTop>
                <LongformPageMobileWrapper />
              </ScrollToTop>
            </Route>
            <Route exact path='/m/shortform/:slug'>
              <ScrollToTop>
                <ShortformPageMobileWrapper />
              </ScrollToTop>
            </Route>
            <Route path='/m'>
              <LivePageMobile {...data}></LivePageMobile>
            </Route>
            <Route
              exact
              path='/charts/:id'
              render={(props) => <PlotlyChart id={props.match.params.id} />}
            />
            {/* Most general routes last */}
            <Route path='/'>
              <LivePage {...data}></LivePage>
            </Route>
          </Switch>
        </Router>
      </ActiveCardContext.Provider>
    </div>
  );
}

export default withAuthenticator(App, { usernameAlias: 'email' });
