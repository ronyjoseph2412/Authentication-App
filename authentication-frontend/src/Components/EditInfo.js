import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
export const EditInfo = (props) => {
    const navigate = useNavigate();
    const data  = props.fetchdata();
    const [name, setname] = useState(data.name);
    const [bio, setbio] = useState((data).bio);
    const [phone, setphone] = useState(data.phone);
    const [email, setemail] = useState((data).email);
    const [photo, setphoto] = useState((data).photo);

    const onChange1 = (e)=>{
        setname(e.target.value)
    }
    const onChange2 = (e)=>{
        setbio(e.target.value)
        
    }
    const onChange3 = (e)=>{
        setphone(e.target.value)
        
    }
    const onChange4 = (e)=>{
        setemail(e.target.value)
        
    }
    const onChange5 = (e)=>{
        setphoto(e.target.value)
        
    }
    const handleSubmit = async (e)=>{
        e.preventDefault();
        const token=localStorage.getItem('authentication-token')
        
        const response = await fetch(`http://localhost:5000/api/auth/edituser`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'authentication-token': token
            },
            body:JSON.stringify({"name":name,"email":email,"bio":bio,"phone":phone,"photo":photo})
        });
        const json = await response.json();
        console.log(json);
        navigate('/');
    }
    

    return (
        <>
            <form onSubmit={handleSubmit} className='flex flex-col container mx-auto py-14 px-10 space-y-5'>
                <div className='flex flex-row text-blue-700 cursor-pointer'>
                    <div><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg></div>
                    <Link to='/'>Back</Link>
                </div>
                <div className='border border-[#E0E0E0] px-5 py-10  rounded-xl w-full md:w-8/12'>
                    <div className='text-4xl'>Change Info</div>
                    <div className='text-lg'>Changes will be reflected to every services</div>
                    <div className='mt-3 flex flex-col space-y-2'>
                        <div>Name</div>
                        <div><input type="text" name='name' id='name'  className='p-2 border border-[#828282] w-9/12 sm:w-7/12 md:w-5/12 rounded-lg ' value={name} onChange={onChange1} /></div>
                    </div>
                    <div className='mt-3 flex flex-col space-y-2'>
                        <div>Bio</div>
                        <div><textarea type="text" name='Bio' id='Bio'  className='p-2 border border-[#828282] w-9/12 sm:w-7/12 md:w-5/12 rounded-lg ' value={bio} onChange={onChange2} /></div>
                    </div>
                    <div className='mt-3 flex flex-col space-y-2'>
                        <div>Phone</div>
                        <div><input type="text" name='Phone' id='Phone'  className='p-2 border border-[#828282] w-9/12 sm:w-7/12 md:w-5/12 rounded-lg ' value={phone} onChange={onChange3} /></div>
                    </div>
                    <div className='mt-3 flex flex-col space-y-2'>
                        <div>Email</div>
                        <div><input type="text" name='Email' id='Email' className='p-2 border border-[#828282] w-9/12 sm:w-7/12 md:w-5/12 rounded-lg ' value={email} onChange={onChange4} /></div>
                    </div>
                    <div className='mt-3 flex flex-col space-y-2'>
                        <div>Photo</div>
                        <div><input type="text" name='photo' id='photo' className='p-2 border border-[#828282] w-9/12 sm:w-7/12 md:w-5/12 rounded-lg ' value={photo} onChange={onChange5} placeholder="Provide the Photo Link" /></div>
                    </div>
                        
                    <button className="px-3 py-2 rounded bg-blue-600 text-white text-center mt-3 ">Save</button>
                    
                </div>
            </form>
        </>
    )
}
