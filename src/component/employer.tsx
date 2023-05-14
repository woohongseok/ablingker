import styled, { DefaultTheme, StyledComponent } from 'styled-components'
import { EmployerStyle } from '../css/employerStyle';
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { time } from 'console';
import store from '../redux/store';
import { Provider,useSelector,useDispatch } from 'react-redux';
import useFetch from '../hooks/useFetch';



export default function Employer(props:any){
const [point, setPoint] = useState(50000);
const [isRoundTrip, setIsRoundTrip] = useState(false);
const [howMove, setHowMove] = useState("");
const [howHelp, setHowHelp] = useState("");
const [detailContent, setDetailContent] = useState("");
const navigate = useNavigate();
const location = useLocation();
const a = useFetch(`http://localhost:8080/api/user`)

const GoPos = {
    GoPosX:location.state?.GoPosX,
    GoPosY:location.state?.GoPosY
}
const ArrivePos = {
    ArrivePosX:location.state?.ArrivePosX,
    ArrivePosY:location.state?.ArrivePosY
}

function pageMove(event: React.MouseEvent<HTMLButtonElement>){
    const buttonId = event.currentTarget.id;
    const result = false;

    if(buttonId === 'go'){
        navigate('/go',{state:{
            isExecution:false,
        }});
    } else if (buttonId === 'arrive'){
        navigate('/arrive', {state:{
            GoPosX:location.state?.GoPosX,
            GoPosY:location.state?.GoPosY,
            GoPosPlace:location.state?.GoPosPlace,
            isExecution:true,
        }});
    } else if (buttonId === 'timeSet'){
        navigate('/timeSet', {state:{
            GoPosX : location.state.GoPosX,
            GoPosY : location.state.GoPosY,
            ArrivePosX : location.state.ArrivePosX,
            ArrivePosY : location.state.ArrivePosY,
            GoPosPlace : location.state.GoPosPlace,
            ArrivePosPlace : location.state.ArrivePosPlace
        }})
    } else if (buttonId === 'startMatching'){
        navigate('/employerMatching', {state:{
            isRoundTrip : isRoundTrip,
            howMove : howMove,
            howHelp : howHelp,
            detailContent : detailContent,
            GoPosPlace : location.state.GoPosPlace,
            ArrivePosPlace : location.state.ArrivePosPlace,
            hour : location.state.hour,
            minute : location.state.minute,
            today : location.state.today
        }});

        if (
            location.state?.GoPosPlace === undefined 
            && location.state?.ArrivePosPlace === undefined 
            && location.state?.hour === undefined 
            ){
                alert("출발지 또는 도착지 또는 시간을 지정하지 않으셨습니다.")
        } else if (howMove === ""){
            setHowMove("walk")
        } else if (howHelp === ""){
            setHowHelp("simple-movement")
        }
        else{
            const result = window.confirm(
                `왕복/편도 : ${isRoundTrip?"왕복":"편도"}
                이동수단 : ${howMove === 'walk'?"도보":howMove ==='public'?"대중교통":"택시"}
                지원내용 : ${howHelp === 'simple-movement'?"단순이동":howHelp === 'housework-support'?"가사보조":"외출지원"}
                요청사항 : ${detailContent}
                출발지 : ${location.state?.GoPosPlace}
                도착지 : ${location.state?.ArrivePosPlace}
                ${location.state?.hour} 시 ${location.state?.minute}분 ${location.state?.today}
                위 내용이 맞습니까?
                `   
            )
            if(result){
                fetch(`장애인분들이 보내신 매칭 정보 서버로`,{
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        trip:isRoundTrip,
                        move:howMove,
                        help:howHelp,
                        detail:detailContent,
                        GoPos: GoPos,
                        ArrivePos: ArrivePos,
                    }),
                }).then(res => {
                    if (res.ok){
                        alert("매칭요청이 성공적으로 되었습니다.")
                        navigate('employerMatching', {state:{
                            isRoundTrip : isRoundTrip,
                            howMove : howMove,
                            howHelp : howHelp,
                            detailContent : detailContent,
                            GoPosPlace : location.state.GoPosPlace,
                            ArrivePosPlace : location.state.ArrivePosPlace,
                            hour : location.state.hour,
                            minute : location.state.minute,
                            today : location.state.today
                        }})
                    }
                }).catch(error => {
                    if(error){
                        alert("요청에 실패했습니다! 다시한번 시도 해 보십시오.")
                    }
                })
            } else {
                window.alert("다시 입력하여 주십시오.")
            }
        }
        
    }
}
function roundTrip(event: React.MouseEvent<HTMLSelectElement>){
    const target = event.target as HTMLOptionElement;
    const value = target.value;
    if(value === 'one-way'){
        setIsRoundTrip(false);
    }else{
        setIsRoundTrip(true);
    }
}
function vehicle(event: React.MouseEvent<HTMLSelectElement>) {
    const target = event.target as HTMLOptionElement;
    const value = target.value;
    if(value === 'walk'){
        setHowMove('');
        setHowMove('walk');
    } else if(value === 'public'){
        setHowMove('');
        setHowMove('public');
    } else{
        setHowMove('');
        setHowMove('taxi');
    }
}
function helpF(event: React.MouseEvent<HTMLSelectElement>){
    const target = event.target as HTMLOptionElement;
    const value = target.value;
    if(value === 'simple-movement'){
        setHowHelp('');
        setHowHelp('simple-movement');
    } else if (value === 'housework-support'){
        setHowHelp('');
        setHowHelp('housework-support');
    } else {
        setHowHelp('');
        setHowHelp('outdoor-support');
    }
}
function detailHelp(event: React.ChangeEvent<HTMLTextAreaElement>){
    const target = event.target as HTMLTextAreaElement;
    const value = target.value;
    setDetailContent(value);
}

    return(
        <EmployerStyle>
            <div>
                <div className="point">
                   <p>{point} point</p>
                </div>

                <div className="location">
                    <button id='go' onClick={pageMove}>{location.state?.GoPosX !=null?location.state.GoPosPlace:"출발지 입력"}</button>
                    <button id='arrive' onClick={pageMove}>{location.state?.ArrivePosX !=null?location.state.ArrivePosPlace:"도착지 입력"}</button>
                </div>

                <div className="trip">
                    <p>편도/왕복</p>
                    <div className="choose">
                        <select onClick={roundTrip}>
                            <option value="one-way">편도</option>
                            <option value="round-trip">왕복</option>
                        </select>
                    </div>
                </div>

                <div className="transportation">
                    <label>이동수단 선택</label>
                    <div className="chooseOne">
                        <select onClick={vehicle}>
                            <option value="walk">도보</option>
                            <option value="public">대중교통(교통비 이용자 부담)</option>
                            <option value="taxi">택시(교통비 이용자 부담)</option>
                        </select>
                    </div>
                </div>

                <div className="time">
                   <p>기본적으로 매칭은 즉시 이루어지며, 시간을 지정하고 싶으신 경우 아래의 시간지정 버튼을 클릭해 시간을 선택해주세요.</p>
                </div>

                <div className="time-select">
                  <button onClick={pageMove} id='timeSet'>시간지정</button>
                </div>

                <div className="support">
                    <label>지원 내용 선택</label>
                    <select onClick={helpF}>
                        <option value="simple-movement">단순이동</option>
                        <option value="housework-support">가사보조</option>
                        <option value="outdoor-support">외출지원</option>
                    </select>
                </div>

                <div className="request">
                    <label>상세 요청사항</label>
                    <textarea onChange={detailHelp} placeholder="필요한 경우 상세한 요청사항을 입력해주세요." cols={50} rows={5}></textarea>
                </div>

                <div className="start">
                    <button onClick={pageMove} id='startMatching'>매칭 시작</button>
                </div>
            </div>
        </EmployerStyle>
    );
}