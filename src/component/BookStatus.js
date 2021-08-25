import React from "react";
import "../css/BookStatus.css";

const BookStatus = () => {
  return (
    <div className="book-status">
      <table className="book-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>청구기호</th>
            <th>도서 상태</th>
            <th>반납예정일</th>
            <th>예약</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>4373</th>
            <th>가.123</th>
            <th>대출 가능</th>
            <th>-</th>
            <th>예약</th>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default BookStatus;
