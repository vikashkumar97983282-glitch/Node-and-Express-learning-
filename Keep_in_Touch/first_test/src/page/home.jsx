import React from "react";
import axios from "axios";
import { useState } from "react";
// import { useEffect } from "react";

function Home(){


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


    const deleteuser = async (name)=>{
        console.log(name);
        try{
            let res = await axios.delete(`${API}delete/${name}`);
            console.log(res);
            fetchdata();
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    }


    
    

    return (
        <div >
            <div className="bg-blue-500 flex justify-center items-center h-12">
                <h1 className="text-4xl font-bold">Welcome to Home Page</h1>
                
            </div>
            <button onClick={fetchdata} className="bg-green-500 text-white ml-5 mt-5 p-2 rounded-2xl cursor-pointer">
            go to upload
        </button>
            <div className=" mb-5 flex flex-wrap">{user.map((user,idx)=>{
                return <div key={idx} className="bg-green-400 w-90 text-start m-5 rounded-2xl">
                    <p className="ml-4 w-90 text-2xl">name: {user.name}</p>
                    <p className="ml-4 w-90 text-2xl">age: {user.age}</p>
                    <p className="ml-4 w-90 text-2xl">email: {user.email}</p>
                    <button onClick={()=>deleteuser(user.name)} className="bg-red-500 text-white h-9 m-5 p-2 rounded-2xl cursor-pointer">
            delete
        </button>
                </div>
            })}</div>
        
        <a href="/upload" className="bg-blue-500 text-white ml-5 p-2 rounded">
            go to upload
        </a>
        </div>
    )
}

export default Home;