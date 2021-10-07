import { useSelector, useDispatch } from 'react-redux'
import { useLayoutEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { createAvatar } from '@dicebear/avatars'
import * as style from '@dicebear/avatars-bottts-sprites'
import { addPlayers, removePlayers } from 'app/slices/playerSlice'
import {
   change_maal_unseed_point,
   change_maal_seen_point,
   change_mistake_penalty_point,
   change_gamePlaying,
   change_price_per_point,
} from 'app/slices/gameOptionsSlice'

import Container from '../../hoc/Container'

function UserSelect() {
   const dispatch = useDispatch()
   const history = useHistory()
   const { players } = useSelector((state) => state.player)
   const { maal_seen_point, maal_unseed_point, mistake_penalty_point, gamePlaying, price_per_point } = useSelector(
      (state) => state.gameOption
   )
   const [playerName, setPlayerName] = useState('')
   useLayoutEffect(() => {
      gamePlaying && history.push('/play')
   }, [history, gamePlaying])
   const itemAddHandler = () => {
      dispatch(addPlayers(playerName))
      setPlayerName('')
   }
   const removeItemHandler = (player_info) => {
      dispatch(removePlayers(player_info))
   }
   const maalSeenChangeHandler = (e) => {
      dispatch(change_maal_seen_point(e.target.value))
   }
   const maalUnSeenChangeHandler = (e) => {
      dispatch(change_maal_unseed_point(e.target.value))
   }
   const mistakePenaltyHandler = (e) => {
      dispatch(change_mistake_penalty_point(e.target.value))
   }
   const pricePerPointHandler = (e) => {
      dispatch(change_price_per_point(e.target.value))
   }
   const startGame = () => {
      dispatch(change_gamePlaying(true))
   }
   return (
      <Container>
         <p style={{ fontSize: '1.6rem' }}>Marriage Point Calculator</p>
         <p style={{ fontSize: '2.4rem' }}>Name of Players:</p>

         <div
            style={{
               width: '100%',
               display: 'flex',
               margin: players?.length > 0 ? '1rem 0' : '0rem 0',
            }}
         >
            {players?.map((player) => {
               let svg = createAvatar(style, {
                  seed: player.player_name,
                  dataUri: true,
               })
               return (
                  <div
                     style={{ marginRight: '10px', textAlign: 'center' }}
                     key={player.id}
                     onClick={() => removeItemHandler(player)}
                  >
                     <img src={svg} alt='Avatar' height='30px' className='avatar__image' />
                     <div>{player.player_name}</div>
                  </div>
               )
            }) ?? 'empty'}
         </div>

         <div
            style={{
               display: 'flex',
               width: '100%',
               flex: 1,
            }}
         >
            <input
               style={{
                  width: '100%',
                  padding: '0rem 1rem',
               }}
               type='text'
               placeholder='Enter your name'
               value={playerName}
               onChange={(e) => setPlayerName(e.target.value)}
            />

            <div>
               <button
                  style={{
                     padding: '0.3rem 0.8rem',
                     fontSize: '1.6rem',
                     borderRadius: '0px',
                     border: '2px solid rgb(216, 2, 134)',
                     boxShadow: 'inset 0 0 0 0 #d80286',
                     transition: ' ease-out 0.4s',
                     cursor: 'pointer',
                     marginLeft: '5px',
                  }}
                  onClick={itemAddHandler}
               >
                  +
               </button>
            </div>

            {/* //Use onblur event */}
         </div>
         <div>
            <h1>Game Options: </h1>
            <div>
               Price per point: <input value={price_per_point} onChange={(e) => pricePerPointHandler(e)} />
            </div>
            <div>
               Maal Seen Points: <input value={maal_seen_point} onChange={(e) => maalSeenChangeHandler(e)} />
            </div>
            <div>
               Maal Unseen Points: <input value={maal_unseed_point} onChange={(e) => maalUnSeenChangeHandler(e)} />
            </div>
            <div>
               Mistake penalty Points:{' '}
               <input value={mistake_penalty_point} onChange={(e) => mistakePenaltyHandler(e)} />
            </div>

            <div>
               <Link to='/play' onClick={startGame}>
                  Start Game
               </Link>
            </div>
         </div>
      </Container>
   )
}

export default UserSelect
