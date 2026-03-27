import { useState } from 'react';
import './App.css'
import axios from 'axios'
import { useEffect } from 'react';

function App() {


  const [data,setData] = useState([]);

  useEffect(()=>{
    const fetch = async ()=>{

    try{
      const res = await axios.get("http://localhost:3000/show");
      console.log(res.data);res.data
      setData(res.data)
    } catch(err){
      console.log(err)
    }
  }
  fetch();
  
  },[])

  return (
    <>
      <div className="bg-red-600">WELCOME TO KEEP_IN_TOUCH</div>
      <section id="spacer"></section>
      <button onClick={fetch}>click me</button>
      <div className='flex flex-wrap gap-2 ml-2'>{data.map((user,idx)=>{
        return <div key={idx} className='w-70 h-40 bg-amber-400 mt-5  gap-2 flex flex-col items-center justify-center text-2xl'>
          <h1>{user.name}</h1>
          <h1>{user.username}</h1>
          <h1>{user.email}</h1>
        </div>
       
      })}</div>
      <a href='./form'>go to form</a>
    </>
  )
}

export default App
