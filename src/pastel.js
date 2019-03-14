import { render } from 'react-dom'
import React, { useState, useCallback } from 'react'
import { useTransition, animated } from 'react-spring'
import './pastel.css'

const pages = [
  ({ style }) => <animated.div style={{ ...style, background: 'lightpink' }}>Count Up</animated.div>,
  ({ style }) => <animated.div style={{ ...style, background: 'lightblue' }}>Count Down</animated.div>,
  ({ style }) => <animated.div style={{ ...style, background: 'lightgreen' }}>Make it Count</animated.div>,
]

export default function App() {
  const [index, set] = useState(0)
  const onClick = useCallback(() => set(state => (state + 1) % 3), [])
  const transitions = useTransition(index, p => p, {
    from: { opacity: 0, transform: 'translate3d(100%,0,0)' },
    enter: { opacity: 1, transform: 'translate3d(0%,0,0)' },
    leave: { opacity: 0, transform: 'translate3d(-50%,0,0)' },
  })
  return (
    <div className="simple-trans-main" onClick={onClick}>
      {transitions.map(({ item, props, key }) => {
        const Page = pages[item]
        return <Page key={key} style={props} />
      })}
    </div>
  )
}

render(<App />, document.getElementById('pastel'))
