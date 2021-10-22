import './LivePageMobile.scss';
import ArticleCard from 'pages/LivePage/ArticleCard/ArticleCard';

const LivePage = ({ longforms, shortforms, themes, countries }) => {
  return (
    <div className='live-page-mobile'>
      {shortforms.map((a) => {
        return <ArticleCard article={a} />;
      })}
    </div>
  );
};

export default LivePage;
