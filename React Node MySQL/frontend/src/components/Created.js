import React, { useState, useEffect } from 'react';

export default function Created() {
  const [studentData, setStudentData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8081/Created');
        const data = await response.json();
        if (Array.isArray(data)) {
          setStudentData(data);
        } else {
          setStudentData([]);
        }
      } catch (error) {
        console.error('Error:', error);
        setStudentData([]); 
      }
    };

    fetchData();
  }, []);
// Python model run fuction
const [show,setShow]=useState("");

function display(){
  let prone='';
let blurry=0,thirst=0,urination=0,fatigue=0;
if(studentData[0].blurry_vision==="yes"){
blurry=true;
}
else{blurry=false;
}
if(studentData[0].excessive_thirst==="yes"){
  thirst=true;
  }
  else{thirst=false;
  }
  if(studentData[0].fatigue==="yes"){
    fatigue=true;
    }
    else{fatigue=false;
    }
    if(studentData[0].excessive_urination==="yes"){
      urination=true;
      }
      else{urination=false;
      }
if((blurry && thirst) || (!blurry && !thirst && fatigue && !urination)){
  setShow(false);
}
else{
  setShow(true);
}


}


// console.log(studentData[0].blurry_vision)
  return (
    <>

      
      <div className='text-center center2'>
      <h2 className='colorw'>Patient's Data Added</h2>
  <table className="table2">
    <thead>
      <tr>
        <th>ID</th>
        <th>Excessive Thirst</th>
        <th>Excessive Urination</th>
        <th>Blurry Vision</th>
        <th>Fatigue</th>

       
      </tr>
    </thead>
    <tbody className='tbody'>
      {studentData.map((student, index) => (
        <tr key={index}>
          <td>{student.id}</td>
          <td>{student.excessive_thirst}</td>
          <td>{student.excessive_urination}</td>
          <td>{student.blurry_vision}</td>
          <td>{student.fatigue}</td>
          
        </tr>
      ))}
    </tbody>
  </table>
  <div>
  <button className='btn btn-success colorb' onClick={display}>Predict</button>
  </div>
  {show?  <div className='colorw'>Prone to diabetes Consult Your Doctor</div>
:show===""?"":<div className='colorw'>Not Prone to diabetes Well Done!</div>}
</div>

    </>
  );
}