import React, { useState, useRef } from 'react';
import styled from 'styled-components'
import { LoginStyle } from '../css/loginStyle'
import useFetch from "../hooks/useFetch";
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [id, SetId] = useState("");
  const [password, SetPassword] = useState("");
  const navigate = useNavigate();

  function isId(event: React.ChangeEvent<HTMLInputElement>){
    const target = event.target as HTMLInputElement;
    const value = target.value
    SetId(value);
    console.log(id)
  }
  function isPassword(event: React.ChangeEvent<HTMLInputElement>){
    const target = event.target as HTMLInputElement;
    const value = target.value
    SetPassword(value)
    console.log(password)
  }

  function handleLogin() {
    if (!isLoading) {
      setIsLoading(true);
      fetch(`http://localhost:8080/api/login?password=1234&userId=test1`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: id,
          password: password,
        }),
      })
        .then(res => res.json())
        .then(data => {
          Cookies.set('number',id)
          const loginResult = data.data.userType;
          console.log(data.data.userType)
          //만약 이용자가 장애인일 경우
          if (loginResult == "cli") {
            navigate('/employer');
          }
          //만약 이용자가 서포터인 경우
          else if (loginResult == "spt") {
            navigate('/helper');
          }
          else {
            console.log("id: ", id,"password:",password)
            window.alert("아이디, 비밀번호를 확인해 주시길 바랍니다.");
          }
        })
        .finally(() => {
          setIsLoading(false);
        })
    }
  }

  return (
    <LoginStyle>
      <div className="login-container">
        <form>
          <label htmlFor="phone-number" >아이디(전화번호)</label>
          <input type="tel" id="phone-number" name="phone-number" onChange={isId}></input>
          <label htmlFor="password">비밀번호</label>
          <input type="password" id="password" name="password" onChange={isPassword}></input>
          <button type="button" onClick={handleLogin} style={{ opacity: isLoading ? 0.3 : 1 }}>{isLoading ? "로그인중..." : "로그인"}</button>
        </form>
      </div>
    </LoginStyle>
  );
}
