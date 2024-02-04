import React from 'react'
import { useState } from 'react';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Logo from "../../images/—Pngtree—logo killer_661.png"
import { useNavigate } from 'react-router-dom';
const Login = ({setEmail}) => {
        const [datas, setDatas] = useState({
          username:'kminchelle',
          password: '0lelplR',
        });
      
        const [visible, setVisible] = useState(false);
      const usenavigate=useNavigate();
        const toogle = () => {
          setVisible(!visible);
        };
      
        const [errors, setErrors] = useState({
          username: "",
          password: "",
        });
      
        const handleChange = (e) => {
          const { name, value } = e.target;
          setDatas({
            ...datas,
            [name]: value,
          });
        };
      
        const handleSubmit = (e) => {
            e.preventDefault();
          
            const err = {};
            if (!datas.username.trim()) {
              err.username = "Username is required";
            }
            if (!datas.password.trim()) {
              err.password = "Password is required";
            }
            setErrors(err);
          
            if (Object.keys(err).length === 0) {
              fetch('https://dummyjson.com/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: datas.username,
                    password: datas.password,
                }),
              })
              .then(res => res.json())
              .then((res) => {
            console.log(res);
              if (res.token) {
                setEmail(res.email);
        window.localStorage.setItem("token", res.token);
        // alert("Login successful");
        usenavigate("/dashboard")
      } else {
        alert("Email and password doesn't match");
      }
    })
                   .catch(error => {
                  alert(`Error during login:`);
                });
            }
          };
          
        
      
  return (
    <div className="flex justify-items-center mt-4 overflow-hidden  ">
      <div className="flex flex-col mt-6 pb-6 mx-auto bg-gray-100 px-10">
      <img src={Logo} alt="logo" className='mt-2' />
        <h1 className="text-center text-2xl font-semibold my-4">Sign in to your Account</h1>
        <label className='px-2.5'>Username</label>
        <input type="text" 
          name="username" 
          value={datas.username}
          onChange={handleChange}
         placeholder="Username"
          className="p-2.5 m-2.5 rounded-lg border-2 w-full" />

        {errors.username && <p className="text-red-500 text-center">{errors.username}</p>}
        <div className="relative">
            <label className='p-2.5'>Password</label>
          <input
            name="password"
            value={datas.password}
            onChange={handleChange}
            type={visible ? "text" : "password"}
            placeholder="password"
            className="p-2.5 m-2.5 rounded-lg border-2  w-full"
          />
          {visible === false ? (
            <FaEyeSlash className="absolute top-12 right-0 h-6 w-6" onClick={toogle} />
          ) : (
            <FaEye className="absolute top-12 right-0 h-6 w-6" onClick={toogle} />
          )}
          {errors.password && <p className="text-red-500 text-center">{errors.password}</p>}
        </div>
        <button onClick={handleSubmit} className="bg-primary text-white p-2.5 m-2.5 w-full rounded-lg">
          Sign in
        </button>
      </div>
     
    </div>
  )
}

export default Login
