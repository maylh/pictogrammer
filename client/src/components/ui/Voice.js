import React from 'react';
import './Voice.css'

function Voice({voiceDisplayRef}) {

  var MobOrDesktop = ""
  if (window.innerWidth > window.innerHeight){
    MobOrDesktop = "Desktop"
  } else {
    MobOrDesktop = "Mob"
  }

  return (
    <div className="RectangleContainer">
      <div 
        className={"Rectangle Rectangle" + MobOrDesktop}
        ref={voiceDisplayRef}
        >
      </div>
    </div>
  )
}


export default Voice;
