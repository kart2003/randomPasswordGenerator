import { useState,useCallback,useEffect,useRef} from 'react'

function App() {
  const[length,setLength] = useState(8);
  const[noAllowed,setnoAllowed] = useState(false);
  const[charAllowed,setcharAllowed] = useState(false);
  const[password,setPassword] = useState("");

  const passRef = useRef(null)

  const passwordGenerator = useCallback(() =>{
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
     
    if(noAllowed) str+="0123456789"
    if(charAllowed) str+="!@#$%&*_-|/?"

    for(let i=1;i<length;i++){
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  },[length,noAllowed,charAllowed,setPassword])

const copyToClip = ()=>{
  passRef.current?.select();
  window.navigator.clipboard.writeText(password);
}

  useEffect(()=>{
    passwordGenerator()
  },[length,noAllowed,charAllowed,passwordGenerator])
  return (
   <>
      <div className="w-full text-orange-500 max-w-md rounded-lg px-4 my-8 shadow-md mx-auto bg-gray-700 text-xl">
        <h1 className='text-white text-center my-3'>Password Generator</h1>
        <div className=' flex shadow overflow-hidden mb-4 p-5'>
          <input type="text" value={password} className='outline-none w-full py-3 px-3' placeholder='password' readOnly ref={passRef}/>
          <button onClick={copyToClip} className='outline-none bg-blue-700 px-3 py-1 shrink-0 text-white'>copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className="flex items-center gap-x-1">
            <input type="range" min={6} max={100} value={length} className='cursor-pointer'
             onChange={(e) => {setLength(e.target.value)}} />
            <label>Length: {length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox" defaultChecked ={noAllowed} id='numberInput'
             onChange={()=>{setnoAllowed((prev)=>!prev)}} />
             <label htmlFor='numberInput'>Numbers</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox" defaultChecked ={charAllowed} id='charInput'
             onChange={()=>{setcharAllowed((prev)=>!prev)}} />
             <label htmlFor='charInput'>Characters</label>
          </div>

        </div>
      </div>
   </>
  )
}

export default App
