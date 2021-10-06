const Container = (props) => {
   return (
      <div
         style={{
            position: 'absolute',
            // top: '50%',
            left: '50%',
            transform: `translate(-50%,0)`,
            margin: '1rem 0',
            padding: '1.6rem',
            // width: '80%',
            backgroundColor: 'white',
         }}
         className='container'
      >
         {props.children}
      </div>
   )
}

export default Container
