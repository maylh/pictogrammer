import React, {useState, useEffect} from 'react';

function SketchPad({canvasRef, contextRef, setCurB64}) {

  const [isDrawing, setIsDrawing] = useState(false)
  
  useEffect(() => {
    // 캔버스 setup
    const canvas = canvasRef.current;
    canvas.width = 700;
    canvas.height = 450;
    canvas.style.width = `${700}px`;
    canvas.style.height = `${450}px`;

    const context = canvas.getContext("2d")
    context.lineCap = "round"
    context.strokeStyle = "rgb(1,1,1)"
    context.lineWidth = 1
    contextRef.current = context;
  }, [canvasRef, contextRef])

  const startDrawing = ({nativeEvent}) => {
    nativeEvent.preventDefault()
    const {offsetX, offsetY} = nativeEvent;
    contextRef.current.beginPath()
    contextRef.current.moveTo(offsetX, offsetY)
    setIsDrawing(true)
  }

  const finishDrawing = ({nativeEvent}) => {
    nativeEvent.preventDefault()
    contextRef.current.closePath()
    setIsDrawing(false)
    // update cur image on screen
    setCurB64(canvasRef.current.toDataURL("image/jpeg"))  // base64 format
  }

  const draw = ({nativeEvent}) => {
    nativeEvent.preventDefault()
    if(!isDrawing){
      return
    }
    const {offsetX, offsetY} = nativeEvent;
    // for touch screen
    if (offsetX === undefined){
      var rect = nativeEvent.target.getBoundingClientRect();
      var x = nativeEvent.targetTouches[0].pageX - rect.left;
      var y = nativeEvent.targetTouches[0].pageY - rect.top;
      contextRef.current.lineTo(x, y)
      contextRef.current.stroke()
      return
    }

    contextRef.current.lineTo(offsetX, offsetY)
    contextRef.current.stroke()
  }
  
  return (
    <div className="CanvasContainer">
      <canvas
          className="canvas"
          
          onMouseDown={startDrawing}
          onMouseUp={finishDrawing}
          onMouseMove={draw}
          
          onTouchStart={startDrawing}
          onTouchEnd={finishDrawing}
          onTouchMove={draw}
          
          ref={canvasRef}
      />
    </div>
  )
}

export default SketchPad;