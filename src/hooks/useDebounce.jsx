// 입력 값이 한글자 한글자 바뀔 때 마다 데이터 요청을 보내게 되는데
// 이처럼 불필요한 데이터 요청을 줄이고 성능저하를 막기위해 사용

import { useEffect, useState } from "react"

// value, delay로는 Search 컴포넌트의 useDebounce를 사용하는 함수의 인자를 받아온다.
export const useDebounce = (value, delay) => {
  const [debounce, setDebounce] = useState(value)

  // value, delay 값이 새로 들어올 때마다 이펙트 함수를 호출한다.
  // value값이 들어오면 delay 시간 후에 setDebounce에 담긴다.
  useEffect(() => {
    const lateSend = setTimeout(() => {
      setDebounce(value)
    }, delay)

    // 위 함수에 들어온 value 값이 delay 시간이 지나 setDebounce에 담긴기 전에
    // 새로 들어와 실행되면 기존 lateSend를 비운다.
    return () => {
      clearTimeout(lateSend)
    }

  }, [value, delay])

  // 따라서 최종적인 값만 debounce로 간다.
  return debounce
}