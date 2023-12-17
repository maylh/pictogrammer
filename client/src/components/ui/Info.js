import React from 'react';
import './Info.css'

// 문제 표시
function Info({doodle, time, timeFieldRef}) {

  return (
    <div className="InfoWeb">
      <div className="InfoWebHead">
        Draw "<b>{doodle}</b>" <br/>
        in <b><span ref={timeFieldRef} className="letter-changer">{time}</span></b> seconds
      </div>
    </div>
  )
}


export default Info;
