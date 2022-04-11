import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

export const Signup = () => {
    const [credential_email, setcredential_email] = useState("")
    const [credential_password, setcredential_password] = useState("")
    const onChange1 = (e) =>{
        setcredential_email(e.target.value)
    }
    const onChange2 = (e) =>{
        setcredential_password(e.target.value)
    }
    let navigate = useNavigate();
    const responseGoogle = (response) => {
        console.log(response);
    }
    const redirectLogin = (response) =>{
        // console.log(response);
        let user_data = {}
        if(response.profileObj){
            user_data.name = (response.profileObj).name;
            user_data.email = (response.profileObj).email;
            user_data.password = response.profileObj.googleId;
            user_data.photo = (response.profileObj).imageUrl;

            
        }
        navigate("/login")
    }
    const signup = async (e)=>{
        e.preventDefault();
        
        const response1 = await fetch(`http://localhost:5000/api/auth/createuser`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    
                },
                body:JSON.stringify({email:credential_email,password:credential_password})
            });
            const json = await response1.json();
            console.log(json);
            if(!json.error){
                localStorage.setItem('authentication-token',json.authToken);
                console.log(json.authToken);
                navigate("/login")
            }
    }
    
    return (
        <form className='grid grid-cols-1 lg:grid-cols-3 py-28 mx-4 md:mx-16 lg:mx-28' onSubmit={signup}>
            <div></div>
            <div className='border border-[#BDBDBD] rounded-lg pt-4 pb-8'>
                <div className='flex flex-col space-y-4 pl-16 pr-28'>
                    <div></div>
                    <div>
                        <img src="/assets/devchallenges.svg" alt="" />
                    </div>
                    <div className='text-lg font-semibold'>
                        Join thousands of learners from around the world
                    </div>
                    <div className='text-md font-normal'>
                        Master web development by making real-life projects. There are multiple paths for you to choose
                    </div>
                    <div className='border-[#BDBDBD] border rounded text-[#828282] flex flex-row space-x-2 p-2'>
                        <div><svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                        </svg></div>
                        <input type="email" name="email" id='email' value={credential_email} onChange={onChange1} className='w-full outline-none' placeholder='Email' />
                    </div>
                    <div className='border-[#BDBDBD] border rounded text-[#828282] flex flex-row space-x-2 p-2'>
                        <div> <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                        </svg></div>
                        <input type="password" name='password' id='password' value={credential_password} onChange={onChange2} className='w-full outline-none' placeholder='Password' />
                    </div>
                    <button className='bg-[#2F80ED] rounded text-[#FFFFFF] text-md font-semibold text-center pr-1 pl-1 pt-2 pb-2 cursor-pointer'>
                        Start coding now
                    </button>
                    
                    <div className='text-sm space-x-2 text-center text-[#828282]'>
                    Already a member? <Link to='/login' className='text-blue-700'>Login</Link>
                    </div>
                </div>
            </div>
            <div></div>
        </form>
    )
}
