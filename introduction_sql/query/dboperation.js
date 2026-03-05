const pool = require('./db');


const getUsers = async () => {
  try{
    const result = await pool.query("SELECT * FROM testtable");
    console.log("user retrive the data")
    return result.rows
  } catch(error){
    throw error
  }
};


const setUser = (request, response)=>{
    const {name,run,country} = request.body;

    pool.query("INSERT INTO testtable (name , run , country) VALUES ($1, $2, $3)",
        [name , run , country],
        (error,result)=>{
            if (error){
                throw error;
            }
          response.status(200).send("user added successfully");
          console.log("data insert into database successfully!")
        }
    )
}

module.exports = { getUsers, setUser };