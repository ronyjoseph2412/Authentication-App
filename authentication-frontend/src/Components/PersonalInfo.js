import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export const PersonalInfo = (props) => {
  let navigate = useNavigate();
    useEffect(async () => {
      if(!localStorage.getItem('authentication-token')){
        navigate("/login")
      }
      else{
        const response1 = await fetch(`http://localhost:5000/api/auth/getuser`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'authentication-token': localStorage.getItem('authentication-token')

          },
          // body:JSON.stringify({email:user_data.email,password:user_data.password,photo:user_data.photo,name:user_data.name})
      });
      const json = await response1.json();
      // console.log(json);
      props.setdata(json);
      }
    });
  
  return (
    <>
      <div className='container mx-auto py-28'>
        <br className='lg:hidden' ></br>
        <br className='lg:hidden'></br>
        <div className='text-4xl font-semibold lg:text-center mt-10'>Personal Info</div>
        <div className='text-xl font-normal lg:text-center mt-1'>Basic info,like your name and photo</div>
        <div className='border border-[#E0E0E0] rounded-md mt-5  flex flex-col space-y-5'>
          <div></div>
          <div className='flex flex-row justify-between px-2 items-center border-b border-[#E0E0E0]'>
            <div className='flex flex-col space-y-2'>
              <span className=' text-3xl'>Profile</span>
              <span className=' text-sm text-[#828282]'>Some info may be visible to other people</span>
            </div>
            <Link to='/edit' className='border border-[#828282] rounded-lg px-5 py-2 text-[#828282] cursor-pointer'>
              Edit
            </Link>
          </div>
          <div className=''>
            <div className='grid grid-cols-2 px-2 items-center justify-center py-2'>
              <div className='text-[#828282]'>PHOTO</div>
                <img src={props.userdata.photo} alt="" className='w-20 h-20' />
            </div>
          </div>
          <div className='border-t border-t-[#E0E0E0]'>
            <div className='grid grid-cols-2 px-2 items-center justify-center py-5 '>
              <div className='text-[#828282]'>NAME</div>
              <div className=''>{props.userdata.name}</div>
            </div>
          </div>
          <div className='border-t border-t-[#E0E0E0]'>
            <div className='grid grid-cols-2 px-2 items-center justify-center py-5 '>
              <div className='text-[#828282]'>BIO</div>
              <div className=''>{props.userdata.bio}</div>
            </div>
          </div>
          <div className='border-t border-t-[#E0E0E0]'>
            <div className='grid grid-cols-2 px-2 items-center justify-center py-5 '>
              <div className='text-[#828282]'>PHONE</div>
              <div className=''>{props.userdata.phone}</div>
            </div>
          </div>
          <div className='border-t border-t-[#E0E0E0]'>
            <div className='grid grid-cols-2 px-2 items-center justify-center py-5 '>
              <div className='text-[#828282]'>EMAIL</div>
              <div className=''>{props.userdata.email}</div>
            </div>
          </div>
          <div className='border-t border-t-[#E0E0E0]'>
            <div className='grid grid-cols-2 px-2 items-center justify-center py-5 '>
              <div className='text-[#828282]'>PASSWORD</div>
              <div className=''>************</div>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}
