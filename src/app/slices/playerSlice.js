import { createSlice } from '@reduxjs/toolkit'
import { nanoid } from 'nanoid'
import PlayerJoined from 'assets/audio/joined.wav'

const initialState = {
   players: [],
}
//game running
//players
//gameOptions
//gameHistory
//

const playerSlice = createSlice({
   name: 'player',
   initialState,
   reducers: {
      //reducer function
      // slice automatically creates actions for these reducers
      //key names will be used to create action
      addPlayers: {
         //if you want extra calculation with payload you can add prepare function
         reducer: (state, action) => {
            action.payload.player_name?.length > 0 && state.players.push(action.payload)
            let chirp = new Audio(PlayerJoined)
            chirp.play()
         },
         prepare: (player_name) => {
            const id = nanoid()
            return {
               payload: { id, player_name },
            }
         },
      },
      removePlayers: (state, action) => {
         state.players = state.players.filter((product) => {
            return product.id !== action.payload.id
         })
      },
   },
   extraReducers: {
      //    if you want to use your own action names
      // extraReducers allows createSlice to respond to other action types besides the types it has generated.
   },
})

// createSlice will return an object that looks like:
// {
//     name : string,
//     reducer : ReducerFunction,
//     actions : Record<string, ActionCreator>,
//     caseReducers: Record<string, CaseReducer>
// }
const { actions, reducer } = playerSlice

//Action are generated for each case reducer function
//These actions can be called from anywhere, eg. Home page
export const { addPlayers, removePlayers } = actions

//reducer is exported to store
export default reducer
