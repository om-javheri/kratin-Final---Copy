import {React,useEffect, useState} from 'react'
import { useLocation } from 'react-router-dom'
export default function ShowNavbar({children}) {
    const location=useLocation();
    
    const [showNavbar,setShowNavbar]=useState(false)
    useEffect(() => {
      
        if(location.pathname==="/" || location.pathname==="/ShowAndBook2" ){
            setShowNavbar(false)
        }
        else{
            setShowNavbar(true)
        }
      
    }, [location])
    
  return (
    <div>{showNavbar && children}</div>
  )
}
