/*"use client";


import Link from 'next/link'
import Image from 'next/image'
import {useState,useEffect} from 'react'
import {signIn,signOut,useSession,getProviders} from 'next-auth/react'

const Nav = () => {
    const isUserLoggedIn = true;
    const [providers,setProviders]=useState(null);
    const [toggleDropdown,setToggleDropdown] = useState(false)
    useEffect(()=>{
      const setproviders=async()=>{
        const response = await getProviders();

        setProviders(response)
        setProviders();
      }
    },[])
  return (
    <nav className='flex-between w-full mb-16 pt-3'>
      <Link href='/' className='flex gap-2'>
      <Image 
      src="/assets/images/logo.svg"
      alt="Promptopia Logo"
      width={30}
      height={30}
      className='object-content'
      />
      <p className='logo_text mt-1'>Promptopia</p>
        </Link>
        {/*mobile navigation 
        <div className='sm:flex hidden'>
            {isUserLoggedIn ? (
                <div className='flex gap-3 md:gap-5'>
                    <Link href="/create prompt"
                     className="black_btn bg-black">
                    Create Post
                    </Link>

                    <button type='button' onclick={signOut}
                    className='outline_btn'>
                        Sign Out
                    </button>

                    <Link href="/profile">
                    <Image
                    src="/assets/images/logo.svg"
                    width={37}
                    height={37}
                    className='rounded-full'
                    alt="profile"
                    />
                    </Link>

                </div>):
               <>
               {providers && 
                 Object.values(providers).map((provider) => (
                   <button 
                     type="button"
                     key={provider.name}
                     onClick={() => signIn(provider.id)}
                     className="black_btn"
                   >
                     Sign In
                   </button>
                 ))
               }
             </>
             
                }
        </div>
        {/*mobile navigater 

        <div className='sm:hidden flex-relative'>
          {isUserLoggedIn ? (
            <div className='flex'>
              <Image
                    src="/assets/images/logo.svg"
                    width={37}
                    height={37}
                    className='rounded-full'
                    alt="profile"
                    //onClick={() =>setToggleDropdown((prev)
                    //=> !prev)}
                    />
                    {toggleDropdown && (
                      <div className='dropdown'>
                        <Link
                        href="/profile"
                        className='dropdown_link'
                        onclick={()=>setToggleDropdown
                          (false)
                        }
                        >My Profile
                        </Link>
                        <Link
                        href="/create-prompt"
                        className='dropdown_link'
                        onclick={()=>setToggleDropdown
                          (false)
                        }
                        >Create Prompt
                        </Link>
                        <button type='button'
                        onClick={()=>{
                          setToggleDropdown(false);
                          signOut();
                        }} className='mt-5 w-full black_btn'>
                          Sign Out
                        </button>
                      </div>
                    )}
                    </div>):(
               <>
               {providers && 
                 Object.values(providers).map((provider) => (
                   <button 
                     type="button"
                     key={provider.name}
                     onClick={() => signIn(provider.id)}
                     className="black_btn"
                   >
                     Sign In
                   </button>
                 ))
               }
             </>
            )}
               

            </div>
  

     
    </nav >
  )
}

export default Nav
*/


"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Nav = () => {
  const { data: session } = useSession(); // Fetch session details
  const [providers, setProviders] = useState(null); // State for auth providers
  const [toggleDropdown, setToggleDropdown] = useState(false); // State for mobile dropdown visibility

  // Fetch authentication providers on component mount
  useEffect(() => {
    const fetchProviders = async () => {
      const res = await getProviders();
      setProviders(res);
    };

    fetchProviders();
  }, []);

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      {/* Logo */}
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/images/logo.svg"
          alt="logo"
          width={30}
          height={30}
          className="object-contain"
        />
        <p className="logo_text">Promptopia</p>
      </Link>

      {/* Desktop Navigation */}
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            {/* Create Post Button */}
            <Link href="/create-prompt" className="black_btn">
              Create Post
            </Link>

            {/* Sign Out Button */}
            <button type="button" onClick={signOut} className="outline_btn">
              Sign Out
            </button>

            {/* User Profile Link */}
            <Link href="/profile">
              <Image
                src={session?.user.image}
                width={37}
                height={37}
                className="rounded-full"
                alt="profile"
              />
            </Link>
          </div>
        ) : (
          // Display Sign-In Buttons for Available Providers
          providers &&
          Object.values(providers).map((provider) => (
            <button
              type="button"
              key={provider.name}
              onClick={() => signIn(provider.id)}
              className="black_btn"
            >
              Sign in
            </button>
          ))
        )}
      </div>

      {/* Mobile Navigation */}
      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            {/* User Profile Image */}
            <Image
              src={session?.user.image}
              width={37}
              height={37}
              className="rounded-full"
              alt="profile"
              onClick={() => setToggleDropdown((prev) => !prev)} // Toggle Dropdown
            />

            {/* Mobile Dropdown */}
            {toggleDropdown && (
              <div className="dropdown">
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href="/create-prompt"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  Create Prompt
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                  }}
                  className="mt-5 w-full black_btn"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          // Display Sign-In Buttons for Available Providers
          providers &&
          Object.values(providers).map((provider) => (
            <button
              type="button"
              key={provider.name}
              onClick={() => signIn(provider.id)}
              className="black_btn"
            >
              Sign in
            </button>
          ))
        )}
      </div>
    </nav>
  );
};

export default Nav;
