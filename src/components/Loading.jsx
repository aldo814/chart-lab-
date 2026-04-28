import React from 'react'
import img from "../assets/images/common/img_loading.svg"

const Loading = () => {
  return (
    <div className='Loading Loading--fullpage'>
      <img src={img} alt="로딩 중" />
    </div>
  )
}

export default Loading