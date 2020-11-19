import React, { useState, useEffect } from 'react'
import {render} from 'react-dom';

export default function Help (props) {
  const [play, setPlay] = useState(`${!!props.play}` === 'true')
  const [playProps, setPlayProps] = useState(`${!!props.play}` === 'true')
  const [step, setStep] = useState(props.startStep || 0)
  const [direction, setDirection] = useState(props.direction || 'ltr')
  const [end, setEndStep] = useState(
    props.helpList ? props.endStep !== undefined && props.helpList >
                     props.endStep ? props.endStep :
                     props.helpList.length - 1 : 0)
  const [helpHtml, setHtml] = useState('')
  const [width, height] = useWindowResize()

  const EscapePress = useKeyPress('Escape');
  const ArrowRightPress = useKeyPress('ArrowRight');
  const ArrowLeftPress = useKeyPress('ArrowLeft');
  const EnterPress = useKeyPress('Enter');

  const _close = ()=>{
    setHtml('')
    setPlay(false)
    setStep(props.startStep || 0)
    props.onClose && props.onClose(step)
  }
  const _skip = ()=>{
    setHtml('')
    setPlay(false)
    setStep(props.startStep || 0)
    props.onSkip && props.onSkip(step)
  }

  const _prev=()=>{
    props.onPrev && props.onPrev(step - 1)
    setStep(step - 1)
  }
  const _next=()=>{
    props.onNext && props.onNext(step + 1)
    setStep(step + 1)
  }

  if (props.helpList && props.endStep !== undefined && props.helpList >
    props.endStep && end !== props.endStep) {
    setEndStep(props.endStep)
  }

  if (props.direction !== undefined && direction !== props.direction) {
    setDirection(props.direction)
  }

  useEffect(() => {
    if (play) {
      _run(props.helpList)
    }
  }, [play, step, width, height])

  useEffect(() => {
    if(play){
      if (EscapePress) {
        _skip();
      }
      if (step > 0 && ArrowLeftPress) {
        _prev()
      }
      if (ArrowRightPress || EnterPress) {
        if(step < end){
          _next()
        } else {
          _close()
        }
      }
    }
  }, [ EscapePress, ArrowLeftPress, ArrowRightPress, EnterPress])

  useEffect(() => {
    if(!EnterPress && `${playProps}` !== `${props.play}`){
      setPlay(`${props.play}` === 'true')
    }
  }, [props.play, EnterPress])

  function _run (helpList) {
    if (helpList && helpList[step]) {
      let obj = null
      if (helpList[step].selector) {
        if (document && document.querySelector(helpList[step].selector))
          obj = document.querySelector(helpList[step].selector)
      }

      if (obj) {
        const scrollY = window.scrollY
        window.scrollTo(0, 0)
        const dataObj = obj.getBoundingClientRect()

        const padding = props.padding && parseInt(props.padding) > 0 ? parseInt(props.padding): 0

        const  _dataObj = {
          height: dataObj.height + (padding * 2),
          width: dataObj.width + (padding * 2),
          top: dataObj.top - padding,
          bottom: dataObj.bottom + padding,
          left: dataObj.left - padding,
          right: dataObj.right + padding,
        }

        let _h = Math.floor((window.innerHeight + _dataObj.height) / 2)
        window.scrollTo(0, _dataObj.top)

        scroll(scrollY, (_dataObj.top - _h), 1)

        const _right = {
          left: _dataObj.width + 20,
          top: 0,
        }
        const _left = {
          right: _dataObj.width + 20,
          top: 0,
        }
        const _top = {
          left: direction === 'ltr' ? 0 : 'auto',
          right: direction === 'rtl' ? 0 : 'auto',
          bottom: _dataObj.height + 20,
        }
        const _bottom = {
          left: direction === 'ltr' ? 0 : 'auto',
          right: direction === 'rtl' ? 0 : 'auto',
          top: _dataObj.height + 20,
        }
        let pos = {}
        let posArrow = {}
        switch (helpList[step].position) {
          case 'right':
            pos = _right
            posArrow = {
              left: '-10px',
              top: '10px',
            }
            break
          case 'left':
            pos = _left
            posArrow = {
              right: '-10px',
              top: '10px',
            }
            break
          case 'top':
            pos = _top
            posArrow = {
              left: direction === 'ltr' ? '10px' : 'auto',
              right: direction === 'rtl' ? '10px' : 'auto',
              bottom: '-10px',
            }
            break
          case 'bottom':
            pos = _bottom
            posArrow = {
              left: direction === 'ltr' ? '10px' : 'auto',
              right: direction === 'rtl' ? '10px' : 'auto',
              top: '-10px',
            }
            break
          default:
            if (_dataObj.left > 300) {
              pos = _left
              posArrow = {
                right: '-10px',
                top: '10px',
              }
            }
            else {
              if (_dataObj.left + _dataObj.width + 300 < width) {
                pos = _right
                posArrow = {
                  left: '-10px',
                  top: '10px',
                }
              }
              else {
                if (_dataObj.top > 100) {
                  pos = _top
                  posArrow = {
                    left: direction === 'ltr' ? '10px' : 'auto',
                    right: direction === 'rtl' ? '10px' : 'auto',
                    bottom: '-10px',
                  }
                }
                else {
                  if (_dataObj.top + _dataObj.height + 100 < height) {
                    pos = _bottom
                    posArrow = {
                      left: direction === 'ltr' ? '10px' : 'auto',
                      right: direction === 'rtl' ? '10px' : 'auto',
                      top: '-10px',
                    }
                  }
                  else {
                    pos = {
                      left: direction === 'ltr' ? '10px' : 'auto',
                      right: direction === 'rtl' ? '10px' : 'auto',
                      top: 10,
                    }
                    posArrow = {
                      display: 'none',
                    }
                  }
                }
              }
            }
        }
        let data =
          <div className={'react-jTour'} id={`react-jTour_${step}`} key={`react-jTour_${step}`}>
            <div style={{
              top: _dataObj.top,
              left: _dataObj.left,
              width: _dataObj.width,
              height: _dataObj.height,
              borderRadius: padding/2
            }}>
              <div style={{ ...pos }}>
                <div
                  className={'react-jTour-arrow'}
                  style={{ ...posArrow }}/>
                <div className={'react-jTour-step'} style={{
                  float: direction === 'ltr'
                         ? 'right'
                         : 'left',
                }}>{step + 1}/{end + 1}</div>
                <div
                  className={'react-jTour-content'}
                  style={{
                    direction,
                    textAlign: direction === 'ltr' ? 'left' : 'right',
                  }}>
                  <div
                    style={{ ...props.style }}>
                    {helpList[step].title && <h3>{helpList[step].title}</h3>}
                    {helpList[step].description &&
                    <div>{helpList[step].description}</div>}
                  </div>
                </div>
                <div className={'react-jTour-control'} style={{ direction }}>
                  <div style={{
                    direction,
                    textAlign: direction === 'ltr' ? 'left' : 'right',
                    width: '100%',
                  }}>
                    {
                      step > 0 &&
                      <button
                        className={props.prevClassName || 'react-jTour-prev'}
                        onClick={() => {
                          _prev()
                        }}>{props.prevLabel || 'prev'}</button>
                    }
                    {
                      step < end &&
                      <button
                        className={props.nextClassName || 'react-jTour-next'}
                        onClick={() => {
                          _next()
                        }}>{props.nextLabel || 'next'}</button>
                    }
                  </div>
                  <div style={{
                    direction,
                    textAlign: direction === 'rtl' ? 'left' : 'right',
                    width: '100%',
                  }}>
                    {step !== end &&
                    <button
                      className={props.skipClassName || 'react-jTour-skip'}
                      onClick={() => {
                        _skip()
                      }}>{props.skipLabel || 'skip'}</button>
                    }
                    {
                      step === end &&
                      <button
                        className={props.closeClassName || 'react-jTour-close'}
                        onClick={() => {
                          _close()
                        }}>{props.closeLabel || 'close'}</button>
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>

        setHtml(data)
      }
      else{
        if(props.breakStep) {
          if (step < end) {
            _next()
          }
          else {
            _close()
          }
        }
      }
    }
  }
  if(!play) return null;

  return (
    <>
      {props.children}
      <Portal>
            <style>{`
             .react-jTour{position: absolute;top: 0;left: 0;right: 0;bottom: 0;width: 100%;height: 100%;z-index: 2147483646}
             .react-jTour > div{position: absolute;box-shadow: 0 0 0 9999px rgba(0,0,0,0.6), inset 1px 2px 5px #000;z-index: 2147483646}
             .react-jTour > div > div{box-shadow: 0 8px 8px #000; position: absolute;max-width: 300px;min-width: 200px;background: #fff; color: #000;border-radius: 3px}
             .react-jTour-arrow{z-index: 1;width: 20px;height: 20px;position: absolute;background: #fff;transform: rotate(45deg)}
             .react-jTour-content{font-size: 12px;z-index: 2;position: relative; padding: 5px;}
             .react-jTour-content h3{ margin:2px; padding: 2px;}
             .react-jTour-step{position: relative;z-index: 2;font-size: 12px;padding: 2px 5px;color: #666; background: rgba(200,200,200,0.3);border-radius: 2px;margin: 2px;}
             .react-jTour-control{display: flex;background: #f2f2f2;padding: 5px;z-index: 1;position: relative}
             .react-jTour-prev, .react-jTour-next , .react-jTour-close,.react-jTour-skip{border: none;margin:1px; color: white;padding: 3px 6px;text-align: center;text-decoration: none;display: inline-block;}
             .react-jTour-close {background-color: #4CAF50;}
             .react-jTour-next {background-color: #008CBA;}
             .react-jTour-skip {background-color: #f44336;}
             .react-jTour-prev {background-color: #555555;}
             .react-jTour > div > div {animation: fadein 1s;-moz-animation: fadein 1s;-webkit-animation: fadein 1s;-o-animation: fadein 1s;}
             @keyframes fadein {from {opacity:0;}to {opacity: 1;}}
             @-moz-keyframes fadein {from {opacity:0;}to {opacity: 1;}}
             @-webkit-keyframes fadein {from {opacity:0;}to {opacity: 1;}}
             @-o-keyframes fadein {from {opacity:0;}to {opacity: 1;}}
           `}</style>
        {play && helpHtml}</Portal>
    </>
  )
}

function useWindowResize () {

  const [width, setWidth] = useState(window.innerWidth)
  const [height, setHeight] = useState(window.innerHeight)

  useEffect(() => {
    const handelResize = () => {
      setWidth(window.innerWidth)
      setHeight(window.innerHeight)
    }
    window.addEventListener('resize', handelResize)
    return () => {
      window && window.removeEventListener && window.removeEventListener('resize', handelResize)
    }
  })

  return [width, height]
}

function scroll (i = 0, end = 0, speed = 100, timeout = 0) {

  let diff = end - i
  diff *= diff

  if (diff > 25) {
    let kn = 0
    if (i < end) {
      kn = (end - i) > 20 ? i + 10 : (end - i) > 10 ? i + 5 : i + 1
    }
    else {
      kn = (i - end) > 20 ? i - 10 : (i - end) > 10 ? i - 5 : i - 1
    }
    window && window.scrollTo && window.scrollTo(0, kn)
    if (timeout < 500) {
      timeout += speed
      window && window.setTimeout && window.setTimeout(scroll, speed, kn, end, speed, timeout)
    }
  }
}

function useKeyPress(targetKey) {
  // State for keeping track of whether key is pressed
  const [keyPressed, setKeyPressed] = useState(false);

  // If pressed key is our target key then set to true
  function downHandler({ key }) {
    if (key === targetKey) {
      setKeyPressed(true);
    }
  }

  // If released key is our target key then set to false
  const upHandler = ({ key }) => {
    if (key === targetKey) {
      setKeyPressed(false);
    }
  };

  // Add event listeners
  useEffect(() => {
    window.addEventListener('keydown', downHandler);
    window.addEventListener('keyup', upHandler);
    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener('keydown', downHandler);
      window.removeEventListener('keyup', upHandler);
    };
  }, []); // Empty array ensures that effect is only run on mount and unmount

  return keyPressed;
}

class Portal extends React.Component{
  render(){ return null;}
  portalElement= null
  componentDidMount() {
    var div = document.getElementById("react-jTour");
    if (!div) {
      var _div = document.createElement('div');
      _div.id = "react-jTour";
      document.body.appendChild(_div);
      this.portalElement = _div;
    } else {
      this.portalElement = div;
    }
    this.componentDidUpdate();
  }
  componentWillUnmount() {
    if(document && document.getElementById && document.getElementById("react-jTour") && document.body && document.body.removeChild) {
      document.body.removeChild(document.getElementById("react-jTour"));
    }
  }
  componentDidUpdate() {
    render(<div {...this.props}>{this.props.children}</div>, this.portalElement);
  }
}
