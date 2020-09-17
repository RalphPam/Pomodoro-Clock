import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [time,setTime] = useState(0)
  const [isActive, setIsActive] = useState(true)
  const [inputBreak, setInputBreak] = useState(5)
  const [inputSession, setInputSession] = useState(25)
  const [breakTime, setBreakTime] = useState(inputBreak)
  const [session, setSession] = useState(inputSession)
  const [turn ,setTurn] = useState(true)
  const [descAni, setDescAni] = useState(true)
  const [rotate, setRotate] = useState(false)
  const [inc1, setInc1] = useState(false)
  const [inc2, setInc2] = useState(false)
  const [dec1, setDec1] = useState(false)
  const [dec2, setDec2] = useState(false)
  const [toggleAnim, setToggleAnim] = useState(false)
  function toggle() {
    setIsActive(!isActive)
  }
  function reset() {
    setTime(0)
    setIsActive(true)
    setSession(inputSession)
    setBreakTime(inputBreak)
    setTurn(true)
    setDescAni(true)
    setRotate(true)
  }
  function twoDigitString(num) {
    if(num>=0 && num<10) {
      return `0${num}`
    } else if(num === 60) {
      return '00'
    }
    return `${num}`
  }
  useEffect(
    () => {
      let seconds = null
      let audio = new Audio('https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav')
      if(!isActive) {
        seconds = setInterval(() => {
          setTime(prevState => prevState === 0 ? 59 : prevState - 1)
          if(session === 0 && time === 1) {
            setDescAni(true)
            setTurn(false)
            setSession(inputSession)
            audio.play()
          } else if(breakTime === 0 && time === 1) {
            setDescAni(true)
            setTurn(true)
            setBreakTime(inputBreak)
            audio.play()
          }
          if(time === 0 && turn) {
            setSession(prevState => prevState - 1)
          } else if(time === 0 && !turn) {
            setBreakTime(prevState => prevState - 1)
          }
        },1000)
      } else if(isActive && time !==0) {
        clearInterval(seconds)
      }
      return () => clearInterval(seconds)
    } , [time, isActive, session, breakTime, turn , inputBreak, inputSession]
  )
  return (
    <div className='page'>
      <div className='pomodoro'>
        <div className='description'>
            {!isActive ? turn ? 
              <h3 
                className={descAni ? 'description-ani' : ''} 
                onAnimationEnd={() => setDescAni(false)}
              >YOU CAN DO IT <i className="far fa-smile-wink"></i></h3> : 
              <h3 
                className={descAni ? 'description-ani' : ''} 
                onAnimationEnd={() => setDescAni(false)}
              >TAKE A BREAK <i className="fas fa-mug-hot"></i></h3> : 
              <div></div>}
        </div>
        <div className='control'>
          <div className='break-control'>
            <h3>Break</h3>
            <button 
              className={inc1 ? 'increment' : ''}
              onClick={() => {
                if(isActive) {
                  setInputBreak(prevState => prevState >= 1 && prevState < 60 ? prevState + 1 : prevState)
                  setBreakTime(prevState => prevState >= 1 && prevState < 60 ? inputBreak + 1 : inputBreak)
                }
                setInc1(true)
              }}
              onAnimationEnd={() => setInc1(false)}
            ><i className="far fa-arrow-alt-circle-up"></i></button>
            <label>{twoDigitString(inputBreak)}</label>
            <button 
              className={dec1 ? 'decrement' : ''}
              onClick={() => {
                if(isActive) {
                  setInputBreak(prevState => prevState > 1 && prevState <= 60 ? prevState - 1 : prevState)
                  setBreakTime(prevState => prevState > 1 && prevState <= 60 ? inputBreak - 1 : inputBreak)
                }
                setDec1(true)
              }}
              onAnimationEnd={() => setDec1(false)}
            ><i className="far fa-arrow-alt-circle-down"></i></button>
          </div>
          <div className='session-control'>
            <h3>Session</h3>
            <button 
              className={inc2 ? 'increment' : ''}
              onClick={() => {
                if(isActive) {
                  setInputSession(prevState => prevState >= 1 && prevState < 60 ? prevState + 1 : prevState)
                  setSession(prevState => prevState >= 1 && prevState < 60 ? inputSession + 1 : inputSession)
                }
                setInc2(true)
              }}
              onAnimationEnd={() => setInc2(false)}
            ><i className="far fa-arrow-alt-circle-up"></i></button>
            <label>{twoDigitString(inputSession)}</label>
            <button 
              className={dec2 ? 'decrement' : ''}
              onClick={() => {
                if(isActive) {
                  setInputSession(prevState => prevState > 1 && prevState <= 60 ? prevState - 1 : prevState)
                  setSession(prevState => prevState > 1 && prevState <= 60 ? inputSession - 1 : inputSession)
                }
                setDec2(true)
              }}
              onAnimationEnd={() => setDec2(false)}
            ><i className="far fa-arrow-alt-circle-down"></i></button>
          </div>
        </div>
        <div className='clock'>
          <time>{turn ? twoDigitString(session): twoDigitString(breakTime)} : {twoDigitString(time)}</time>
          <br />
          <div className='clock-btn'>
            <button 
              className={toggleAnim ? 'toggle' : ''}
              onClick={() => {toggle(); setToggleAnim(true); setDescAni(true)}}
              onAnimationEnd={() => setToggleAnim(false)}
            ><i className="far fa-play-circle"></i><i className="far fa-pause-circle"></i></button>
            <button 
              className={rotate ? 'reset' : ''} 
              onClick={() => reset()}
              onAnimationEnd={() => setRotate(false)}
            ><i className="fas fa-retweet"></i></button>
          </div>
        </div>
        <div>
          <h4 className='designer'>Designed and Coded by Ralph P.</h4>
        </div>
      </div>
    </div>
  );
}

export default App;
