import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { createAvatar } from '@dicebear/avatars'
import * as style from '@dicebear/avatars-avataaars-sprites'
import { useHistory } from 'react-router-dom'

const GamePage = () => {
   const history = useHistory()
   const [players, setPlayers] = useState(JSON.parse(localStorage.getItem('players')))
   const [gamer, setGamer] = useState()
   const [extra_points_for_seen, set_extra_points_for_seen] = useState(localStorage.getItem('extra_points_for_seen') || 3)
   const [extra_points_for_unseen, set_extra_points_for_unseen] = useState(localStorage.getItem('extra_points_for_unseen') || 4)
   const [no_of_players, set_noOfPlayers] = useState(localStorage.getItem('no_of_players'))
   const [pay, setPay] = useState({})
   const [error, setError] = useState(false)
   // const [no_of_players, _] = useState(localStorage.getItem('no_of_players'))
   useEffect(() => {
      if (!JSON.parse(localStorage.getItem('players'))) {
         history.push('/')
      }
   })
   const handleSeenRadio = (key) => {
      setPlayers((prev) => {
         return {
            ...prev,
            [key]: {
               name: prev[key].name,
               points: prev[key].points ? prev[key].points : 0,
               seenSequence: players[key].seenSequence ? false : true,
            },
         }
      })
   }
   const handlePlayerPoint = (e, key) => {
      e.preventDefault()
      setPlayers((prev) => {
         return {
            ...prev,
            [key]: {
               name: prev[key].name,
               seenSequence: players[key].seenSequence ? players[key].seenSequence : false,
               points: e.target.value,
               // points: e.target.value,
            },
         }
      })
   }
   const onGamerChange = (name, key) => {
      setGamer(name)
   }
   useEffect(() => {
      localStorage.setItem('price_per_point', 5)
      localStorage.setItem('extra_points_for_seen', 3)
      localStorage.setItem('extra_points_for_unseen', 10)
   }, [])
   useEffect(() => {
      localStorage.setItem('players', JSON.stringify(players))
   }, [players])

   const calculateTotalPoints = () => {
      // setGamer(undefined)
      let seenSequenceAtLeastOnce = Object.entries(players).map(([key, value], index) => {
         if (value.seenSequence !== undefined && value.seenSequence === true) {
            return true
         } else {
            return false
         }
      })

      if (seenSequenceAtLeastOnce.find((arr) => arr === true)) {
         let maal = Object.entries(players).map(([key, value], index) => {
            if (value.points !== undefined && value.seenSequence === true && value.points >= 0) {
               return true
            } else {
               return false
            }
         })
         // setError(false)
         if (!gamer) {
            toast.warn('Please add who ended the game')
            setError(true)
         } else {
            let arr
            if (localStorage.getItem('gamer')) {
               arr = JSON.parse(localStorage.getItem('gamer'))
               localStorage.setItem('gamer', JSON.stringify([...arr, gamer]))
            } else {
               localStorage.setItem('gamer', JSON.stringify([gamer]))
            }

            setGamer(undefined)
            let players_temp = JSON.parse(localStorage.getItem('players'))
            let totalPoints = 0
            let total_with_extra = {}
            let total_with_noOfPlayers = {}
            let pay = {}
            Object.entries(players_temp).map(([key, value], index) => {
               if (value.seenSequence) {
                  totalPoints = parseInt(totalPoints) + parseInt(value.points)
                  if (value.name !== gamer) {
                     console.log(value.points)
                     total_with_noOfPlayers[`${value.name}`] = value.points * no_of_players
                  }
               }
            })
            Object.entries(players_temp).map(([key, value], index) => {
               if (value.seenSequence) {
                  // console.log(`${value.name}`, value.points)
                  if (value.name !== gamer) {
                     total_with_extra[`${value.name}`] = parseInt(totalPoints) + parseInt(extra_points_for_seen)
                  }
               } else {
                  total_with_extra[`${value.name}`] = parseInt(totalPoints) + parseInt(extra_points_for_unseen)
               }
            })
            console.table(players)
            console.table(total_with_noOfPlayers)
            console.table(total_with_extra)

            Object.entries(total_with_extra).map(([key1, value1], index) => {
               Object.entries(total_with_noOfPlayers).map(([key2, value2], index) => {
                  console.log(key1, key2, value1, value2)
                  if (key1 === key2) {
                     pay[`${key1}`] = parseInt(value2) - parseInt(value1)
                  } else if (key1 in total_with_noOfPlayers === false) {
                     pay[`${key1}`] = parseInt(value1) - parseInt(value1) * 2
                  }
               })
            })
            console.table(pay)
            setPay(pay)
            Object.entries(players).map(([key, value], index) => {
               setPlayers((prev) => {
                  return {
                     ...prev,
                     [key]: {
                        name: prev[key].name,
                        points: '0',
                        seenSequence: false,
                     },
                  }
               })
               // console.log('AFTER', players)
            })

            // localStorage.setItem('players', JSON.stringify(players))
         }
      } else {
         setError('Atleast one must show sequence')
         toast.warn('Atleast one must show sequence')
      }
   }
   return (
      <div className='wrapper'>
         <div className='container gamepage'>
            <table className='table' cellSpacing='0'>
               <tbody>
                  <tr>
                     <th>Players</th>
                     {players &&
                        Object.entries(players).map(([key, value], index) => {
                           //    console.log(`playerIndex : ${key}, player name :${value.name}`)
                           let svg = createAvatar(style, {
                              seed: value.name,
                              dataUri: true,
                           })
                           return (
                              <th key={index}>
                                 <div>{value.name !== '' && <img src={svg} alt='Avatar' height='45px' className='avatar__image' />}</div>
                                 <small>{value.name}</small>
                              </th>
                           )
                        })}
                  </tr>
               </tbody>
               <tbody>
                  <tr>
                     <th>Seen Sequence?</th>
                     {players &&
                        Object.entries(players).map(([key, value], index) => {
                           return (
                              <td key={index}>
                                 <input type='radio' onClick={() => handleSeenRadio(key)} checked={players[key].seenSequence} />
                              </td>
                           )
                        })}
                  </tr>
               </tbody>
               <tbody>
                  <tr>
                     <th>Points : </th>
                     {players &&
                        Object.entries(players).map(([key, value], index) => {
                           return (
                              <td key={index}>
                                 <input
                                    type='number'
                                    className='table__points'
                                    max='300'
                                    onChange={(e) => handlePlayerPoint(e, key)}
                                    value={players[key].points}
                                 />
                              </td>
                           )
                        })}
                  </tr>
               </tbody>
               <tbody>
                  <tr>
                     <th>Who is the gamer : </th>
                     {players &&
                        Object.entries(players).map(([key, value], index) => {
                           return (
                              <td key={index}>
                                 <input
                                    type='radio'
                                    key={index}
                                    value={players[key].name}
                                    onClick={(e) => onGamerChange(e.target.value, 'player1')}
                                    checked={players[key].name === gamer}
                                 />
                              </td>
                           )
                        })}
                  </tr>
               </tbody>
            </table>

            <div
               class='button_slide slide_left button_calculate'
               onClick={() => {
                  calculateTotalPoints()
               }}
            >
               Calculate Points
            </div>
            <div>
               {pay &&
                  Object.entries(pay).map(([key, value], index) => {
                     return (
                        <div>
                           <h1>{`${key} : ${value}`}</h1>
                        </div>
                     )
                  })}
            </div>
         </div>
      </div>
   )
}

export default GamePage
