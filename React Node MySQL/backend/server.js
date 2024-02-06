const express=require("express")
const mysql=require("mysql")
const cors=require("cors")

const app=express();
app.use(cors());
app.use(express.json());

const db=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"samsung@6600",
    database:"concert",
    debug:true
});

app.post('/Signup', (req, res) => {
    
      const sql = "INSERT INTO signup (`name`, `email`, `password`) VALUES (?, ?, ?)";
      
        const name=req.body.name;
        const email=req.body.email;
        const password=req.body.password;
      
      db.query(sql, [name,email,password], (err, data) => {
        if (data) {
          
          res.send(data);
          console.log("Data inserted successfully:", data);
        }
        else{
            res.send({message:"Error "})

        }
        
        
      });
   
  });

  app.post('/Login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const sql = `SELECT * FROM signup WHERE email=? AND password=?`;

    db.query(sql, [email, password], (err, data) => {
        if (err) {
            console.error("Error", err);
            res.status(500).json({ message: "Internal Server Error" });
        } else {
            if (data.length > 0) {
                // User found, check admin status
                const user = data[0];
                if (user.admin_status === 1) {
                    console.log("Admin login successful");
                    res.send({ ...user, isAdmin: true });
                } else {
                    console.log("User login successful");
                    res.send({ ...user, isAdmin: false });
                }
            } else {
                res.status(401).json({ message: "Incorrect username or password" });
            }
        }
    });
});
// app.post('/CheckLogin', (req, res) => {
//   // Dummy login status for demonstration purposes
//   const isLoggedIn = true;

//   // Assuming you want to check login status on the server
//   const sql = "SELECT login_status FROM login WHERE login_status=1";

//   db.query(sql, (err, data) => {
//     if (err) {
//       console.error("Error:", err);
//       res.status(500).json({ message: "Internal Server Error" });
//     } else {
//       if (data.length > 0 || isLoggedIn) {
//         // You have found a user matching the condition or using dummy login status
//         res.status(200).json({ status: "success" });
//       } else {
//         // No user found
//         res.status(401).json({ message: "Incorrect username or password" });
//       }
//     }
//   });
// });


app.post('/Create', (req, res) => {
  const excessive_thirst = req.body.excessive_thirst; // Destructure tname from the request body

  const  excessive_urination  = req.body.excessive_urination; // Destructure tname from the request body

  const blurry_vision = req.body.blurry_vision; // Destructure tname from the request body

  const fatigue = req.body.fatigue; // Destructure tname from the request body
  // const status = "today"; // Assuming you want to set status as "today" for all new entries

  const sql = "INSERT INTO patient_data (`excessive_thirst`,`excessive_urination`,`blurry_vision`,`fatigue`) VALUES (?, ?,?,?)";

  db.query(sql, [excessive_thirst,excessive_urination,blurry_vision,fatigue], (err, data) => {
    if (err) {
      console.error("Error:", err);
      res.status(500).json({ message: "Failed to create entry" });
    } else {
      console.log("Create pdata successful");
      res.json({ message: "Create pdata successful", data });
    }
  });
});
app.post('/CreateNext', (req, res) => {
  const { tname } = req.body; // Destructure tname from the request body
  const status = "next"; // Assuming you want to set status as "today" for all new entries

  const sql = "INSERT INTO todolists (tname, status) VALUES (?, ?)";

  db.query(sql, [tname, status], (err, data) => {
    if (err) {
      console.error("Error:", err);
      res.status(500).json({ message: "Failed to create entry" });
    } else {
      console.log("Create successful");
      res.json({ message: "Create successful", data });
    }
  });

});
app.post('/CreateDiary', (req, res) => {
  const { tname } = req.body; // Destructure tname from the request body
if(tname===undefined){
}
else{
  const sql = "INSERT INTO mydiary (text) VALUES (?)";
  db.query(sql, [tname], (err, data) => {
    if (err) {
      console.error("Error:", err);
      res.status(500).json({ message: "Failed to create entry" });
    } else {
      console.log("Create successful");
      res.json({ message: "Create successful", data });
    }
  }
);
}
  

});

// 




app.get('/Created', (req, res) => {
  const sql = "SELECT * FROM patient_data WHERE id = (SELECT MAX(id) FROM patient_data);";
  
  
  db.query(sql, (err, data) => {
    if (err) {
      console.error("Error", err);
      res.status(500).json({ message: "Failed to retrieve data" });
    } else {
      if (data.length > 0) {
        console.log("Data retrieved successfully");
        res.json(data);
      } else {
        res.json({ message: "No data found" });
      }
    }
  });
});

