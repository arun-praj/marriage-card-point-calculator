import { createSlice } from '@reduxjs/toolkit'

const initialState = {
   history: [],
}
const gameHistory = createSlice({
   name: 'gameHistory',
   initialState,
   reducers: {
      add_game_result: (state, action) => {
         state.history.push(action.payload)
      },
   },
})

const { actions, reducer } = gameHistory

export const { add_game_result } = actions
export default reducer
