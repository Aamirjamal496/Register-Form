
const express = require("express");
const cors = require("cors");
const app = express();
var mysql = require("mysql");
var bcrypt = require('bcrypt')
const {toast} = require('react-toastify');
const salt = 10;
const { data } = require("autoprefixer");

app.use(cors());
app.use(express.json());
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "test",
});

connection.connect((err) => {
  if (err) {
    console.log("error conneting database");
    return;
  }
  console.log("connnected");
});
// Creating API's
app.get("/", (request, response) => {
  response.send("rootRoute");
});
app.post("/register", async (request, response) => {
  const first = request.body.first;
  const last = request.body.last;
  const company = request.body.company;
  const phone = request.body.phone;
  const email = request.body.email;
  const password = request.body.password;
  const subject = request.body.subject;
  const option = request.body.option;
  console.log("email is ", email);
  console.log("password is ", password);
  console.log("firstName is ", first);
  console.log("LastName is ", last);
  console.log("Company is ", company);
  console.log("Phone is ", phone);
  console.log("Subject is", subject);
  console.log("Option is ", option);
  
  const query = `INSERT into users (email, password,first, last, company, phone, subject, option) values (?,?,?,?,?,?,?,?)`;
  bcrypt.hash(password.toString(), salt, (err, hash)=>{
    if(err){
      console.log(err)
    }
    connection.query(
      query,
      [email, hash, first, last, company, phone, subject, option],
      (err, result) => {
        if (!err) {
          response.json(result);
        } else {
          response.json("something went wrong");
        }
      }
    );
  });
});

// // Login
// var connection = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "test",
// });


// Without Encryption:
// app.post('/login', (req, res)=>{
//   const sql = `SELECT * FROM users WHERE email = ? AND password = ?`;
//   connection.query(sql, [req.body.email, req.body.password], (err, data) => {
//     if (err) return res.json("Error");
//     if(data.length > 0){
//       return res.json("Login Successful")
//     }else{
//       return res.json("No record found");
//     }
//     // return res.json(data);
//   });
// })


// app.post('/login', (req, res)=>{
//   const sql = `SELECT * FROM users WHERE email = ?`;
//   connection.query(sql, [req.body.email], (err, data) => {
//     if (err) return res.json("Error");
//     if(data.length > 0){
//       bcrypt.compare(req.body.password.toString(), data[0].password, (err, response)=>{
//         if (err) {
//           return res.json('Error')
//         }else if(response){
//           return res.json("Login Successful")
//         }
//       })
//     }else{
//       return res.json("No Record")
//     }
//     // return res.json(data);
//   });
// })

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const sql = `SELECT * FROM users WHERE email = ?`;

  connection.query(sql, [email], async (err, data) => {
    if (err) {
      console.error("Error:", err);
      toast.error("An error occurred. Please try again later.");
      return res.json("Error");
    }

    if (data.length > 0) {
      const user = data[0];
      try {
        // Compare hashed password
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (passwordMatch) {
          toast.success("Login Successful");
          return res.json("Login Successful");
        } else {
          toast.error("Invalid password");
          return res.json("Invalid password");
        }
      } catch (error) {
        console.error("Error comparing passwords:", error);
        toast.error("An error occurred. Please try again later.");
        return res.json("Error comparing passwords");
      }
    } else {
     toast.error("No record found");
      return res.json("No record found");
    }
  });
});

app.listen(3000, () => {
  console.log("listening on port 3000");
})
