import styled from 'styled-components';

export const EmployerStyle = styled.div`

/* 전체 페이지 스타일 */
body {
    font-family: sans-serif;
    margin: 0;
    padding: 0;
  }
  
  /* 제목 스타일 */
  h1 {
    font-size: 24px;
    margin: 0;
    padding: 10px;
    text-align: center;
  }
  
  /* 포인트 정보 스타일 */
  .point {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #FFF8D6;
    padding: 10px;
  }
  
  /* 출발지/도착지 입력 버튼 스타일 */
  .location {
    display: flex;
    justify-content: center;
    margin: 10px 0;
  }
  
  .location button {
    padding: 10px 20px;
    margin: 0 10px;
    background-color: #F5F5F5;
    border: none;
    border-radius: 5px;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
    font-size: 16px;
    cursor: pointer;
  }
  
  .location button.arrive {
    margin-left: 20px;
  }
  
  /* 편도/왕복 선택 스타일 */
  .trip {
    display: flex;
    align-items: center;
    margin: 10px 0;
  }
  
  .trip p {
    margin: 0;
    padding-right: 20px;
    font-weight: bold;
    font-size: 16px;
  }
  
  .choose {
    display: flex;
  }
  
  .choose div {
    display: flex;
    align-items: center;
    margin-right: 20px;
  }
  
  .choose label {
    margin: 0;
    margin-right: 10px;
    font-size: 14px;
  }
  
  .choose select {
    text-align: right;
    font-size: 16px;
    border-radius: 5px
  }
  
  /* 이동수단 선택 스타일 */
  .transportation {
    display: flex;
    align-items: center;
    margin: 10px 0;
  }
  
/* 이동수단 선택 스타일 */
.transportation {
    display: flex;
    align-items: center;
    margin: 10px 0;
  }
  
  .chooseOne {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    flex: 1;
    margin-right: 20px;
  }
  
  .chooseOne div {
    display: flex;
    align-items: center;
  }
  
  .chooseOne label {
    margin: 0;
    margin-right: 10px;
    font-size: 14px;
  }
  
  .chooseOne select {
    text-align: right;
    font-size: 16px;
    border-radius: 5px
  }  
  
  
  /* 시간지정 버튼 스타일 */
  .time{
    display: flex;
    width: 95%;
    text-align: center;
  }
  .time-select {
    display: flex;
    justify-content: center;
    margin: 10px 0;
  }
  
  .time-select button {
    padding: 10px 20px;
    background-color: #F5F5F5;
    border: none;
    border-radius: 5px;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
    font-size: 16px;
    cursor: pointer;
  }
  
  /* 지원 내용 선택 스타일 */
  .support {
    display: flex;
    align-items: center;
    margin: 10px 0;
  }
  
  .support label {
    margin: 0;
    margin-right: 20px;
    font-size: 14px;
    font-weight: bold;
  }
  
  .support select {
    text-align: right;
    font-size: 16px;
    border-radius: 5px
  }
  .start{
    display: flex;
    justify-content: center;
  }
  .start button{
    margin-top: 50px;
    padding: 10px 20px;
    background-color: #F5F5F5;
    border: none;
    border-radius: 5px;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
    font-size: 16px;
    cursor: pointer;
  }

`;