import { MatchingOkStyle } from "../css/matchingOkStyle";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import useState from 'react';
import useFetch from "../hooks/useFetch";

export default function MatchingOk(){
    const data = useFetch(`연결된 서포터 정보 받아오는 api주소`)
    const navigate = useNavigate();
    const location = useLocation();

    function cancelMatching() {
        const a = window.confirm(`
        매칭을 취소 하시겠습니까?
        만약 매칭을 취소하시게 된다면 패널티가 발생할 수 있습니다.
        `)
        if (a){
            fetch(`서버로 요청을 취소하는 api주소`, {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    cancel:false
                }),
            }).then(res => {
                window.confirm("매칭이 성공적으로 취소되었습니다.")
                navigate("/employer")
            }).catch(err => {
                window.confirm("서버의 문제가 발생하였습니다. 다시 시도해 주세요.")
            })
        } else {
            window.alert("매칭이 계속 진행됩니다.")
        }
    }

    return(
        <MatchingOkStyle>
            <div>
                <div className="topNav">
                    서포터 매칭 완료!
                    <button onClick={cancelMatching}>매칭 취소</button>
                </div>
                <div className= "supporter">연결된 서포터 정보 영역</div>
                <div className="request">
                    왕복/편도 : {location.state?.isRoundTrip?"왕복":"편도"}<br/>
                    이동수단 : {location.state?.howMove === 'walk'?"도보":location.state?.howMove ==='public'?"대중교통":"택시"}<br/>
                    지원내용 : {location.state?.howHelp === 'simple-movement'?"단순이동":location.state?.howHelp === 'housework-support'?"가사보조":"외출지원"}<br/>
                    요청사항 : {location.state?.detailContent}<br/>
                    출발지 : {location.state?.GoPosPlace}<br/>
                    도착지 : {location.state?.ArrivePosPlace}<br/>
                    {location.state?.hour} 시 {location.state?.minute}분 {location.state?.today}
                </div>
            </div>
        </MatchingOkStyle>
    );
}