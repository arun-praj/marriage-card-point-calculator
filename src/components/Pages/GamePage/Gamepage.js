import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { createAvatar } from '@dicebear/avatars'
import * as style from '@dicebear/avatars-bottts-sprites'

import Container from 'components/hoc/Container'

import { change_gamePlaying } from 'app/slices/gameOptionsSlice'
import { add_game_result } from 'app/slices/gameHistory'

const Gamepage = () => {
   const dispatch = useDispatch()
   const { maal_seen_point, maal_unseed_point, mistake_penalty_point, price_per_point } = useSelector(
      (state) => state.gameOption
   )
   const { history } = useSelector((state) => state.gameHistory)
   const { players } = useSelector((state) => state.player)
   const [gamerId, setGamerId] = useState()
   const [seenSequenceId, setSeenSequenceId] = useState([])
   const [gamerPoint, setGamerPoint] = useState([])

   const handleGamerRadio = (id) => {
      setGamerId(id)
      setSeenSequenceId((prev) => {
         const filteredSequence = prev.filter((sequence_id) => gamerId !== sequence_id)
         return [...filteredSequence, id]
      })
   }

   const handleSeenSequence = (id) => {
      const index = seenSequenceId.indexOf(id)
      if (index > -1) {
         const filteredSequence = seenSequenceId.filter((sequence_id) => sequence_id !== id)
         setSeenSequenceId(filteredSequence)
      } else {
         setSeenSequenceId((prev) => [...prev, id])
      }
   }
   const handlePointChange = (value, id) => {
      if (seenSequenceId.includes(id)) {
         setGamerPoint((prev) => {
            return {
               ...prev,
               [id]: value,
            }
         })
      } else {
         setGamerPoint((prev) => {
            return {
               ...prev,
               [id]: '',
            }
         })
      }
   }

   const calculate = () => {
      if (!gamerId) {
         return
      }

      let invalid_input
      for (var i = 0; i < seenSequenceId.length; i++) {
         if (gamerPoint[seenSequenceId[i]] === undefined || gamerPoint[seenSequenceId[i]] === '') {
            console.log('asdf')
            invalid_input = true
         }
      }
      console.log(invalid_input)
      if (invalid_input) {
         return
      }

      let result = []
      let sum = 0
      let total_point = seenSequenceId.map((id) => {
         sum = sum + parseFloat(gamerPoint[id])
         return sum
      })
      // total_point = total_point.at(-1)
      total_point = total_point[total_point.length - 1]

      // for those who have seen sequence but not a gamer
      seenSequenceId.forEach((seenId) => {
         // gamer hoina bhane > sequece seen or not

         const seen_player_info = players.find((player) => {
            return player.id === seenId
         })

         /* eslint-disable no-unused-vars */
         /* eslint-disable array-callback-return*/
         const _ = players.map((player) => {
            if (player.id === seenId) {
               result.push({
                  id: seen_player_info.id,
                  player_name: seen_player_info.player_name,
                  winner: seen_player_info.id === gamerId,
                  seenSequence: true,
                  points:
                     seen_player_info.id !== gamerId
                        ? (players.length * gamerPoint[seen_player_info.id] -
                             (total_point + parseFloat(maal_seen_point))) *
                          price_per_point
                        : 'Calculating',
               })
            }
         })
      })
      // for those who have not seen sequence
      const unseenPlayers = players.filter((player) => {
         return !seenSequenceId.includes(player.id)
      })
      unseenPlayers.forEach((player) => {
         result.push({
            id: player.id,
            player_name: player.player_name,
            winner: false,
            seenSequence: false,
            points: (parseFloat(total_point) + parseFloat(maal_unseed_point)) * price_per_point * -1,
         })
      })
      // for winner
      //first remove duplicates keys
      let unique_result = [...new Map(result.map((item) => [item['id'], item])).values()]
      let sum_2 = 0
      let point_for_winner = unique_result.map((player) => {
         if (!player.winner) sum_2 = sum_2 + parseFloat(player.points)
         return sum_2
      })
      // point_for_winner = point_for_winner.at(-1)
      point_for_winner = point_for_winner[point_for_winner.length - 1]

      unique_result.forEach((player) => {
         if (player.winner) {
            unique_result.push({ ...player, points: point_for_winner * -1 })
         }
      })
      unique_result = [...new Map(unique_result.map((item) => [item['id'], item])).values()]
      dispatch(add_game_result(unique_result))
   }
   return (
      <>
         <Container>
            <p>Game Options:</p>
            <div>
               <Link to='/' onClick={() => dispatch(change_gamePlaying(false))}>
                  logout
               </Link>
               <div>Maal Seen Points: {maal_seen_point}</div>
               <div>Maal Unseen Points: {maal_unseed_point}</div>
               <div>Mistake Charge: {mistake_penalty_point}</div>
               <div></div>
               <div>
                  <table
                     style={{
                        width: '100%',
                        padding: '0',
                     }}
                  >
                     <tbody>
                        <tr>
                           <th className='th--left'>Players</th>

                           {players?.map((player) => {
                              let svg = createAvatar(style, {
                                 seed: player.player_name,
                                 dataUri: true,
                              })
                              return (
                                 <th key={player.id}>
                                    <img src={svg} alt='Avatar' height='25px' className='avatar__image' />
                                    <div style={{ fontSize: '0.75rem' }}>{player.player_name}</div>
                                 </th>
                              )
                           })}
                        </tr>
                     </tbody>
                     <tbody>
                        <tr>
                           <th className='th--left'>Gamer</th>
                           {players?.map((player) => {
                              return (
                                 <td key={player.id}>
                                    <input
                                       type='radio'
                                       onChange={() => handleGamerRadio(player.id)}
                                       checked={player.id === gamerId}
                                    />
                                 </td>
                              )
                           })}
                        </tr>
                     </tbody>
                     <tbody>
                        <tr>
                           <th className='th--left'>Seen Sequence</th>

                           {players?.map((player) => {
                              return (
                                 <td key={player.id}>
                                    <input
                                       type='checkbox'
                                       value={player.id}
                                       onChange={() => handleSeenSequence(player.id)}
                                       checked={seenSequenceId.includes(player.id)}
                                       disabled={gamerId === player.id}
                                    />
                                 </td>
                              )
                           })}
                        </tr>
                     </tbody>
                     <tbody>
                        <tr>
                           <th className='th--left'>Points</th>
                           {players?.map((player) => {
                              return (
                                 <td key={player.id}>
                                    <input
                                       style={{ width: '3rem', padding: '0rem' }}
                                       className={seenSequenceId.includes(player.id) ? '' : 'disable_input'}
                                       maxLength='3'
                                       id={player.id}
                                       disabled={!seenSequenceId.includes(player.id)}
                                       onChange={(e) => handlePointChange(e.target.value, player.id)}
                                    />
                                 </td>
                              )
                           })}
                        </tr>
                     </tbody>
                  </table>
                  <button
                     style={{
                        width: '100%',
                        padding: '0.7rem 1rem',
                        margin: '0.7rem 0',
                     }}
                     onClick={() => calculate()}
                  >
                     Calculate
                  </button>
                  <div>
                     <table
                        style={{
                           width: '100%',
                           padding: '0',
                        }}
                     >
                        <tbody>
                           <tr>
                              {players?.map((player) => {
                                 let svg = createAvatar(style, {
                                    seed: player.player_name,
                                    dataUri: true,
                                 })
                                 return (
                                    <th key={player.id}>
                                       <img src={svg} alt='Avatar' height='25px' className='avatar__image' />
                                       <div style={{ fontSize: '0.75rem' }}>{player.player_name}</div>
                                    </th>
                                 )
                              })}
                           </tr>
                        </tbody>
                        <tbody>
                           <tr>
                              {players?.map((player) => {
                                 let sum = 0

                                 const a = history?.map((item) => {
                                    const i = item.map((history_player) => {
                                       if (history_player.player_name === player.player_name) {
                                          sum = sum + parseFloat(history_player.points)
                                          return (
                                             <span>
                                                {history_player.points}
                                                {history_player.winner ? (
                                                   <svg
                                                      xmlns='http://www.w3.org/2000/svg'
                                                      class='icon icon-tabler icon-tabler-crown'
                                                      width='16'
                                                      height='16'
                                                      viewBox='0 0 24 24'
                                                      stroke-width='2'
                                                      stroke='#ffbf00'
                                                      fill='none'
                                                      stroke-linecap='round'
                                                      stroke-linejoin='round'
                                                   >
                                                      <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                                                      <path d='M12 6l4 6l5 -4l-2 10h-14l-2 -10l5 4z' />
                                                   </svg>
                                                ) : (
                                                   ''
                                                )}
                                                {history_player.seenSequence && !history_player.winner ? (
                                                   <svg
                                                      xmlns='http://www.w3.org/2000/svg'
                                                      class='icon icon-tabler icon-tabler-eye-check'
                                                      width='12'
                                                      height='12'
                                                      viewBox='0 0 24 24'
                                                      stroke-width='1'
                                                      stroke='#009988'
                                                      fill='none'
                                                      stroke-linecap='round'
                                                      stroke-linejoin='round'
                                                   >
                                                      <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                                                      <circle cx='12' cy='12' r='2' />
                                                      <path d='M12 19c-4 0 -7.333 -2.333 -10 -7c2.667 -4.667 6 -7 10 -7s7.333 2.333 10 7c-.42 .736 -.858 1.414 -1.311 2.033' />
                                                      <path d='M15 19l2 2l4 -4' />
                                                   </svg>
                                                ) : (
                                                   ''
                                                )}
                                                {!history_player.seenSequence && !history_player.winner ? (
                                                   <svg
                                                      xmlns='http://www.w3.org/2000/svg'
                                                      class='icon icon-tabler icon-tabler-eye-off'
                                                      width='12'
                                                      height='12'
                                                      viewBox='0 0 24 24'
                                                      stroke-width='1'
                                                      stroke='#ff2825'
                                                      fill='none'
                                                      stroke-linecap='round'
                                                      stroke-linejoin='round'
                                                   >
                                                      <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                                                      <line x1='3' y1='3' x2='21' y2='21' />
                                                      <path d='M10.584 10.587a2 2 0 0 0 2.828 2.83' />
                                                      <path d='M9.363 5.365a9.466 9.466 0 0 1 2.637 -.365c4 0 7.333 2.333 10 7c-.778 1.361 -1.612 2.524 -2.503 3.488m-2.14 1.861c-1.631 1.1 -3.415 1.651 -5.357 1.651c-4 0 -7.333 -2.333 -10 -7c1.369 -2.395 2.913 -4.175 4.632 -5.341' />
                                                   </svg>
                                                ) : (
                                                   ''
                                                )}

                                                <br />
                                             </span>
                                          )
                                       }
                                    })
                                    return <>{i}</>
                                 })
                                 return (
                                    <td>
                                       {a}
                                       <div style={{ borderTop: '1px solid #dcdbda', padding: '0.7rem 0 ' }}>{sum}</div>

                                       <br />
                                    </td>
                                 )
                              })}
                           </tr>
                        </tbody>
                        <tbody>
                           <tr>
                              {/* {players?.map((player) => {
                                 const a = history?.map((item) => {
                                    const i = item.map((history_player) => {
                                       if (history_player.player_name === player.player_name) {
                                          return {}
                                       }
                                    })
                                    return i
                                 })
                                 return a
                              })} */}
                           </tr>
                        </tbody>
                     </table>
                  </div>
               </div>
            </div>
         </Container>
      </>
   )
}

export default Gamepage
