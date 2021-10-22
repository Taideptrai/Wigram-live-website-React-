/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react/macro';
import { optimisedImageUrl } from 'Utility';
import styles from './Banner.module.css';

const Banner = ({ article }) => {
  const imageUrl = optimisedImageUrl(article?.image, 'tr:w-1920,h-300,fo-auto');

  const cssBanner = css`
    background-image: url('${imageUrl}'),
      linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.6));
  `;

  const articleCountriesText = article.countries
    ?.map((c) => c.name.toUpperCase())
    .toString();

  return (
    <div className={styles.bannerWrapper} id='banner-wrapper'>
      <div className={styles.content}>
        <div className='header-subtext'>{articleCountriesText}</div>
        <h1>{article?.title}</h1>
        {/*<p className={styles.headerSubtext}>{article?.description}</p>*/}
      </div>
      <div className={styles.banner} css={cssBanner} id='banner-image'></div>
    </div>
  );
};
export default Banner;
