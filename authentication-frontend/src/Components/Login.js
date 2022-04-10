import React, { useState } from 'react'
import GoogleLogin from 'react-google-login';
import { Link, useNavigate } from 'react-router-dom'
export const Login = (props) => {
    let navigate = useNavigate();
    const [Credentials, setCredentials] = useState("");
    const [Credential, setCredential] = useState("");
    const OnChange = (e)=>{
        setCredentials(e.target.value);
    }
    const onChange = (e)=>{
        setCredential(e.target.value);
    }
    const responseGoogle = (response) => {
        console.log(response);
      }
    const redirectLogin = async (response) =>{
        console.log(response);
        let user_data = {}
        if(response.profileObj){
            user_data.name = (response.profileObj).name;
            user_data.email = (response.profileObj).email;
            let googleid = response.profileObj.googleId.split("");
            googleid = googleid.reverse();
            googleid = googleid.join("");
            user_data.password =googleid;
            user_data.photo = (response.profileObj).imageUrl;
            // console.log(user_data);
            props.setdata(user_data);
            const response1 = await fetch(`http://localhost:5000/api/auth/guser`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // 'authentication-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIyYzM4Y2YwMmRlZDk0OTRlZjUwYWFhIn0sImlhdCI6MTY0NzA2NTMxNX0.K6Ab9HeHbbTeqIAfH8TzAxo493JT2nAgNiZgUtF68eQ'
    
                },
                body:JSON.stringify({email:user_data.email,password:user_data.password,photo:user_data.photo,name:user_data.name})
            });
            const json = await response1.json();
            console.log(json);
            if(!json.error){
                localStorage.setItem('authentication-token',json.authToken);
                console.log(json.authToken);
                navigate("/")
            }
        }
    }
    const handleSubmit = async (e)=>{
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // 'authentication-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIyYzM4Y2YwMmRlZDk0OTRlZjUwYWFhIn0sImlhdCI6MTY0NzA2NTMxNX0.K6Ab9HeHbbTeqIAfH8TzAxo493JT2nAgNiZgUtF68eQ'

            },
            body:JSON.stringify({email:Credentials,password:Credential})
        });
        const json = await response.json();
        console.log(json);
        if(!json.error){
            localStorage.setItem('authentication-token',json.authToken);
            console.log(json.authToken);
            const response1 = await fetch(`http://localhost:5000/api/auth/getuser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authentication-token': json.authToken

            },
        });
        const json1 = await response1.json();
        // console.log(json1);
        props.setdata(json1);
            navigate("/")
        }
        else{
            // redirect
            alert("Incorrect Credentials");
        }
    }
      
    return (
        <form onSubmit={handleSubmit}>
        <div className='grid grid-cols-1 lg:grid-cols-3 py-28 mx-4 md:mx-16 lg:mx-28'>
            <div></div>
            <div className='border border-[#BDBDBD] rounded-lg pt-4 pb-8'>
                <div className='flex flex-col space-y-4 pl-16 pr-28'>
                    <div></div>
                    <div>
                        <img src="/assets/devchallenges.svg" alt="" />
                    </div>
                    <div className='text-lg font-semibold'>
                        Login
                    </div>
                    <div className='border-[#BDBDBD] border rounded text-[#828282] flex flex-row space-x-2 p-2'>
                        <div><svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                        </svg></div>
                        <input type="email" className='w-full outline-none' placeholder='Email' value={Credentials} onChange={OnChange}  required />
                    </div>
                    <div className='border-[#BDBDBD] border rounded text-[#828282] flex flex-row space-x-2 p-2'>
                        <div> <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                        </svg></div>
                        <input type="password" className='w-full outline-none'  value={Credential} onChange={onChange} placeholder='Password' required  />
                    </div>
                    <button className='bg-[#2F80ED] rounded text-[#FFFFFF] text-md font-semibold text-center pr-1 pl-1 pt-2 pb-2 cursor-pointer'>
                        Start coding now
                    </button>
                    <div className='text-[#828282] text-sm text-center'>
                        or continue with these social profile
                    </div>
                    <div className='flex flex-row justify-center items-center space-x-5'>
                    <GoogleLogin
    clientId="795036138117-hugj2ismoeil60kjpleafh4cja22uccv.apps.googleusercontent.com"
    render={renderProps => (
      <button onClick={renderProps.onClick} disabled={renderProps.disabled}><img src="/assets/Google.svg" alt="" /></button>
    )}
    buttonText="Login"
    onSuccess={redirectLogin}
    onFailure={responseGoogle}
    cookiePolicy={'single_host_origin'}
  />
                        

                        {/* <img src="/assets/Facebook.svg" alt="" />
                        <img src="/assets/Twitter.svg" alt="" /> */}
                        <img src="/assets/Gihub.svg" alt="" />
                    </div>
                    <div className='text-sm space-x-2 text-center text-[#828282]'>
                        Don't have an account yet?<Link to='/signup' className='text-blue-700'>Signup!</Link>
                    </div>
                </div>
            </div>
            <div></div>
        </div>
        </form>
    )
}
