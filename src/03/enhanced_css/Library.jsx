import React from "react";
import Book from "./Book"


function Library() {
    return(
        <div>
            <Book name="처음 만난 Java" numOfPage={300} imgUrl={"https://image.aladin.co.kr/product/17119/64/cover500/8966262287_1.jpg"}/>
            <Book name="난생처음 자바 프로그래밍" numOfPage={200} imgUrl={"https://image.aladin.co.kr/product/31968/88/cover500/k862834165_1.jpg"}/>
            <Book name="처음 만난 React" numOfPage={500} imgUrl={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdxmBDHLsQ6a3ccyqNgdNlSEelRYg_O0zV52ZZ-2CgHA&s=10"}/>
            <Book name="이펙티브 자바" numOfPage={250} imgUrl={"https://image.aladin.co.kr/product/17119/64/cover500/8966262287_1.jpg"}/>
            <Book name="Java의 정석" numOfPage={600} imgUrl={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRssom7voJcuPteCxqOqlpbWqJd5ykbJkmAdmM44H-w8w&s=10"}/>
            <Book name="스프링 부트 4 개발자 되기" numOfPage={300} imgUrl={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOH0YZNR2HnSLBXi3aHPxvqYiNyZ28e9oFmuShly9aBg&s=10"}/>
            <Book name="혼자 공부하는 자바" numOfPage={400} imgUrl={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUq-g2CXyywK3-I--8cRpXUgniYj9SyQi4szNPQ6KpPQ&s=10"}/>
        </div>

    );

}

export default Library;