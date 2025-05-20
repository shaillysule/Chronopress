import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const capitalizeFirstLetter = (val) => {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
  };

  const updateNews = async () => {
    props.setProgress(10);
    setLoading(true);
    const { country, pageSize, query, category, apiKey } = props;

    const url = query
      ? `https://newsapi.org/v2/everything?q=${query}&apiKey=${apiKey}&page=${page}&pageSize=${pageSize}`
      : `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&page=${page}&pageSize=${pageSize}`;

    try {
      const data = await fetch(url);
      props.setProgress(30);
      const parsedData = await data.json();
      props.setProgress(70);

      setArticles(parsedData.articles || []);
      setTotalResults(parsedData.totalResults || 0);
      setLoading(false);
      props.setProgress(100);
    } catch (error) {
      console.error("Failed to fetch news:", error);
      setLoading(false);
      props.setProgress(100);
    }
  };

  useEffect(() => {
    updateNews();
    // eslint-disable-next-line
  }, []);

  const fetchMoreData = async () => {
    const nextPage = page + 1;
    const { country, pageSize, query, category, apiKey } = props;

    const url = query
      ? `https://newsapi.org/v2/everything?q=${query}&apiKey=${apiKey}&page=${nextPage}&pageSize=${pageSize}`
      : `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&page=${nextPage}&pageSize=${pageSize}`;

    try {
      const response = await fetch(url);
      const parsedData = await response.json();

      setArticles((prevArticles) => [
        ...prevArticles,
        ...(parsedData.articles || []),
      ]);
      setTotalResults(parsedData.totalResults || 0);
      setPage(nextPage);
    } catch (error) {
      console.error("Failed to fetch more data:", error);
    }
  };

  return (
    <div className="container my-3 bg-white">
      <h2 className="text-center text-dark" >
        ChronoPress Top {capitalizeFirstLetter(props.category)} Headlines
      </h2>

      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length < totalResults}
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row">
            {articles
              .filter((article) => article.urlToImage)
              .map((element, index) => (
                <div className="col-md-4" key={index}>
                  <NewsItem
                    title={
                      element.title ? element.title.slice(0, 30) : "No Title"
                    }
                    description={
                      element.description
                        ? element.description.slice(0, 88)
                        : "No Description"
                    }
                    imageurl={element.urlToImage}
                    newsUrl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              ))}
          </div>
        </div>
      </InfiniteScroll>
    </div>
  );
};

// Default props
News.defaultProps = {
  country: "us",
  pageSize: 8,
  category: "general",
};

// PropTypes validation
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
  apiKey: PropTypes.string.isRequired,
  setProgress: PropTypes.func.isRequired,
};

export default News;
