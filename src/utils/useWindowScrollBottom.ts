/* eslint-disable */
import { useEffect } from 'react';

//import useRafState from './useRafState';

export const isClient = typeof window === 'object';

/* export interface State {
  x: number;
  y: number;
} */

const useWindowScroll = (callback:()=>void): void => {
  /* const [state, setState] = useRafState<State>({
    x: isClient ? window.pageXOffset : 0,
    y: isClient ? window.pageYOffset : 0,
  }); */
  let currentBot = 0
  let isScrollDown = false

  useEffect(() => {
    const handler = () => {
        let marginBot = 0;
        if (Number(document.documentElement.scrollTop)){
            var X=Number(document.documentElement.scrollHeight);
            var Y=Number(document.documentElement.scrollTop)+Number(document.body.scrollTop);
            var Z=Number(document.documentElement.clientHeight);
            marginBot=X-Y-Z;
        } else {
            var J=Number(document.body.scrollHeight);
            var I=Number(document.body.scrollTop);
            var K=Number(document.body.clientHeight);
            marginBot=J-I-K;
        }
        if(marginBot<=0) {
            //console.log('to loading c m', currentBot, marginBot)
            if(isScrollDown){
                callback()
                isScrollDown = false
            }
        }else{
            if(currentBot>marginBot){
                isScrollDown = true;
            }else{
                isScrollDown = false
            }
            //console.log('c m', currentBot, marginBot, isScrollDown)
            currentBot = marginBot
        }

      /* setState({
        x: window.pageXOffset,
        y: window.pageYOffset,
      }); */
    };

    window.addEventListener('scroll', handler, {
      capture: false,
      passive: true,
    });

    return () => {
      window.removeEventListener('scroll', handler);
    };
  }, []);

};

export default useWindowScroll;