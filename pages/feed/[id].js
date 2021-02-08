import React from 'react';
import Toolbar from '../../components/Toolbar';
import { useRouter } from 'next/router';
import styles from '../../styles/Feed.module.css';

export const getServerSideProps = async context => {
  const pageNumber = context.query.id;

  if (!pageNumber || pageNumber < 1 || pageNumber > 5) {
    return {
      props: {
        articles: [],
        pageNumber: 1
      }
    };
  }

  const apiResponse = await fetch(
    `https://newsapi.org/v2/top-headlines?country=us&pageSize=5&page=${pageNumber}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_NEWS_KEY}`
      }
    }
  );

  const apiJson = await apiResponse.json();
  const { articles } = apiJson;

  return {
    props: {
      pageNumber: Number(pageNumber),
      articles
    }
  };
};

const Feed = ({ pageNumber, articles }) => {
  const router = useRouter();

  return (
    <div className='page-container'>
      <Toolbar />
      <div className={styles.main}>
        {articles.map((article, idx) => (
          <div key={idx} className={styles.post}>
            <h1>
              <a href={article.url} target='_blank'>
                {article.title}
              </a>
            </h1>
            <p>{article.description}</p>
            {article.urlToImage && (
              <img src={article.urlToImage} alt={article.title} />
            )}
          </div>
        ))}
      </div>

      <div className={styles.paginator}>
        <div
          onClick={() => {
            if (pageNumber > 1) {
              router.push(`/feed/${pageNumber - 1}`);
            }
          }}
          className={pageNumber === 1 ? styles.disabled : styles.active}
        >
          Previous Page
        </div>

        <div>Page #{pageNumber}</div>

        <div
          onClick={() => {
            if (pageNumber < 5) {
              router.push(`/feed/${pageNumber + 1}`);
            }
          }}
          className={pageNumber === 5 ? styles.disabled : styles.active}
        >
          Next Page
        </div>
      </div>
    </div>
  );
};

export default Feed;
