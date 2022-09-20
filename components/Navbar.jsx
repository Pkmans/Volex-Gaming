import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { AiOutlineShopping } from 'react-icons/ai';
import { FaCubes } from 'react-icons/fa';
import { useSession, signIn, signOut } from "next-auth/react"
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';

import Cart from './Cart';
import { useStateContext } from '../context/StateContext';
import { useWindowSize } from '../lib/utils';

function Navbar() {
   const { showCart, setShowCart, totalQty } = useStateContext();
   const { data: session } = useSession(); // Session === true: user is signed in
   const { width, height } = useWindowSize();

   const [anchorEl, setAnchorEl] = useState(null);
   const open = Boolean(anchorEl);
   const handleClick = (e) => {
      setAnchorEl(e.currentTarget);
   };

   return (
      <>
         {width < 980 ? (
            <div className='navbar-container'>
               <div className='navbar-left'>
                  <Button
                     id="basic-button"
                     aria-controls={open ? 'basic-menu' : undefined}
                     aria-haspopup="true"
                     aria-expanded={open ? 'true' : undefined}
                     onClick={handleClick}
                  >
                     <MenuIcon color='action' sx={{ fontSize: 30 }} />
                  </Button>
                  <Menu
                     id="basic-menu"
                     anchorEl={anchorEl}
                     open={open}
                     onClose={() => setAnchorEl(null)}
                     MenuListProps={{
                        'aria-labelledby': 'basic-button',
                     }}
                  >
                     <MenuItem onClick={() => setAnchorEl(null)}><Link href='/'>Home</Link></MenuItem>
                     <MenuItem onClick={() => setAnchorEl(null)}><Link href='/categories/Headsets'>Headsets</Link></MenuItem>
                     <MenuItem onClick={() => setAnchorEl(null)}><Link href='/categories/Mice'>Mice</Link></MenuItem>
                     <MenuItem onClick={() => setAnchorEl(null)}><Link href='/categories/Mousepads'>Mousepads</Link></MenuItem>
                     <MenuItem onClick={() => setAnchorEl(null)}><Link href='/categories/Keyboards'>Keyboards</Link></MenuItem>
                     <MenuItem>
                        {!session ?
                           <button type='button' className='login-button' onClick={() => signIn()}>Sign In</button>
                           :
                           <button type='button' className='login-button' onClick={() => signOut()}>Sign Out</button>
                        }
                     </MenuItem>
                  </Menu>
                  <FaCubes size={30} />
                  <p className='logo'>
                     <Link href='/'>VOLEX GAMING</Link>
                  </p>

               </div>


               <div className='navbar-right'>


                  <button type='button' className='cart-icon' onClick={() => setShowCart(true)}>
                     <AiOutlineShopping size={30} />
                     <span className='cart-item-qty'>{totalQty}</span>
                  </button>


               </div>


               {showCart && <Cart />}

            </div>
         ) : (
            <div className='navbar-container'>
               <div className='navbar-left'>
                  <FaCubes size={30} />
                  <p className='logo'>
                     <Link href='/'>VOLEX GAMING</Link>
                  </p>
               </div>

               <div className='navbar-categories'>
                  <Link href='/'>Home</Link>
                  <Link href='/categories/Headsets'>Headsets</Link>
                  <Link href='/categories/Mice'>Mice</Link>
                  <Link href='/categories/Mousepads'>Mousepads</Link>
                  <Link href='/categories/Keyboards'>Keyboards</Link>
               </div>

               <div className='navbar-right'>
                  {!session ?
                     <button type='button' className='login-button' onClick={() => signIn()}>Sign In</button>
                     :
                     <button type='button' className='login-button' onClick={() => signOut()}>Sign Out</button>
                  }

                  <button type='button' className='cart-icon' onClick={() => setShowCart(true)}>
                     <AiOutlineShopping size={30} />
                     <span className='cart-item-qty'>{totalQty}</span>
                  </button>
               </div>


               {showCart && <Cart />}
            </div>
         )}
      </>
   );
}

export default Navbar;