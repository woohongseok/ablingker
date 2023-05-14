import styled, { DefaultTheme, StyledComponent } from 'styled-components'
import { HelperStyle } from "../css/helperStyle";
import React, { useEffect,useState, useRef } from 'react';
import useFetch from '../hooks/useFetch';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

export default function Helper(){
    const [point, setPoint] = useState("50000");
    var isMatching:boolean = Boolean(useFetch("유저의 매칭 상태"));
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const isLoggedIn = Cookies.get('number') !== undefined;
    const userID = Cookies.get('number')
    const helperList = useFetch("도와준 사람 목록 가져올 주소")
    const [ishelperLoad, setishelperLoad] = useState(true);

    // if(!isLoggedIn){
    //     alert("로그인을 해주십시오!");
    //     window.location.href = '/login'
    // }

    function setBtn() {
        const btns = document.getElementsByClassName("btn") as HTMLCollectionOf<HTMLElement>;
        if(!isLoading){
            fetch(`유저의 매칭 상태를 서버로 전송하기`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userID : isMatching,
                  }),
            }).then(res => {
                if(res.ok){
                    isMatching = !(isMatching)
                    setIsLoading(false);
                }
            });
        }for (let i = 0; i < btns.length; i++) {
          if (isMatching) {
            btns[i].style.backgroundColor = "lightgray";
          } else {
            btns[i].style.backgroundColor = "#4CAF50";
          }
        }
      }
      

    return(
        <HelperStyle>
            <div>
                <div className="topNav">
                    <div className="balance">
                        <p>{point} point</p>
                    </div>
                    <div className="buttonWrapper">
                        <button className="btn" style={{
                            opacity: isLoading? 0.3:1,
                        }} onClick={setBtn}>{isLoading ? isMatching ? "on" : "off" : "불러오는중..."}</button>
                        <p className="status">현재 매칭 상태는 {isMatching ? "on":"off"}입니다.</p>
                    </div>
                </div>
                
                <div className = "items">
                {helperList.length === 0 && <span className="loading">현재 도와준 사람이 없습니다...</span>}
                    {
                    Object.keys(helperList).map((key) => {
                        const index = Number(key);
                        const helper = helperList[index] as unknown as { id: number, matchingTime: string, requiredTime: number, startingPoint: string, destination: string };
                        return (
                        <div className="item" key={helper.id}>
                            <p className="num">{helper.id}</p>
                            <div className="time">
                            <p>매칭시각:{helper.matchingTime}</p>
                            <p>소요시간:{helper.requiredTime}분</p>
                            </div>
                            <div className="location">
                            <p>출발지:{helper.startingPoint}</p>
                            <p>도착지:{helper.destination}</p>
                            </div>
                        </div>
                        );
                    })}
                </div>
            </div>
        </HelperStyle>
    );
}