import React from "react";
import Card from "./Card";

const accommodations = [
    {
        id: 1,
        name: "제주",
        period: "12월 4일~6일",
        price: 350,
        score: 4.92,
        img: "https://a0.muscache.com/im/pictures/BnbProperty/BnbProperty-1793243510391859560/original/c3976a70-9e5e-44fc-967b-bd6ead6abda3.jpeg"
    },
    {
        id: 2,
        name: "서울",
        period: "11월 4일~6일",
        price: 350,
        score: 4.92,
        img: "https://a0.muscache.com/im/pictures/BnbProperty/BnbProperty-1793243510391859560/original/c3976a70-9e5e-44fc-967b-bd6ead6abda3.jpeg"
    },
    {
        id: 3,
        name: "부산",
        period: "10월 4일~6일",
        price: 350,
        score: 4.92,
        img: "https://a0.muscache.com/im/pictures/BnbProperty/BnbProperty-1793243510391859560/original/c3976a70-9e5e-44fc-967b-bd6ead6abda3.jpeg"
    },
    {
        id: 4,
        name: "광주",
        period: "9월 4일~6일",
        price: 350,
        score: 4.92,
        img: "https://a0.muscache.com/im/pictures/BnbProperty/BnbProperty-1793243510391859560/original/c3976a70-9e5e-44fc-967b-bd6ead6abda3.jpeg"
    },
    {
        id: 5,
        name: "대구",
        period: "8월 4일~6일",
        price: 350,
        score: 4.92,
        img: "https://a0.muscache.com/im/pictures/BnbProperty/BnbProperty-1793243510391859560/original/c3976a70-9e5e-44fc-967b-bd6ead6abda3.jpeg"
    },
];

function ProfileCard(props) {
    return (
        <div className="Card-Container">
            {accommodations.map((accommodation) => (
                <Card key={accommodation.id} imgsrc={accommodation.img}>
                    <div className="Card-info">
                        <p>{accommodation.name}의 펜션</p>
                        <p>{accommodation.period}</p>
                        <p>${accommodation.price} / ★ {accommodation.score}</p>
                    </div>
                </Card>
            ))}
        </div>
    );
}

export default ProfileCard;