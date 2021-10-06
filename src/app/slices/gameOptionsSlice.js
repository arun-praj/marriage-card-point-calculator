import { createSlice } from '@reduxjs/toolkit'

const initialState = {
   max_player: 5,
   min_player: 2,
   maal_unseed_point: 10,
   maal_seen_point: 3,
   mistake_penalty_point: 15,
   price_per_point: 1,
   gamePlaying: false,
}

const gameOptionsSlice = createSlice({
   name: 'gameOption',
   initialState,
   reducers: {
      change_maal_unseed_point: (state, action) => {
         if (!isNaN(action.payload)) state.maal_unseed_point = action.payload
      },
      change_maal_seen_point: (state, action) => {
         if (!isNaN(action.payload)) state.maal_seen_point = action.payload
      },
      change_mistake_penalty_point: (state, action) => {
         if (!isNaN(action.payload)) state.mistake_penalty_point = action.payload
      },
      change_gamePlaying: (state, action) => {
         state.gamePlaying = action.payload
      },
      change_price_per_point: (state, action) => {
         state.price_per_point = action.payload
      },
   },
})

const { actions, reducer } = gameOptionsSlice

export const {
   change_maal_unseed_point,
   change_price_per_point,
   change_maal_seen_point,
   change_mistake_penalty_point,
   change_gamePlaying,
} = actions
export default reducer
