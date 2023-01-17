import React, { useState } from 'react'

export const WatchlistContext = React.createContext({
  watchlistId: 0,
  setWatchlistId: () => {}
})

export const WatchlistContextProvider = (props) => {

  const setWatchlistId = (watchlistId) => {
    setState({...state, watchlistId})
  }

  const initState = {
    watchlistId: 0,
    setWatchlistId
  } 

  const [state, setState] = useState(initState)

  return (
    <WatchlistContext.Provider value={state}>
      {props.children}
    </WatchlistContext.Provider>
  )
}