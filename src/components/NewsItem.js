import React, { Component } from "react";

const NewsItem =(props)=> {


    let { title, description, imageurl, newsUrl, author, date, source } = props;

    return (

      <div>

        <div className="my-3 ">
          <div className="card" style={{ width: "18rem" }}>
            <div style={{ display: 'flex', justifyContent: 'flex-end', position: "absolute", right: 0 }}>    <span className="badge rounded-pill bg-success" >
              {source}
            </span></div>
            <img
              src={
                !imageurl
                  ? "https://cdn.sanity.io/images/s3y3vcno/production/6c09084b4f651cc82270be4f48dd2ca66447e339-3365x2813.jpg?auto=format"
                  : imageurl
              }
              className="card-img-top"
              alt="News"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://via.placeholder.com/400x200?text=Image+Unavailable";
              }}
              style={{ height: '200px', objectFit: 'cover' }}
            />
            <div className="card-body">
              <h5 className="card-title">{title} </h5>
              <p className="card-text">
                <small className="text-muted">
                  By {!author ? "Unknown" : author} on {new Date(date).toGMTString()}
                </small>
              </p>            <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sn btn-dark">Read More</a>
            </div>

          </div>
        </div></div>
    );
  }


export default NewsItem;
