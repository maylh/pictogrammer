import React from 'react';
import './UndoButton.css'

function UndoButton({contextRef}) {

  function retBottomPos(){
    if (window.innerHeight > window.innerWidth){
      return "100vh"
    } else {
      return "20vh"
    }
  }

  const next = () => {
    // todo
  }

  const undo = () => {
    contextRef.current.clearRect(0, 0, window.innerWidth, window.innerHeight);
    //contextRef.current.fillStyle = "rgb(255,255,255)";
    //contextRef.current.fillRect(0,0,window.innerWidth, window.innerHeight);
  }

  return (
    <div className="ButtonsContainer"> 
      <button
        onClick={undo} 
        className="button red"
        style={{marginLeft: "auto", marginRight: "auto", marginTop: "15px"}}
      >
        Clear
      </button>
    </div>
    
  )

  return (
    <div className="ButtonsContainer">
        
      <button 
        onClick={next}
        className="button white"
      >
        skip
      </button>
      &nbsp;  &nbsp;  
      <button
        onClick={undo} 
        className="button red"
      >
        Clear
      </button>
    </div>
    
  )
}


export default UndoButton;
