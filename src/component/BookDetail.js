import React from "react";
import PropTypes from "prop-types";
import "../css/BookDetail.css";

const BookDetail = ({ location }) => {
  return (
    <div className="book-detail">
      <img
        src={location.state.image}
        className="book-detail__photo"
        alt={location.state.title}
      />
      <div className="book-detail__info">
        <h2>{location.state.title}</h2>
        {/* <h4 className="bookinfo__author">{location.state.authors} </h4> */}
        <div>
          {location.state.author.map(who => (
            <h4 className="bookinfo__author">저자 : {who} </h4>
          ))}
          <h4>출판사 : {location.state.publisher}</h4>
          <h4>
            출판년도 :{location.state.publishedAt.slice(0, 4)}년
            {location.state.publishedAt.slice(5, 7)}월
          </h4>
          <h4>표준부호(ISBN) : {location.state.isbn}</h4>
          <h4 className="donators">기부자 : tkim 등 등 </h4>
        </div>
        <h4>
          {location.state.publisher} | {location.state.publishedAt}
        </h4>
      </div>
    </div>
  );
};

BookDetail.propTypes = {
  location: PropTypes.shape({
    // eslint-disable-next-line react/forbid-prop-types
    state: PropTypes.object.isRequired,
  }).isRequired,
};

export default BookDetail;
