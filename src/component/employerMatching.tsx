import { EmployerMatchingStyle } from "../css/employerMatchingStyle";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function EmployerMatching(){
    const navigate = useNavigate();
    const location = useLocation();
    const [userState, SetUserState] = useState(true);

    //아래 코드는 비동기적으로 서버에서 매칭 결과를 보내줄때까지 대기하는 코드
    useEffect(() => {
      const fetchData = async () => {
        try {
          const res = await fetch('유저 매칭상태 가져오기');
          const data = await res.json();
          //아래 코드는 data.~~ === true 값이 되었을때 실행됨.
          //따라서 매칭되었을때 실행되는 코드라고 보면 됨.
          if(data){
            alert("매칭에 성공하셨습니다!")
            navigate("/matchingOk", {state:{
              isRound : location.state.isRoundTrip,
              howMove : location.state.howMove,
              howHelp : location.state.howHelp,
              detailContent : location.state.detailContent,
              GoPosPlace : location.state?.GoPosPlace,
              ArrivePosPlace : location.state?.ArrivePosPlace,
              hour : location.state.hour,
              minute : location.state.minute,
              today : location.state.today
            }})
          }
        } catch (error) {
          if (userState) {
            fetchData();
          } else {
            return;
          }
        }
      };})

    function stopMatching(event:React.MouseEvent<HTMLButtonElement>) {
      SetUserState(true)
      const a = window.confirm("정말로 요청을 중단 하시겠습니까?")
      if(a){
        fetch(`요청중단을 보낼 api 주소`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userState:userState
          }),
        }).then(res => {
          window.alert("취소하였습니다.")
          navigate("/employer")
        }).catch(err => {
          window.alert("서버에 요청을 보내는데 실패했습니다. 다시 시도해주십시오.")
        })
      } else {
        window.alert("요청중단을 하지 않으셨습니다.")
      }
      
    }
    

    return(
        <EmployerMatchingStyle>
            <div>
                <div className="supporter-message">
                    <p id = "matching">서포터 매칭중...</p>
                    <button onClick={stopMatching}>요청 중단</button>
                </div>
                <div className="request-area">
                왕복/편도 : {location.state.isRoundTrip?"왕복":"편도"}<br/>
                이동수단 : {location.state.howMove === 'walk'?"도보":location.state.howMove ==='public'?"대중교통":"택시"}<br/>
                지원내용 : {location.state.howHelp === 'simple-movement'?"단순이동":location.state.howHelp === 'housework-support'?"가사보조":"외출지원"}<br/>
                요청사항 : {location.state.detailContent}<br/>
                출발지 : {location.state?.GoPosPlace}<br/>
                도착지 : {location.state?.ArrivePosPlace}<br/>
                {location.state?.hour} 시 {location.state?.minute}분 {location.state?.today}
                </div>
            </div>
        </EmployerMatchingStyle>
    )
}