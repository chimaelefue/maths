import { useState, useEffect } from 'react';
import './App.css';

let nextId = 3

function App() {
  const [value, setValue] = useState(0)
  const [users, setUsers] = useState([
    { id: 1, name: "Dickson", userName: "user1"},
    { id: 2, name: "Harley", userName: "user2"}
  ])
  const [name, setName] = useState('')
  const [userName, setUserName] = useState('')

  const minusClick = () =>{
    setValue(prevState => value - 1 )
  }


  const plusClick = () =>{
    setValue(prevState => value + 1)
  }

  useEffect(() =>{
    const timeoutId = setTimeout(() => {
      setValue(prevState => value + 1)
    }, 2000)
    // cleanup function
    return () => clearTimeout(timeoutId)
  }, [value]);

  return (
    <>
    <div className="App">
      <button onClick= {minusClick}>
        Minus
      </button>

      <p
      className={`display
        ${value >= 10 ? "changeColorTen" : ""}
        ${value >= 20 ? "changeColorTwenty" : null}
        `}
      >
        {value}
      </p>

      <button onClick= {plusClick}>
        Plus
      </button>
    </div>
    <div className='containerDisplay'>

    {users && users.map((items) => (
      <div className='userDisplay' key = {items.id} >
        <p className='name'> <span>Name:</span> <span>{items.name}</span> </p>
        <p className='userName'> <span>Username:</span> <span>{items.userName}</span> </p>

        <button
        onClick={() => {
          setUsers(
            users.filter(a =>
              a.id !== items.id
            )
          );
        }}
        >Delete User</button>

      </div>
    ) )} 
    </div>
      
    <div className='containerForm'>
      <form>
        <div className='userForm'>
          <input 
          type = "text" 
          placeholder='Name...' 
          value={name} 
          onChange = { (e) => setName(e.target.value)}
          >
          </input>

          <input 
          type = "text" 
          placeholder='Username...' 
          value={userName}
          onChange = { (e) => setUserName(e.target.value) }
          >
          </input>

          <button
          onClick={ (e)=> {
            e.preventDefault()
            setName('');
            setUserName('');
            const data = {
              id: nextId++, name: name, userName: userName
            }
            setUsers((users) => [
              ...users, data  
            ])
          }}
          >
            Submit</button>
        </div>
      </form>
    </div>
      
    
    </>
  );
}

export default App;
