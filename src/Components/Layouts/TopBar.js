import React from 'react';
import Topbarlogo from "../../images/—Pngtree—logo killer_6686709 1.png";
import { Link, useLocation } from 'react-router-dom';
import { HiOutlineUserCircle } from "react-icons/hi2";

const TopBar = (props) => {
  console.log(props.email)
  const location = useLocation();

  return (
    <div className='bg-primary p-2'>
      <div className='container mx-auto flex flex-col md:flex-row justify-between items-center text-center text-white font-semibold'>
        <img src={Topbarlogo} alt="Topbar Logo" className='mb-2 md:mb-0' />
        {location.pathname === '/' ? (
          ""
        ) : (
          <>
            <ul className='flex gap-10 md:gap-8 text-white text-center p-2 '>
              <li>
                <Link to="/dashboard">
                Dashboard
                </Link>
                </li>
              <li>
              <Link to="/product">
                All Products
                </Link>
                </li>
              {/* <li>
                <Link to="/category">
                Categories
                </Link>
              </li> */}
            </ul>
            <ul className='text-center p-2 flex gap-8 items-center'>
              <li className='flex gap-1'>
             <HiOutlineUserCircle className='h-6 w-6'/> <span>{ props.email?props.email:""}</span>
              </li>
              <li><Link to="/">
                LogOut
                </Link>
                </li>
            </ul>
          </>
        )}
      </div>
    </div>
  );
}

export default TopBar;
