"use client";

import { signOut } from 'firebase/auth';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import Image from 'next/image';
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { AiOutlineClose } from 'react-icons/ai'
import { auth, db, provider } from '../../firebase';

const Profilebar = (
    { profileBar, setProfileBar}
) => {
    const [user, loading] = useAuthState(auth, provider);
    const logout = async () =>{
        if (user) {
            setDoc(
              doc(db, "users", user.uid),
             {
                 email: user.email,
                 photoURL: user.photoURL,
                 name: user.providerData[0].displayName,
                 lastSeen: serverTimestamp(),
                 online: false
              },
              { merge: true }
           );
         }
        await signOut(auth);
    }
  return (
    <div className={profileBar ? 'lg:w-[400px] z-[9999] w-full h-screen fixed top-0 right-0 bg-white shadow-sm overflow-hidden transition-all' : 'lg:w-0 z-[9999] w-0 h-screen fixed top-0 right-0 bg-white shadow-sm overflow-hidden transition-all'}>
        <div className='text-right p-5'>
            <button className='text-3xl' onClick={()=>{setProfileBar(false)}}><AiOutlineClose className='inline' /></button>
        </div>
        <div>
            <Image src={user?.photoURL} alt="profile image" width={200} height={200} quality={100} priority={true} className="rounded-full mx-auto border shadow" />
        </div>
        <div>
            <h2 className='text-sm text-center pt-3 text-gray-500'>{user?.email}</h2>
            <h2 className='text-center text-3xl font-bold pb-2 uppercase'>{user?.displayName}</h2>
            <h5 className='flex items-center space-x-1 justify-center text-gray-400'><div className='w-[8px] h-[8px] relative top-[1px] bg-[#00ff00] rounded-full'></div> <span className='text-sm'>Active Now</span></h5>
        </div>
        <div className='w-full h-[10vh] flex justify-center items-center px-20'>
            <button className='bg-red-500 text-white uppercase px-5 py-2 rounded-full w-full' onClick={logout}>Logout</button>
        </div>
    </div>
  )
}

export default Profilebar