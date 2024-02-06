import React, { useState,useEffect } from "react";
// import db from './db';
import { useNavigate } from "react-router-dom";
import validation from './SignupValidation';

export default function Concert() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    excessive_thirst: "",
    excessive_urination: "",
    blurry_vision: "",
    fatigue: "",
  });
  const [errors, setErrors] = useState({});

 
  const handleSubmit = (e) => {
    e.preventDefault();
    
    
    fetch("http://localhost:8081/Create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        excessive_thirst: values.excessive_thirst,
        excessive_urination: values.excessive_urination,
        blurry_vision: values.blurry_vision,
        fatigue: values.fatigue,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          navigate("/Created");
        } else {
          console.log(data);
          navigate("/Created");
        }
      })
      .catch((error) => {
        // console.error("Error:", error);
      });
    
  };

  const handleInput = (event) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

 
  return (
    <>
      <div className="flex">
        <form className="center2">
          <h3 className="colorw text-center">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Welcome Sunita Sharma Please Enter Your Details</h3>

          <table className="table2">
            <thead className="tbody">
              <tr>
                <th>
                  {" "}
                  <label
                    htmlFor="exampleFormControlInput1"
                    className="form-label mb-3 my-3 mx-3 "
                  >
                    Excessive Thirst
                  </label>
                </th>
                <th>
                  <input
                    type="text"
                    onChange={handleInput}
                    name="excessive_thirst"
                    className=" my-2  "
                    id="Concert_Name"
                    placeholder="Yes or No"
                  required/>

                </th>
                <th>
                  <label
                    htmlFor="exampleFormControlInput1"
                    className=" mb-3 my-3 mx-3 "
                  >
                    excessive_urination
                   
                  </label>
                </th>
                <th>
                  <input
                    type="text"
                    onChange={handleInput}
                    name="excessive_urination"
                    className=""
                    id="Ticket_Fee"
                    placeholder="Yes or No"
                 required />

                </th>
              </tr>
              <tr>
                <th>
                  <label
                    htmlFor="exampleFormControlInput1"
                    className="form-label mb-3 my-3 mx-3"
                  >
                     blurry_vision
                    
                  </label>
                </th>
                <th>
                  <input
                    type="text"
                    onChange={handleInput}
                    name="blurry_vision"
                    className="my-2 mx-3 "
                    id="Team_Name"
                    placeholder="Yes or No"
                  required/>
                </th>
                <th>
                  <label
                    htmlFor="exampleFormControlInput1"
                    className="form-label mb-3 my-3 mx-5"
                    type="text"
                  >
                    fatigue
                  </label>
                </th>
                <th>
                  <input
                    type="text"
                    onChange={handleInput}
                    name="fatigue"
                    className="my-2 mx-1"
                    id="date"
                    placeholder="Yes or No"
                 required />

                </th>
              </tr>
             
             
                
                
             
            </thead>
            <tbody className="tbody"></tbody>
          </table>

          <div className="center2">
            <button
              type="submit"
              onClick={handleSubmit}
              className="btn btn-success"
            >
              Submit
            </button>

            
          </div>
          

        </form>
      </div>
    </>
  );
}
