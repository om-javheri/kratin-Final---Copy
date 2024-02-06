import React, { useState, useEffect } from 'react';
import { Link} from 'react-router-dom';

function ShowAndBook2() {
  const [concertData, setConcertData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8081/ShowAndId');
        const data = await response.json();
        if (Array.isArray(data)) {
          setConcertData(data);
        } else {
          setConcertData([]);
        }
      } catch (error) {
        console.error('Error:', error);
        setConcertData([]);
      }
    };
    fetchData();
  }, []);
  const [concertData2, setConcertData2] = useState([]);
 
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = concertData.slice(indexOfFirstItem, indexOfLastItem);
  const currentItems2 = concertData2.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

 

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('http://localhost:8081/ShowAndIdDown');
          const data = await response.json();
          
        } catch (error) {
          console.error('Error:', error);
          
        }
      };
      fetchData();
    }, []);
  


  return (
    <>
    <div className=' text-center top'>


<div>
  
</div>

<h5 className='colorw'>Patient's Data</h5>
<div className='text-center table-box center2 '>
<div >
          <table className="table2">
            <thead >
              <tr >
                <th >Patient ID</th>
                <th>Excessive Thirst</th>
        <th>Excessive Urination</th>
        <th>Blurry Vision</th>
        <th>Fatigue</th>
              </tr>
            </thead>
            <tbody className='tbody'>
              {currentItems.map((student, index) => (
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
        </div>

        <div className="pagination">
          {Array.from({ length: Math.ceil(concertData.length / itemsPerPage) }, (_, i) => i + 1).map((page) => (
            <button  key={page} onClick={() => paginate(page)} className={`btn ${currentPage === page ? 'btn-success' : 'btn-warning'}`}>
              {page}
            </button>
          ))}
        </div>


 


      
       
</div>


</div>

        </>
      
  )
}
export default ShowAndBook2;

