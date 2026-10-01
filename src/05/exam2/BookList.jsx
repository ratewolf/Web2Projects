import React from "react";
import Book from "./Book";
import "./BookList.css";

// 데이터 배열
const books = [
    {
        title: "위대한 개츠비",
        author: "F.스콧 피츠제럴드",
        coverImage: "https://image.yes24.com/goods/370331/XL",
    },
    {
        title: "페스트",
        author: "알베르 까뮈",
        coverImage: "https://image.yes24.com/goods/4827619/XL",
    },
    {
        title: "오만과 편견",
        author: "제인 오스틴",
        coverImage: "https://image.yes24.com/goods/402246/XL",
    },
    {
        title: "데미안",
        author: "헤르만 헤세",
        coverImage: "https://image.yes24.com/goods/176787/XL",
    },
    {
        title: "1984",
        author: "조지 오웰",
        coverImage: "https://image.yes24.com/goods/372300/XL",
    },
    {
        title: "동물농장",
        author: "조지 오웰",
        coverImage: "https://image.yes24.com/goods/17352/XL",
    },
    {
        title: "노인과 바다",
        author: "어니스트 헤밍웨이",
        coverImage: "https://image.yes24.com/goods/6157159/XL",
    },
    {
        title: "죄와 벌",
        author: "표도르 도스토옙스키",
        coverImage: "https://image.yes24.com/goods/6712992/XL",
    },
];

function BookList() {
    return (
        <div className={"bookListWrapper"}>
            {books.map((book, index) => {
                return (
                    <Book
                        key={index}
                        title={book.title}
                        author={book.author}
                        coverImage={book.coverImage}
                    />
                );
            })}
        </div>
    );
}

export default BookList;