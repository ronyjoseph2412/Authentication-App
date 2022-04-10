import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';


export const Navbar = ({name,photo}) => {
  let navigate = useNavigate();
  const [dropdown, setdropdown] = useState(false);
  const handleClick = ()=>{
    if(dropdown){
      setdropdown(false);
    }
    else{
      setdropdown(true);
    }
  } 
  const handleLogout = () => {
    localStorage.removeItem('authentication-token');
    navigate("/login");
  }
  return (
    <>
      <div className='container px-2 md:px-4 lg:px-6 bg-white py-4 flex flex-row justify-between'>
        <img src="/assets/devchallenges.svg" alt="" />
        <div className='flex flex-row space-x-4 cursor-pointer relative' onClick={handleClick}>
          {/* <div className='h-8 w-9 bg-slate-900 rounded-md'></div> */}
          <img src={photo} alt="" className='h-8 w-9 rounded-md' />
          <div className='hidden sm:flex sm:flex-row text-lg space-x-3 items-center'>
            <div>
              {name}
            </div>
            <div>
            {dropdown === false ? <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
</svg> : <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
  <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
</svg>}
            </div>
          </div>
        </div>
      </div>
      <div className={dropdown === true ? `container px-1 md:px-4 lg:px-8 py-3 flex flex-row justify-between absolute z-10`: 'hidden'}>
        <div></div>
        <div className='bg-white rounded-lg flex flex-col p-3 border border-[#E0E0E0] space-y-2 w-56 '>
          <div className='flex flex-row space-x-4 bg-[#f8f8f8] p-2 rounded-md cursor-pointer'>
            <div><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
            </svg></div>
            <div>
              My Profile
            </div>
          </div>
          <div className='flex flex-row space-x-4 bg-[#f8f8f8] p-2 rounded-md cursor-pointer'>
            <div><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
            </svg></div>
            <div>
              Group Chat
            </div>
          </div>
          <hr className='bg-[#E0E0E0] text-[#E0E0E0]' />
          <div className='flex flex-row space-x-4 bg-[#f8f8f8] p-2 rounded-md text-[#EB5757] cursor-pointer'>
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </div>
            <div onClick={handleLogout}>
              Logout
            </div>
          </div>
        </div>
      </div>
      
    </>
  )
}
