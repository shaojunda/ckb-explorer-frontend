import { useEffect, useState, useRef } from 'react'
import { initAxiosInterceptors } from '../../service/http/interceptors'
import { handleBlockchainAlert } from '../../service/app/blockchain'
import { RESIZE_LATENCY, BLOCKCHAIN_ALERT_POLLING_TIME } from '../../utils/const'
import { handleNodeVersion } from '../../service/app/nodeInfo'
import { AppDispatch, AppActions } from './reducer'

export const useInterval = (callback: () => void, delay: number) => {
  const savedCallback = useRef(() => {})
  useEffect(() => {
    savedCallback.current = callback
  })
  useEffect(() => {
    const tick = () => {
      savedCallback.current()
    }
    const listener = setInterval(tick, delay)
    return () => clearInterval(listener)
  }, [delay])
}

let resizeTimer: any = null
export const useWindowResize = (dispatch: AppDispatch) => {
  useEffect(() => {
    const resizeListener = () => {
      if (resizeTimer) clearTimeout(resizeTimer)
      resizeTimer = setTimeout(() => {
        dispatch({
          type: AppActions.ResizeWindow,
          payload: {
            appWidth: window.innerWidth,
            appHeight: window.innerHeight,
          },
        })
        resizeTimer = null
      }, RESIZE_LATENCY)
    }
    window.addEventListener('resize', resizeListener)
    return () => {
      window.removeEventListener('resize', resizeListener)
    }
    // eslint-disable-next-line
  }, [])
}

export const useInitApp = (dispatch: AppDispatch) => {
  const [init, setInit] = useState(false)
  if (!init) {
    setInit(true)
    initAxiosInterceptors(dispatch)
    handleNodeVersion(dispatch)
  }

  useInterval(() => {
    handleBlockchainAlert(dispatch)
  }, BLOCKCHAIN_ALERT_POLLING_TIME)
}