import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 8,
    category: "general",
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
    query: PropTypes.string,
  };
  capitalizeFirstLetter=(val)=> {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0,
    };
    document.title=`${this.capitalizeFirstLetter(this.props.category)}-ChronoPress`
  }

  updateNews = async () => {
    this.props.setProgress(10);
    this.setState({ loading: true });
    const { country, pageSize, query, category } = this.props;
    const { page } = this.state;

    const url = query
      ? `https://newsapi.org/v2/everything?q=${query}&apiKey=${this.props.apiKey}&page=${page}&pageSize=${pageSize}`
      : `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=2733710f31ff4c4c99d81c6d12732a70&page=${page}&pageSize=${pageSize}`;

    let data = await fetch(url);
    this.props.setProgress(30);
    let parsedData = await data.json();
    this.props.setProgress(70);

    this.setState({
      articles: parsedData.articles || [],
      totalResults: parsedData.totalResults || 0,
      loading: false,
    });    this.props.setProgress(100);

  };

  componentDidUpdate(prevProps) {
    if (prevProps.query !== this.props.query || prevProps.category !== this.props.category) {
      this.setState({ page: 1 }, () => this.updateNews());
    }
  }

  componentDidMount() {
    this.updateNews();
  }

  // handleNextClick = async () => {
  //   this.setState(
  //     (prevState) => ({ page: prevState.page + 1 }),
  //     () => this.updateNews()
  //   );
  // };

  // handlePrevClick = async () => {
  //   this.setState(
  //     (prevState) => ({ page: prevState.page - 1 }),
  //     () => this.updateNews()
  //   );
  // };
  fetchMoreData = async () => {
    this.setState(
      (prevState) => ({ page: prevState.page + 1 }),
      async () => {
        this.setState({ loading: true });
        const { country, pageSize, query, category } = this.props;
        const { page } = this.state;
  
        const url = query
          ? `https://newsapi.org/v2/everything?q=${query}&apiKey=${this.props.apiKey}&page=${page}&pageSize=${pageSize}`
          : `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${this.props.apiKey}&page=${page}&pageSize=${pageSize}`;
  
        try {
          const response = await fetch(url);
          const parsedData = await response.json();
  
          this.setState({
            articles: this.state.articles.concat(parsedData.articles || []),
            totalResults: parsedData.totalResults || 0,
            loading: false,
          });
        } catch (error) {
          console.error("Failed to fetch more data:", error);
          this.setState({ loading: false });
        }
      }
    );
  };
  
  
  render() {
    const totalPages = Math.ceil(this.state.totalResults / this.props.pageSize);

    return (
      <div className="container my-3 bg-white">
        <h2 className="text-center text-dark">
          ChronoPress Top {this.props.category} Headlines
        </h2>

        {/* {this.state.loading && <Spinner />} */}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length < this.state.totalResults}

          loader={<Spinner/>}
        >
          <div className="container">
        <div className="row">
          {!this.state.loading &&
            this.state.articles
              .filter((article) => article.urlToImage)
              .map((element, index) => (
                <div className="col-md-4" key={index}>
                  <NewsItem
                    title={element.title ? element.title.slice(0, 30) : " "}
                    description={
                      element.description
                        ? element.description.slice(0, 88)
                        : " "
                    }
                    imageurl={element.urlToImage}
                    newsUrl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              ))}
        </div></div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between my-3"> */} 
          {/* <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-success"
            onClick={this.handlePrevClick}
          >
            &larr; Prev
          </button> */}

          {/* <button
            disabled={this.state.page >= totalPages}
            type="button"
            className="btn btn-danger"
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button> */}
        {/* </div> */}

        {/* {this.state.articles.length === 0 && !this.state.loading && (
          <div className="text-center text-light">No more articles available.</div>
        )} */}
      </div>
    );
  }
}

export default News;
