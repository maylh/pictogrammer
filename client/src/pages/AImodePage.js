import React, { useRef, useState, useEffect } from 'react';
import '../styles/AImodePage.css';
import SketchPad from '../components/sketch/SketchPad';
import UndoButton from '../components/ui/UndoButton';
import Info from '../components/ui/Info';
import Voice from '../components/ui/Voice';
import { Speech } from './speech';
import { setisBackendUpFromAPI, predictB64, resetDoodle } from './api';

function AImodepage() {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const timeFieldRef = useRef(null);
  const runningTimerRef = useRef(null);
  const voiceDisplayRef = useRef(null);

  const [isBackendUp, setisBackendUp] = useState(false);
  const [curB64, setCurB64] = useState(null);
  const [curDoodle, setDoodle] = useState('nail');
  const [time, setTime] = useState('any number of');

  useEffect(() => {
    setisBackendUpFromAPI(isBackendUp, setisBackendUp);
    const run = async () => {
      speechSynthesis.cancel(); // clear queue due to async/await
      var preds = await predictB64(curB64);
      const doodleStatus = resetDoodle(
        preds,
        curDoodle,
        setDoodle,
        setTime,
        timeFieldRef,
        runningTimerRef,
        voiceDisplayRef,
        contextRef
      );
    };
    run();
  }, [isBackendUp, curB64, curDoodle, time, timeFieldRef, runningTimerRef, contextRef]);

  if (isBackendUp !== true) {
    return (
      <div className='BigInfo'>
        wake up server
        <span className='letter-changer'>ZzZ</span>
      </div>
    );
  }

  return (
    <div>
      <SketchPad canvasRef={canvasRef} contextRef={contextRef} setCurB64={setCurB64} />
      <UndoButton contextRef={contextRef} />
      <Info doodle={curDoodle} time={time} timeFieldRef={timeFieldRef} />
      <Voice voiceDisplayRef={voiceDisplayRef} />
    </div>
  );
}

export default AImodepage;
