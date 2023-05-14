import React, { useEffect } from 'react';
import { propsType } from './searchBar';
import store from '../redux/store';
import { Provider,useSelector,useDispatch } from 'react-redux';
import Employer from './employer';
import { Navigate, useNavigate, useLocation } from 'react-router-dom';

interface placeType {
  place_name: string,
  road_address_name: string,
  address_name: string,
  phone: string,
  place_url: string,
  x:number,
  y:number,
}

// head에 작성한 Kakao API 불러오기
const { kakao } = window as any;

const Map = (props: propsType) => {
  const location = useLocation();
  const navigate = useNavigate();
  // 마커를 담는 배열
  let markers: any[] = [];

  // 검색어가 바뀔 때마다 재렌더링되도록 useEffect 사용
  useEffect(() => {
    const mapContainer = document.getElementById("map");
    const mapOption = {
      center: new kakao.maps.LatLng(35.90184083536896, 128.84907597586613), // 지도의 중심좌표
      level: 3 // 지도의 확대 레벨
    };

    // 지도를 생성
    const map = new kakao.maps.Map(mapContainer, mapOption); 

    // 장소 검색 객체를 생성
    const ps = new kakao.maps.services.Places();  

    // 검색 결과 목록이나 마커를 클릭했을 때 장소명을 표출할 인포윈도우를 생성
    const infowindow = new kakao.maps.InfoWindow({zIndex:1});

    // 키워드로 장소를 검색합니다
    searchPlaces();

    // 키워드 검색을 요청하는 함수
    function searchPlaces() {
      let keyword = props.searchKeyword;

      if (!keyword.replace(/^\s+|\s+$/g, "")) {
        console.log("키워드를 입력해주세요!");
        return false;
      }

      // 장소검색 객체를 통해 키워드로 장소검색을 요청
      ps.keywordSearch(keyword, placesSearchCB);
    }

    // 장소검색이 완료됐을 때 호출되는 콜백함수
    function placesSearchCB(data: any, status: any, pagination: any) {
      if (status === kakao.maps.services.Status.OK) {
        // 정상적으로 검색이 완료됐으면
        // 검색 목록과 마커를 표출
        displayPlaces(data);

        // 페이지 번호를 표출
        displayPagination(pagination);

      } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
        alert('검색 결과가 존재하지 않습니다.');
        return;
      } else if (status === kakao.maps.services.Status.ERROR) {
        alert('검색 결과 중 오류가 발생했습니다.');
        return;
      }
    }

    // 검색 결과 목록과 마커를 표출하는 함수
    function displayPlaces(places: string | any[]) {
      const listEl = document.getElementById('places-list'), 
            resultEl = document.getElementById('search-result'),
            fragment = document.createDocumentFragment(), 
            bounds = new kakao.maps.LatLngBounds();

      // 검색 결과 목록에 추가된 항목들을 제거
      listEl && removeAllChildNods(listEl);

      // 지도에 표시되고 있는 마커를 제거
      removeMarker();

      for ( var i=0; i<places.length; i++ ) {
        // 마커를 생성하고 지도에 표시
        let placePosition = new kakao.maps.LatLng(places[i].y, places[i].x),
            marker = addMarker(placePosition, i, undefined), 
            itemEl = getListItem(i, places[i]); // 검색 결과 항목 Element를 생성

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가
        bounds.extend(placePosition);

        // 마커와 검색결과 항목에 mouseover 했을때
        // 해당 장소에 인포윈도우에 장소명을 표시
        // mouseout 했을 때는 인포윈도우를 닫기
        (function(marker, title) {
          kakao.maps.event.addListener(marker, 'mouseover', function() {
            displayInfowindow(marker, title);
          });

          kakao.maps.event.addListener(marker, 'mouseout', function() {
            infowindow.close();
          });

          itemEl.onmouseover =  function () {
            displayInfowindow(marker, title);
          };

          itemEl.onmouseout =  function () {
            infowindow.close();
          };
        })(marker, places[i].place_name);

        fragment.appendChild(itemEl);
      }

      // 검색결과 항목들을 검색결과 목록 Element에 추가
      listEl && listEl.appendChild(fragment);
      if (resultEl) {
        resultEl.scrollTop = 0;
      }

      // 검색된 장소 위치를 기준으로 지도 범위를 재설정
      map.setBounds(bounds);
    }

    // 검색결과 데이터 받아오는 함수
    function getLocation(Pos:placeType){
        const a = window.confirm(`선택하신 위치가 '${Pos.place_name}'이 맞습니까?`)
        console.log(Pos.x,Pos.y)
        if(a){
          navigate("/employer", {state:{
            GoPosX:location.state.isExecution ? location.state.GoPosX : Pos.x,
            GoPosY:location.state.isExecution ? location.state.GoPosY : Pos.y,
            GoPosPlace:location.state.isExecution ? location.state.GoPosPlace : Pos.place_name,
            ArrivePosX:location.state.isExecution ? Pos.x : null,
            ArrivePosY:location.state.isExecution ? Pos.y : null,
            ArrivePosPlace:location.state.isExecution ? Pos.place_name: null 
          
          }})
        }
        else{
          window.alert("다시 입력해 주십시오.")
        }
        console.log(Pos)
        console.log(Pos.place_name)
    }

    // 검색결과 항목을 Element로 반환하는 함수
    function getListItem(index: number, places: placeType) {

      const el = document.createElement('li');
      let itemStr = `
          <div class="info">
            <span class="marker marker_${index+1}">
              ${index+1}
            </span>
            <a href="#" class="place-link">
              <h5 class="info-item place-name">${places.place_name}</h5>
              ${
                places.road_address_name 
                ? `<span class="info-item road-address-name">
                    ${places.road_address_name}
                   </span>
                   <span class="info-item address-name">
                 	 ${places.address_name}
               	   </span>`
                : `<span class="info-item address-name">
             	     ${places.address_name}
                  </span>`
              }
              <span class="info-item tel">
                ${places.phone}
              </span>
            </a>
          </div>
          `

      el.innerHTML = itemStr;
      el.className = 'item';

      el.querySelector('.place-link')?.addEventListener('click', (e) => {
        e.preventDefault();
        getLocation(places);
      });

      return el;
    }

    // 마커를 생성하고 지도 위에 마커를 표시하는 함수
    function addMarker(position: any, idx: number, title: undefined) {
      var imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png', // 마커 이미지 url, 스프라이트 이미지
          imageSize = new kakao.maps.Size(36, 37),  // 마커 이미지의 크기
          imgOptions =  {
            spriteSize : new kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
            spriteOrigin : new kakao.maps.Point(0, (idx*46)+10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
            offset: new kakao.maps.Point(13, 37) // 마커 좌표에 일치시킬 이미지 내에서의 좌표
          },
          markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions),
          marker = new kakao.maps.Marker({
            position: position, // 마커의 위치
            image: markerImage 
          });

      marker.setMap(map); // 지도 위에 마커를 표출
      markers.push(marker);  // 배열에 생성된 마커를 추가

      return marker;
    }

    // 지도 위에 표시되고 있는 마커를 모두 제거합니다
    function removeMarker() {
      for ( var i = 0; i < markers.length; i++ ) {
        markers[i].setMap(null);
      }
      markers = [];
    }

    // 검색결과 목록 하단에 페이지번호를 표시는 함수
    function displayPagination(pagination: { last: number; current: number; gotoPage: (arg0: number) => void }) {
      const paginationEl = document.getElementById('pagination') as HTMLElement;
      let fragment = document.createDocumentFragment();
      let i; 

      // 기존에 추가된 페이지번호를 삭제
      while (paginationEl.hasChildNodes()) {
        paginationEl.lastChild &&
          paginationEl.removeChild(paginationEl.lastChild);
      }

      for (i=1; i<=pagination.last; i++) {
        const el = document.createElement('a') as HTMLAnchorElement;
        el.href = "#";
        el.innerHTML = i.toString();

        if (i===pagination.current) {
          el.className = 'on';
        } else {
          el.onclick = (function(i) {
            return function() {
              pagination.gotoPage(i);
            }
          })(i);
        }

        fragment.appendChild(el);
      }
      paginationEl.appendChild(fragment);
    }

    // 검색결과 목록 또는 마커를 클릭했을 때 호출되는 함수
    // 인포윈도우에 장소명을 표시
    function displayInfowindow(marker: any, title: string) {
      const content = '<div style="padding:5px;z-index:1;" class="marker-title">' + title + '</div>';

      infowindow.setContent(content);
      infowindow.open(map, marker);
    }

    // 검색결과 목록의 자식 Element를 제거하는 함수
    function removeAllChildNods(el: HTMLElement) {
      while (el.hasChildNodes()) {
        el.lastChild &&
          el.removeChild (el.lastChild);
      }
    }

  }, [props.searchKeyword])

  return (
    <div className="map-container">
      <div id="map" className="map" style={{width:"100vh",height:"50vw"}}></div>
      <div id="search-result">
        <p className="result-text">
          <span className="result-keyword">
            { props.searchKeyword }
          </span>
          검색 결과
        </p>
        <div className="scroll-wrapper">
          <ul id="places-list"></ul>
        </div>
        <div id="pagination"></div>
      </div>
    </div>
  )
}

export default Map