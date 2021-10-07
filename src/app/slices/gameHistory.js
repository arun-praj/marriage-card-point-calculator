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
      reset_history: (state, _) => {
         state.history = []
      },
   },
})

const { actions, reducer } = gameHistory

export const { add_game_result, reset_history } = actions
export default reducer
