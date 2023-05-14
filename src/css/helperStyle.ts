import styled from 'styled-components';

export const HelperStyle = styled.div`

.topNav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #FFF8D6;
    padding: 10px;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 999;
  }
  
  .topNav p,
  .topNav .status {
    margin: 0;
    font-size: 15px;
  }
  
  .topNav p:last-child {
    margin-right: 0;
  }
  
  .topNav button {
    background-color: #4CAF50;
    color: white;
    border: none;
    padding: 10px 20px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin-left: auto;
  }
  
  .buttonWrapper {
    text-align: right;
  }
  
  .item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    margin-top: 10px;
    background-color: #A4D0A4;
    border-radius: 5px;
  }
  
  .item p {
    font-size: 15px;
    margin: 0;
  }
  
  .num {
    width: 20px;
    margin-right: 20px;
    text-align: center;
  }
  
  .time,
  .location {
    flex: 1;
    margin: 0 10px;
  }
  
  .time p:first-child,
  .location p:first-child {
    margin-top: 0;
  }
  
  .location p:last-child {
    margin-bottom: 0;
  }
  
  .items{
    margin-top: 80px;
  }

`;