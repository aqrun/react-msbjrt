import { useEffect, useRef } from 'react';

//import useRafState from './useRafState';

export const isClient = typeof window === 'object';

/* export interface State {
  x: number;
  y: number;
} */

const useWindowScroll = (callback:()=>void): void => {
  const currentBot = useRef(0) as any
  const isScrollDown = useRef(0) as any
  //const marginBot = useRef(0) as any
  useEffect(() => {
    const handler = () => {
        let marginBot = 0;
        //marginBot.current = 0
        const domel = window.document.documentElement as HTMLElement
        const dombody = window.document.body as HTMLElement
        if (domel.scrollTop){
            const X=domel.scrollHeight;
            const Y=domel.scrollTop+dombody.scrollTop;
            const Z=domel.clientHeight;
            marginBot=X-Y-Z;
        } else {
            const J=dombody.scrollHeight;
            const I=dombody.scrollTop;
            const K=dombody.clientHeight;
            marginBot=J-I-K;
        }
        if(marginBot<=0) {
            //console.log('to loading c m', currentBot, marginBot)
            if(isScrollDown.current){
                callback()
                isScrollDown.current = false
            }
        }else{
            if(currentBot.current>marginBot){
                isScrollDown.current = true;
            }else{
                isScrollDown.current = false
            }
            //console.log('c m', currentBot, marginBot, isScrollDown)
            currentBot.current = marginBot
        }
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