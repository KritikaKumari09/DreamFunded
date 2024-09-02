import DreamFundedLogo from "../assets/DreamFunded-Logo.png"
import { navigation } from "../constants"
import {disablePageScroll,enablePageScroll} from "scroll-lock"
import {useLocation, useNavigate} from 'react-router-dom'
import Button from "./Button"
import MenuSvg from "../assets/svg/MenuSvg"
import {HamburgerMenu} from "./design/Header"
import {useState} from "react"
import { useDispatch, useSelector } from "react-redux";
import {logout} from "../store/userSlice.js"
import toast, { Toaster } from "react-hot-toast";
import sample from "../assets/images.png";
import { Link } from "react-router-dom"

import axios from "axios"

const Header = () => {

  const user = useSelector((state) => state.user);
  const pathname=useLocation();
  const [openNavigation, setOpenNavigation]=useState(false)

  const toggleNavigation = ()=>{
    if(openNavigation){
      setOpenNavigation(false)
      enablePageScroll()
    }
    else{
      setOpenNavigation(true)
      disablePageScroll()
    }
  }

  const handleClick =() =>{
    if(!openNavigation) return;
    enablePageScroll()
    setOpenNavigation(false)
  }



const dispatch = useDispatch();
const navigate = useNavigate(); // Ensure navigate is imported from react-router-dom

const handleLogout = () => {
  toast.promise(
    new Promise(async (resolve, reject) => {
      try {
        const response = await axios.post(
          "http://localhost:8000/api/user/logout",
          {},
          { withCredentials: true }
        );

        if (response.status === 200) {  // Check for a successful response status
          resolve("Logged Out Successfully");
          setTimeout(() => {
            dispatch(logout());
            navigate("/");
          }, 1000);
        } else {
          reject("Something Went Wrong");
        }
      } catch (error) {
        reject(error.response?.data?.message || "An error occurred during logout");
      }
    }),
    {
      loading: "Please Wait...",
      success: "Logged Out",
      error: "Something Went Wrong",
    }
  );
};


  return (
    <div className={`fixed top-0 left-0 w-full z-50
    border-b border-n-6 lg:bg-n-8/90 lg:backdrop-blur-sm ${openNavigation? "bg-n-8":"bg-n-8/90 backdrop:backdrop-blur-sm"}`}>
       <Toaster />
        <div className='flex items-center px-5 lg:px-7.5 xl:px-10 max-lg:py-4'>
        <a className="flex items-center w-[12rem] xl:mr-8" href="#hero">
            <img src={DreamFundedLogo} style={{ width: '50px', height: '40px' }} alt="DreamFunded"/>
            <p className="ml-4 text-2xl" > DreamFunded</p>
                   </a>
                  
     <nav className={`${openNavigation? "flex":"hidden"} fixed top-[5rem] left-0 right-0 bottom-0 bg-n-8 lg:static lg:flex lg:mx-auto lg:bg-transparent`}>
        <div className="relative z-2 flex flex-col items-center justify-center
         m-auto lg:flex-row">
            {navigation.map((item)=>(
              user?(
                item.id !=="4" && item.id !=="5" && item.id !=="6" ?(<a key={item.id} href={item.url} onClick={handleClick}
                  className={`block relative font-code text-2xl uppercase *:text-n-1
                    transition-colors hover:text-n-1 ${item.onlyMobile?'lg:hidden' : ''}
                    px-6 py-6 md:py-8 lg:-mr-0.25 lg:text-xs lg:font-semibold
                    ${item.url=== pathname.hash ? "z-2 lg:text-n-1" : "lg:text-n-1/50"}
                    lg:leading-5 lg:hover-text-n-1 xl:px-12`}>
                    
      
                     {item.title} 
                    </a>):(item.id !=="4" && item.id !=="5" &&
                      <a key={item.id} href={item.url} onClick={handleLogout}
                      className={`block relative font-code text-2xl uppercase *:text-n-1
                        transition-colors hover:text-n-1 ${item.onlyMobile?'lg:hidden' : ''}
                        px-6 py-6 md:py-8 lg:-mr-0.25 lg:text-xs lg:font-semibold
                        cursor-pointer
                        lg:leading-5 lg:hover-text-n-1 xl:px-12`}>
                        
          
                         {item.title} 
                        </a>
                    )
              ):( item.id!=="6"&&
            <a key={item.id} href={item.url} onClick={handleClick}
            className={`block relative font-code text-2xl uppercase *:text-n-1
              transition-colors hover:text-n-1 ${item.onlyMobile?'lg:hidden' : ''}
              px-6 py-6 md:py-8 lg:-mr-0.25 lg:text-xs lg:font-semibold
              ${item.url=== pathname.hash ? "z-2 lg:text-n-1" : "lg:text-n-1/50"}
              lg:leading-5 lg:hover-text-n-1 xl:px-12`}>
              

               {item.title} 
              </a>
            )
           ))}
        </div>
        <HamburgerMenu/>
     </nav>


{/* <div className="flex">
     {user ? (
    <Button className="hidden lg:flex"  onClick={handleLogout}>
        Sign out
    </Button>
) : (
    <>
        <a
            href="/register"
            className="button hidden mr-8 text-n-1/50 transition-colors hover:text-n-1 lg:block"
        >
            New account
        </a>
        <Button className="hidden lg:flex" href="/login">
            Sign in
        </Button>
    </>
)}

{user ? (
     <img
     src={user?.avatarImage || sample}
     alt="profile img"
     className="h-8 rounded-[50%] w-8 flex"
   />
) : (
    <>
        
    </>
)}
 
 </div> */}

<div className="flex items-center">
  {user ? (
    <Button className="hidden lg:flex" onClick={handleLogout}>
      Sign out
    </Button>
  ) : (
    <>
      <a
        href="/register"
        className="button hidden mr-8 text-n-1/50 transition-colors hover:text-n-1 lg:block"
      >
        New account
      </a>
      <Button className="hidden lg:flex" href="/login">
        Sign in
      </Button>
    </>
  )}

  {user ? (
<>
<div className="relative group hidden lg:flex">
  <Link to="/myprofile" className="text-white cursor-pointer" data-tooltip-target="tooltip-default">
    <img
      src={user?.avatarImage || sample}
      alt="profile img"
      className="h-8 rounded-[50%] w-8 ml-6"
    />
  </Link>
  <div className="absolute z-10 left-1/2 transform -translate-x-1/2 top-full mt-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2">
    My Account
    <div className="tooltip-arrow" data-popper-arrow></div>
  </div>
</div>

<div id="tooltip-default" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
  My Account
  <div className="tooltip-arrow" data-popper-arrow></div>
</div>
</>
  ) : (
    <>
    </>
  )}



</div>



    

     <Button className="ml-auto lg:hidden" px="px-3" onClick={toggleNavigation}>
      <MenuSvg openNavigation={openNavigation}/>
      </Button>
    </div>
    </div>
  )
}

export default Header
