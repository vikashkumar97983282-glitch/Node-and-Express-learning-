const pool = require('./db');

const getUsers = (request, response) => {
  pool.query("SELECT * FROM testtable", (error, result) => {
    if (error) {
      throw error;
    }
    response.status(200).json(result.rows);
    console.log("user fetch data ")
  });
};


const setUser = (request, response)=>{
    const {name,run,country} = request.body;

    pool.query("INSERT INTO testtable (name , run , country) VALUES ($1,$2,$3)",
        [name , run , country],
        (error,result)=>{
            if (error){
                throw error;
            }
            response.status(200).send("user added successfully")
        }
    )
}

module.exports = { getUsers, setUser };