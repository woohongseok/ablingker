import styled from 'styled-components';

export const LoginStyle = styled.div`

body {
  background-color: #F6F1F1;
}

.login-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #B0DAFF;
  width: 300px;
  height: 500px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-sizing: border-box;
  border-radius: 20px;
}


label, input, button {
  display: block;
  margin-bottom: 16px;
  width: 100%;
  box-sizing: border-box;
  border: none;
  border-radius: 5px;
  padding: 10px;
  font-size: 16px;
  font-family: Arial, sans-serif;
  color: #333;
}

button {
  background-color: #333;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.2s ease;
  margin-top: 60px;
}

button:hover {
  background-color: #555;
}

`;