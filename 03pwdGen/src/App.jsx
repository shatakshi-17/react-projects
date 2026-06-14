import { useState, useCallback, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState('')

//we need to make a function to copy the password to the clipboard
const passwordRef = useRef(null)

  //we need to make a function to generate a password
  //but also note that the number checkbox and char checkbox actions also trigger password generation
  //so we need useCallback to memoize the function
  //useCallback is used to cache a function definition between re-renders
  const passwordGenerator = useCallback(() => {
    let password = ''
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    if(numberAllowed) str += '0123456789'
    if(charAllowed) str += '!@#$%^&*()_+-=[]{}|;:,.<>?'
    for(let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      password += str.charAt(char)
    }
    setPassword(password)
  }, [length, numberAllowed, charAllowed, setPassword])

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current.select() //this line highlights the password in the input field
    window.navigator.clipboard.writeText(password)   //this line copies the password to the clipboard
  }, [password])

  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, charAllowed])
  //explanation: useEffect is used to run a function after the component renders
  //we want to run the passwordGenerator function when the length, numberAllowed, or charAllowed state changes
  //so we pass the length, numberAllowed and charAllowed  as the dependency array
  

  return (
    <>
    <h1 className='text-3xl font-bold underline'>Password Generator</h1>
    <div className='w-full max-w-md mx-auto'>
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input type='text' value={password} className='outline-none w-full py-1 px-3' placeholder='Password' readOnly ref={passwordRef} />
        <button onClick={copyPasswordToClipboard} className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>Copy</button>
      </div>
      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input type='range' min={8} max={50} value={length} className='cursor-pointer' onChange={e => setLength(e.target.value)} />
          <label htmlFor='length'>Length: {length}</label>
      </div>
      <div className='flex items-center gap-x-1'>
          <input type='checkbox' defaultChecked={numberAllowed} id='number' onChange={() => setNumberAllowed(!numberAllowed)} />
          <label htmlFor='number'>Number Allowed</label>
      </div>
      <div className='flex items-center gap-x-1'>
          <input type='checkbox' defaultChecked={charAllowed} id='char' onChange={() => setCharAllowed(!charAllowed)} />
          <label htmlFor='char'>Character Allowed</label>
        </div>
      </div>
      <button className='block w-full rounded-lg bg-blue-700 text-white font-semibold mt-4 py-2' onClick={passwordGenerator}>Generate Password</button>
    </div>
    </>
  )
}

export default App


//difference between usecase of useCallback and useEffect
//useCallback is to optimise the method of re-rendering by memoizing the function
//whereas useEffect is responsible for running the function if any changes occur in the component
//for example here: 
//we want to run the passwordGenerator function when the length, numberAllowed, or charAllowed state changes
//so we useEffect
//but if we want to run the passwordGenerator function when the component renders, we use useCallback
