import styled from 'styled-components';

export const TimeSetStyle = styled.div`

/* 전체 body 설정 */
.container {
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f2f2f2;
}

/* select 태그 스타일링 */
.select-box {
  margin-bottom: 1rem;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border-radius: 0.5rem;
  border: none;
  box-shadow: 0 0 0.25rem rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
}

/* 시간과 분을 감싸는 div 스타일링 */
.time-box {
  margin-bottom: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.25rem;
}

/* input 태그 스타일링 */
.input-box {
  margin-left: 1rem;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border-radius: 0.5rem;
  border: none;
  box-shadow: 0 0 0.25rem rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
}

.submit-button {
  background-color: #4CAF50; /* 버튼 배경색 */
  border: none; /* 버튼 테두리 없애기 */
  color: white; /* 버튼 글자색 */
  padding: 10px 20px; /* 버튼 안쪽 여백 */
  text-align: center; /* 버튼 안쪽 텍스트 중앙 정렬 */
  text-decoration: none; /* 버튼 텍스트 밑줄 없애기 */
  display: inline-block; /* 버튼을 인라인 요소로 배치 */
  font-size: 16px; /* 버튼 텍스트 크기 */
  margin-top: 20px; /* 버튼 위 여백 */
}


`;