app.get('/ShowAndId', (req, res) => {
  const sql = "SELECT * FROM patient_data;";
  
 
  
  db.query(sql,[], (err, data) => {
    if (err) {
      console.error("Error", err);
      res.status(500).json({ message: "Failed to show data" });
    } else {
      if (data.length > 0) {
        console.log("Data shown successfully");
        res.json(data);
      } else {
        res.json({ message: "No data found" });
      }
    }
  });
});
// app.get('/ShowAndIdNext', (req, res) => {
//   const sql = "SELECT * FROM todolists where status='next';";
  
 
  
//   db.query(sql,[], (err, data) => {
//     if (err) {
//       console.error("Error", err);
//       res.status(500).json({ message: "Failed to show data" });
//     } else {
//       if (data.length > 0) {
//         console.log("Data shown successfully");
//         res.json(data);
//       } else {
//         res.json({ message: "No data found" });
//       }
//     }
//   });
// });

app.get('/ShowAndIdDown', (req, res) => {
  const sql = "SELECT * FROM patient_data;";
  
 
  
  db.query(sql,[], (err, data) => {
    if (err) {
      console.error("Error", err);
      res.status(500).json({ message: "Failed to show data" });
    } else {
      if (data.length > 0) {
        console.log("Data shown successfully");
        res.json(data);
      } else {
        res.json({ message: "No data found" });
      }
    }
  });
});
app.get('/CheckAdmin', (req, res) => {
  const sql = "SELECT * FROM student;";
  
 
  
  db.query(sql,[], (err, data) => {
    if (err) {
      console.error("Error", err);
      res.status(500).json({ message: "Failed to show data" });
    } else {
      if (data.length > 0) {
        console.log("Data shown successfully");
        res.json(data);
      } else {
        res.json({ message: "No data found" });
      }
    }
  });
});

