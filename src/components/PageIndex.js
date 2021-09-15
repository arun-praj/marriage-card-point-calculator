import { useState } from 'react'
// import { toast } from 'react-toastify'
import { createAvatar } from '@dicebear/avatars'
import * as style from '@dicebear/avatars-avataaars-sprites'
// import
import '../scss/app.scss'
import { useHistory } from 'react-router-dom'

const PageIndex = () => {
   let history = useHistory()
   const [noOfPlayers, setnoOfPlayers] = useState(0)
   const [users, setUser] = useState({})

   const inputFields = []

   for (let i = 1; i <= noOfPlayers; i++) {
      inputFields.push(
         <div key={i} className='container__form__div'>
            <input
               className='container__form__div__input'
               placeholder={`Player ${i}`}
               key={i}
               value={users && users[`player${i}`] && users[`player${i}`].name ? users[`player${i}`].name : undefined}
               onChange={(e) => {
                  setUser((prev) => ({
                     ...prev,
                     [`player${i}`]: {
                        name: e.target.value,
                     },
                  }))
               }}
            />
            <label htmlFor='' className='container__label'>
               Player {i}
            </label>
         </div>
      )
   }

   const onStartGameClick = () => {
      localStorage.setItem('no_of_players', noOfPlayers)
      localStorage.setItem('players', JSON.stringify(users))
      localStorage.setItem('page', 2)
      localStorage.setItem('gamer', [])
      history.push('/game')
   }

   return (
      <div className='wrapper'>
         <div className='container'>
            <div className='container__heading'>Marriage Card point Calculator</div>
            <div className='wavy'></div>
            <div className='container__body'>
               <div className='container__heading2'>No of Players? </div>

               <div className='radio-btn'>
                  <input
                     className='radio-btn__input'
                     type='radio'
                     id='option1'
                     value={2}
                     defaultChecked={noOfPlayers === 2}
                     onClick={() => {
                        setnoOfPlayers(2)
                        if (users && users['player3']) {
                           delete users['player3']
                        }
                        if (users && users['player4']) {
                           delete users['player4']
                        }
                        if (users && users['player5']) {
                           delete users['player5']
                        }
                     }}
                  />
                  <label htmlFor='option1' className={`${noOfPlayers === 2 ? 'radio--selected' : null} radio-btn__label`}>
                     2
                  </label>
                  <input
                     className='radio-btn__input'
                     type='radio'
                     id='option2'
                     value={3}
                     defaultChecked={noOfPlayers === 3}
                     onClick={() => {
                        setnoOfPlayers(3)
                        if (users && users['player4']) delete users['player4']
                        if (users && users['player5']) delete users['player5']
                     }}
                  />
                  <label htmlFor='option2' className={`${noOfPlayers === 3 ? 'radio--selected' : null} radio-btn__label`}>
                     3
                  </label>
                  <input
                     className='radio-btn__input'
                     type='radio'
                     id='option3'
                     value={4}
                     defaultChecked={noOfPlayers === 4}
                     onClick={() => {
                        setnoOfPlayers(4)
                        if (users && users['player5']) delete users['player5']
                     }}
                  />
                  <label htmlFor='option3' className={`${noOfPlayers === 4 ? 'radio--selected' : null} radio-btn__label`}>
                     4
                  </label>
                  <input
                     className='radio-btn__input'
                     type='radio'
                     id='option4'
                     value={5}
                     defaultChecked={noOfPlayers === 5}
                     onClick={() => {
                        setnoOfPlayers(5)
                        localStorage.removeItem('players')
                        setUser(null)
                     }}
                  />
                  <label htmlFor='option4' className={`${noOfPlayers === 5 ? 'radio--selected' : null} radio-btn__label`}>
                     5
                  </label>
               </div>
               {/* <input className='container__input' type='text' placeholder='eg. 5' value={noOfPlayers} onChange={(e) => validateNumberOfPlayers(e)} /> */}
               {noOfPlayers > 0 ? <div className='container__heading2'>Enter the names of {noOfPlayers} players</div> : null}
               <div className='container__form'>
                  {inputFields}
                  <div className='avatar'>
                     {users &&
                        Object.entries(users).map(([key, value], index) => {
                           let svg = createAvatar(style, {
                              seed: value.name,
                              dataUri: true,
                           })
                           return <>{value.name !== '' && <img src={svg} alt='Avatar' height='45px' className='avatar__image' />}</>
                        })}
                  </div>

                  {}
                  <main>
                     <span>
                        {noOfPlayers && users && Object.keys(users).length === noOfPlayers ? (
                           <div class='button_slide slide_left' onClick={() => onStartGameClick()}>
                              Start Game
                           </div>
                        ) : null}
                     </span>
                  </main>
               </div>
            </div>
         </div>
      </div>
   )
}

export default PageIndex
