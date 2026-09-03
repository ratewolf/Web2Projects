import React, { useEffect, useState } from "react";

function Book({ name, numOfPage, imgUrl, category = "도서", year, tags = [], onTagClick }) {
    const [imageFailed, setImageFailed] = useState(false);

    useEffect(() => {
        setImageFailed(false);
    }, [imgUrl]);

    return (
        <article className="book-card">
            <div className="book-cover-wrap">
                {imgUrl && !imageFailed ? (
                    <img
                        src={imgUrl}
                        alt={`${name} 표지`}
                        className="book-cover"
                        loading="lazy"
                        decoding="async"
                        onError={() => setImageFailed(true)}
                    />
                ) : (
                    <div className="book-cover-fallback" role="img" aria-label={`${name} 표지 없음`}>
                        <span aria-hidden="true">▤</span>
                        <strong>{name}</strong>
                        <small>표지 준비 중</small>
                    </div>
                )}
            </div>
            <div className="book-details">
                <div className="book-meta">
                    <span className="book-category">{category}</span>
                    <span>{year ?? "연도 미등록"}</span>
                </div>
                <h3 className="book-title">{name}</h3>
                <p className="book-pages">총 {numOfPage.toLocaleString("ko-KR")}페이지</p>
                {tags.length > 0 && (
                    <div className="book-tags" aria-label={`${name} 태그`}>
                        {tags.map((tag) => onTagClick ? (
                            <button type="button" className="otapia-tag" key={tag} onClick={() => onTagClick(tag)}>
                                #{tag}
                            </button>
                        ) : <span className="otapia-tag" key={tag}>#{tag}</span>)}
                    </div>
                )}
            </div>
        </article>
    );
}

export default Book;