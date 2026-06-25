require('dotenv').config();

const express = require ('express')
const cors = require('cors')

const db = require('./config/database')
const userData = require('./routes/user.route')
const employeeData = require("./routes/employee.route")

const app = express()
app.use(cors())
app.use(express.json())

app.use('/api', userData)
app.use('/api',employeeData)

app.get("/", (req, res) => {
  res.send("Backend Working");
});

(async () => {
    const [tables] = await db.query("SHOW TABLES");
    console.log(tables);
})();

db.sync().then(()=> {
    console.log("DB Connected")
    app.listen(process.env.DB_PORT || 3000, () => {
        console.log(`Server is Running on Port ${process.env.DB_PORT}`)
    })
})