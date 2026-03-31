import React from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { useEffect } from "react";

function Home(){

    const navigate = useNavigate();


    const API = 'http://localhost:3000/';

    const [user,setUser] = useState([]);

   
    

    const fetchdata = async ()=>{
        try {
            let res = await axios.get(`${API}users`);
        setUser(res.data);
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    }

    // useEffect(()=>{
    //     data();
    // },[])


    const deleteuser = async (id)=>{
        console.log(id);
        try{
            let res = await axios.post(`${API}delete/${id}`);
            console.log(res);
            fetchdata();
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    }

    const edit = (user)=>{
        navigate("/update",{state:user})
        console.log(user)
    }


    
    

    return (
        <div >
            <div className="bg-blue-500 flex justify-center items-center h-12">
                <h1 className="text-4xl font-bold">Welcome to Home Page</h1>
                
            </div>
            <button onClick={fetchdata} className="bg-green-500 text-white ml-5 mt-5 p-2 rounded-2xl cursor-pointer">
            show data
            </button>
            <div className=" mb-5 flex flex-wrap">{user.map((user,idx)=>{
                return <div key={idx} className="bg-green-400 w-90 text-start m-5 rounded-2xl">
                    {/* <p className="ml-4 w-90 text-2xl">id: {user._id}</p> */}
                    <p className="ml-4 w-90 text-2xl">name: {user.name}</p>
                    <p className="ml-4 w-90 text-2xl">age: {user.age}</p>
                    <p className="ml-4 w-90 text-2xl">email: {user.email}</p>
                    <button onClick={()=>deleteuser(user._id)} className="bg-red-500 text-white h-9 m-5 p-2 rounded-2xl cursor-pointer">
                    delete
                    </button>
                    <button onClick={()=>edit(user)} className="bg-pink-500 text-white h-9 w-15 m-5 p-2 rounded-2xl cursor-pointer">Edit</button>
                </div>
            })}</div>

            
        
        <a href="/upload" className="bg-blue-500 text-white ml-5 p-2 rounded">
            Add user's
        </a>
        </div>
    )
}

export default Home;