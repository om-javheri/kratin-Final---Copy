
import React, { useState } from 'react';
import axios from 'axios';import PropTypes from 'prop-types';

export default function Text_area(props) {
    // const [tno, setTno] = useState('');
    const [tname, setTname] = useState('');
    const [status, setStatus] = useState(false);
    const [values, setValues] = useState({
        tname: "",
        
      });
      function parse(data){
        let arr=[]
        for (let i=0;i<data.length;i++){
          if(props.status==="diary"){
            arr[i]=`${data[i].id}: ${data[i].text} \n`

          }
          else{
            arr[i]=`${data[i].tno}: ${data[i].tname} \n`

          }
        }
        return arr;
      }

  const handleInput = (event) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };
    
     
      const handleSubmit = (e) => {
        e.preventDefault();
        // const err=validation(values);
        // setErrors(err)
        // if(err.name==="" && err.email==="" && err.password===""){

        fetch("http://localhost:8081/Create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            tname: values.tname,
           
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.message) {
              fetchTasksTodoToday()
            //   navigate("/Created");
            } else {
              console.log(data);
              fetchTasksTodoToday()
            //   navigate("/Created");
            }
          })
          .catch((error) => {
            console.error("Error:", error);
          });
        // }
      };
    
      const handleSubmit2 = (e) => {
        e.preventDefault();
        // const err=validation(values);
        // setErrors(err)
        // if(err.name==="" && err.email==="" && err.password===""){
        fetch("http://localhost:8081/CreateNext", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            tname: values.tname,
           
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.message) {
              fetchTasksTodoNext()
            //   navigate("/Created");
            } else {
              console.log(data);
              fetchTasksTodoNext()
            //   navigate("/Created");
            }
          })
          .catch((error) => {
            console.error("Error:", error);
          });
        // }
      };
    

      const handleSubmit3 = (e) => {
        e.preventDefault();
        // const err=validation(values);
        // setErrors(err)
        // if(err.name==="" && err.email==="" && err.password===""){
        fetch("http://localhost:8081/CreateDiary", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            tname: values.tname,
           
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.message) {
              fetchTasksDiary()

            //   navigate("/Created");
            } else {
              fetchTasksDiary()
            //   navigate("/Created");
            }
          })
          .catch((error) => {
            console.error("Error:", error);
          });
        // }
      };
      const [todoTasksToday, setTodoTasksToday] = useState([]);

      const [todoTasksNext, setTodoTasksNext] = useState([]);

      const [diaryTasks, setDiaryTasks] = useState([]);

      const fetchTasksDiary = () => {
        fetch("http://localhost:8081/GetTasksDiary")
          .then((res) => res.json())
          .then((data) => {
            console.log(data)

            setDiaryTasks(parse(data)); // Update the state with fetched tasks
            
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      };
      const fetchTasksTodoToday = () => {
        fetch("http://localhost:8081/GetTasksToday")
          .then((res) => res.json())
          .then((data) => {
            setTodoTasksToday(parse(data)); // Update the state with fetched tasks
            
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      };
      const fetchTasksTodoNext = () => {
        fetch("http://localhost:8081/GetTasksNext")
          .then((res) => res.json())
          .then((data) => {
            setTodoTasksNext(parse(data)); // Update the state with fetched tasks
            
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      };

      const handleDeleteDiary = (e) => {
        e.preventDefault();
    
        fetch('http://localhost:8081/ShowAndDeleteDiary', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: values.id,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.message) {
              // navigate('/Delete2');
              fetchTasksDiary()
            } else {
              console.log(data);
              // navigate('/Delete2');
            }
          })
          .catch((error) => {
            console.error('Error:', error);
          });
      };
      const handleDeleteToday = (e) => {
        e.preventDefault();
    
        fetch('http://localhost:8081/ShowAndDeleteToday', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            tno: values.id,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.message) {
              // navigate('/Delete2');
              fetchTasksTodoToday()
            } else {
              console.log(data);
              // navigate('/Delete2');
            }
          })
          .catch((error) => {
            console.error('Error:', error);
          });
      };
      const handleDeleteNext = (e) => {
        e.preventDefault();
    
        fetch('http://localhost:8081/ShowAndDeleteNext', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            tno: values.id,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.message) {
              // navigate('/Delete2');
              fetchTasksTodoNext()
            } else {
              console.log(data);
              // navigate('/Delete2');
            }
          })
          .catch((error) => {
            console.error('Error:', error);
          });
      };
    
      
    
  return (
    <div>
        <h5 className=' colorw center2'> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{props.heading}</h5>

<textarea rows="2" value={props.status==="today"?todoTasksToday:props.status==="next"?todoTasksNext:diaryTasks} cols="50" disabled>

</textarea>
<div className='d-inline-flex'  >
<input name='tname' type="text"  onChange={handleInput} placeholder="Enter Text to Add" />
<input name='id' type='number' onChange={handleInput} placeholder='Id for below function'></input>
</div>



<div className="d-inline-flex">
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
{props.text1!==""?<button  className='btn btn-success' onClick={props.status==="today"?handleSubmit:props.status==="next"?handleSubmit2:handleSubmit3} > {props.text1}</button>
:<></>}
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

{props.text3!==""?<button onClick={props.status==="today"?handleDeleteToday:props.status==="next"?handleDeleteNext:handleDeleteDiary} className='btn btn-danger'> {props.text3}</button>
:<></>}

{props.text4!==undefined?<button className='btn btn-primary'> {props.text4}</button>
:<></>}
</div>

    </div>
  )
}




