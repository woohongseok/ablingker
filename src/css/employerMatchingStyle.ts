import styled from 'styled-components';

export const EmployerMatchingStyle = styled.div`

body {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    margin: 0;
    padding: 0;
}

.supporter-message {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    text-align: center;
    background-color: #D4ADFC;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.supporter-message p {
    margin: 0;
}

.supporter-message button {
    margin-left: 10px;
}

.request-area {
    margin-top: 100px;
    text-align: center;
    margin-bottom: 20px;
}

`;