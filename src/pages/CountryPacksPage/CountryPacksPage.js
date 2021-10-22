import './CountryPacksPage.scss';
import Button from 'components/Button/Button';
import { ReactComponent as IconRight } from './../../icons/right.svg';
import { optimisedImageUrl } from '../../Utility';
import LeftNav from 'components/LeftNav/LeftNav';

function CountryPacksPage({ countryPacks }) {
  return (
    <div>
      <LeftNav showMenu='true'></LeftNav>
      <div className='country-packs-page with-side-nav'>
        <div className='section'>
          <div className='container'>
            <div className='columns'>
              <div className='column'>
                <h1 className='mb-4'>Country Packs</h1>
              </div>
            </div>
            <Rows countryPacks={countryPacks}></Rows>
          </div>
        </div>
      </div>
    </div>
  );
}

function Rows({ countryPacks }) {
  const listOfCountries = [...countryPacks];
  let rows = [];
  let key = 0;
  while (listOfCountries.length > 0) {
    const rowData = listOfCountries.splice(0, 3);
    rows.push(<Row countryPacks={rowData} key={key}></Row>);
    key += 1;
  }
  return rows;
}

function Row({ countryPacks }) {
  return (
    <div className='columns'>
      <div className='column'>
        <CountryCard countryPack={countryPacks[0]}></CountryCard>
      </div>
      <div className='column'>
        <CountryCard countryPack={countryPacks[1]}></CountryCard>
      </div>
      <div className='column'>
        <CountryCard countryPack={countryPacks[2]}></CountryCard>
      </div>
    </div>
  );
}

function CountryCard({ countryPack }) {
  if (!countryPack) return null;
  const imageUrl = optimisedImageUrl(countryPack.image, 'tr:w-816,h-612');

  return (
    <div className='card'>
      <div className='card-image'>
        <figure className='image is-4by3'>
          <img src={imageUrl} />
        </figure>
      </div>
      <div className='card-content p-4'>
        <div className='country-name'>{countryPack.country}</div>
        <div>
          <Button type='secondary' disabled={!countryPack.presentation}>
            View Pack <IconRight />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CountryPacksPage;
