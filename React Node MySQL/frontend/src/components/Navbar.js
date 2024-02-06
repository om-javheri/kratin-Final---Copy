import React from 'react';
import PropTypes from 'prop-types';

export default function Navbar(props,setloginStatus,loginStatus) {
  function change(){
setloginStatus(!loginStatus)
  }
  return (
    <>
<nav className="navbar navbar-expand-lg  ">
 
       
          
        
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            
            <li className="nav-item">
              <a id='item1' className="btn btn-border" onClick={change} href="/"><button className='btn nav-color' >{props.navbar_item}</button></a>
            </li>
            {/* <li className="nav-item">
              <a id='item2' className="btn btn-border" href="/ShowAndBook"><button className='btn nav-color' >{props.navbar_item1}</button></a>
            </li> */}
            <li className="nav-item">
              <a id='item2' className="btn btn-border" href="/Create"><button className='btn nav-color' >{props.navbar_item2}</button></a>
            </li>
           
            <li className="nav-item">
              <a id='item4' className="btn btn-border" target='_blank' href="https://www.olacabs.com/"><button className='btn nav-color' >{props.navbar_item4}</button></a>
            </li>
            <li className="nav-item">
              <a id='item4' className="btn btn-border" target='_blank' href="https://www.netmeds.com/"><button className='btn nav-color' >{props.navbar_item5}</button></a>
            </li>
          </ul>

        </div>
      </nav>

    
    </>


  );
}

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  about: PropTypes.string.isRequired,
};

Navbar.defaultProps = {
  title: 'set title here',
  about: 'About ',
};