app.post('/Edit2', (req, res) => {
    
  const sql = `UPDATE student SET  name=? ,email=?,username=?,password=? WHERE id=?;`;
  
   
    const id=req.body.id;
    const name=req.body.name;
    const email=req.body.email;
    const username=req.body.username;
    const password=req.body.password;
    
   
  
  db.query(sql, [name,email,username,password,id], (err, data) => {
    if (err) {
      
      req.setEncoding({err:err});
      console.log("Error");
    }
    else{
      if(data.affectedRows>0){
          console.log("create succesful")
          res.send(data)
          console.log(data)

      }
      else{
          res.send({message:"Incorrect username or password"})
      }
        

    }
    
    
  });

});
app.post('/ShowAndDeleteDiary', (req, res) => {
  const sql = "DELETE FROM mydiary WHERE id=?;";
  const id=req.body.id;
 
  
  db.query(sql,[id], (err, data) => {
    if (err) {
      console.error("Error", err);
      res.status(500).json({ message: "Failed to show data" });
    } else {
      if (data.length > 0) {
        console.log("Data deleted successfully");
        res.json(data);
        
      } else {
        res.json({ message: "No data found" });
      }
    }
  });
});
app.post('/ShowAndDeleteToday', (req, res) => {
  const sql = "DELETE FROM todolists WHERE tno=? and status='today';";
  const tno=req.body.tno;
 
  
  db.query(sql,[tno], (err, data) => {
    if (err) {
      console.error("Error", err);
      res.status(500).json({ message: "Failed to show data" });
    } else {
      if (data.length > 0) {
        console.log("Data deleted successfully");
        res.json(data);
        
      } else {
        res.json({ message: "No data found" });
      }
    }
  });
});
app.post('/ShowAndDeleteNext', (req, res) => {
  const sql = "DELETE FROM todolists WHERE tno=? and status='next';";
  const tno=req.body.tno;
 
  
  db.query(sql,[tno], (err, data) => {
    if (err) {
      console.error("Error", err);
      res.status(500).json({ message: "Failed to show data" });
    } else {
      if (data.length > 0) {
        console.log("Data deleted successfully");
        res.json(data);
        
      } else {
        res.json({ message: "No data found" });
      }
    }
  });
});
app.post('/ShowAndBook', (req, res) => {
    
  const sql = "INSERT INTO tms(tid ,username,password,ticket)VALUES(?,?,?,?);";
  
   
    const tid=req.body.tid;
    const username=req.body.username;
    const password=req.body.password;
    const ticket=req.body.ticket;
    // const date=req.body.date;
    // const time=req.body.time;
    // const ticket=req.body.ticket;
   
  
  db.query(sql, [tid,username,password,ticket], (err, data) => {
    if (err) {
      
      req.setEncoding({err:err});
      console.log("Error");
    }
    else{
      if(data.length>0){
          console.log("booked succesful")
          res.send(data)

      }
      else{
          res.send({message:"Incorrect username or password"})
      }
        

    }
    
    
  });

});
app.get('/Show', (req, res) => {
  const sql = "SELECT * FROM mydiary;";
  
 
  
  db.query(sql,[], (err, data) => {
    if (err) {
      console.error("Error", err);
      res.status(500).json({ message: "Failed to show data" });
    } else {
      if (data.length > 0) {
        console.log("Data shown successfully");
        res.json(data);
      } else {
        res.json({ message: "No data found" });
      }
    }
  });
});
app.get('/GetTasksDiary', (req, res) => {
  const sql = "SELECT * FROM mydiary;"; // Assuming 'tname' is the column name for tasks in your table

  db.query(sql, (err, data) => {
    if (err) {
      console.error("Error", err);
      res.status(500).json({ message: "Failed to fetch tasks" });
    } else {
      const tasks = data.map(row => ({ id: row.id, text: row.text })); // Extract task names from the data

      res.json(tasks); // Send the tasks array to the frontend
    }
  });
});
app.get('/GetTasksToday', (req, res) => {
  const sql = "SELECT * FROM todolists where status='today';"; // Assuming 'tname' is the column name for tasks in your table

  db.query(sql, (err, data) => {
    if (err) {
      console.error("Error", err);
      res.status(500).json({ message: "Failed to fetch tasks" });
    } else {
      const tasks = data.map(row => ({ tno: row.tno, tname: row.tname })); // Extract task names from the data
      res.json(tasks); // Send the tasks array to the frontend
    }
  });
});
app.get('/GetTasksNext', (req, res) => {
  const sql = "SELECT * FROM todolists where status='next';"; // Assuming 'tname' is the column name for tasks in your table

  db.query(sql, (err, data) => {
    if (err) {
      console.error("Error", err);
      res.status(500).json({ message: "Failed to fetch tasks" });
    } else {
      const tasks = data.map(row => ({ tno: row.tno, tname: row.tname })); // Extract task names from the data
      res.json(tasks); // Send the tasks array to the frontend
    }
  });
});
app.get('/Booked', (req, res) => {
  const sql = "SELECT * FROM tms WHERE id = (SELECT MAX(id) FROM tms);";
  
  
  db.query(sql, (err, data) => {
    if (err) {
      console.error("Error", err);
      res.status(500).json({ message: "Failed to retrieve data" });
    } else {
      if (data.length > 0) {
        console.log("Data retrieved successfully");
        res.json(data);
      } else {
        res.json({ message: "No data found" });
      }
    }
  });
});


app.post('/DelTicket', (req, res) => {
  const sql = "DELETE FROM tms WHERE id=?;";
  const id=req.body.id;
 
  
  db.query(sql,[id], (err, data) => {
    if (err) {
      console.error("Error", err);
      res.status(500).json({ message: "Failed to show data" });
    } else {
      if (data.length > 0) {
        console.log("Data deleted successfully");
        res.json(data);
      } else {
        res.json({ message: "No data found" });
      }
    }
  });
});
// Todo
app.post('/AddTodo', (req, res) => {
  const { tname } = req.body;
  const status="today";
  const sql = "INSERT INTO todolists (tname, status) VALUES ( ?, ?)";
  
  db.query(sql, [ tname, status], (err, data) => {
    if (err) {
      console.error("Error", err);
      res.status(500).json({ message: "Failed to add todo" });
    } else {
      console.log("Todo added successfully");
      res.json({ message: "Todo added successfully" });
    }
  });
});




db.connect((err,values) => {
    if (err) {
      console.error('Error connecting to database: ', err);
      return;
    }
    console.log('Connected to database!');
    app.listen(8081, () => {
      console.log("Server is listening on port 8081",values);
    });
  });
 
  