import { useEffect, useState } from "react";

export default function useFetch(url:string) {
    //승균이가 로그인한 상대의 상태를 뭘로 반환할껀지 알려줘야 함
    const [data, setData] = useState("");

    useEffect(()=>{
        fetch(url)
        .then (res => res.json())
        .then(data => {
            setData(data);
        });
    },[url]);

    return data;
}