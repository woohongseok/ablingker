import React, {useState} from 'react';
import styled, { DefaultTheme, StyledComponent } from 'styled-components'
import Login from './component/login'
import Helper from './component/helper'
import Employer from './component/employer'
import Go from './component/searchBar'
import TimeSet from './component/timeSet'
import EmployerMatching from './component/employerMatching';
import MatchingOk from './component/matchingOk';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';

export default function App() {
  return (
      <Router>
        <Routes>
          <Route path='' element={<Login/>}></Route>
        </Routes>
        <Routes>
          <Route path='login' element={<Login/>}></Route>
        </Routes>
        <Routes>
          <Route path='helper' element={<Helper/>}></Route>
        </Routes>
        <Routes>
          <Route path='employer' element={<Employer/>}></Route>
        </Routes>
        <Routes>
          <Route path='go' element={<Go/>}></Route>
        </Routes>
        <Routes>
          <Route path='arrive' element={<Go/>}></Route>
        </Routes>
        <Routes>
          <Route path='timeSet' element={<TimeSet/>}></Route>
        </Routes>
        <Routes>
          <Route path='employerMatching' element={<EmployerMatching/>}></Route>
        </Routes>
        <Routes>
          <Route path='matchingOk' element={<MatchingOk/>}></Route>
        </Routes>
      </Router>
  );
}