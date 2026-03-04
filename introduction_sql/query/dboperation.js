const pool = require('./db');


const getUsers = (request, response) => {

  let data = []

  pool.query("SELECT * FROM testtable", (error, result) => {
    if (error) {
      throw error;
    }
    response.status(200).json(result.rows);
    console.log("user retrive the data")
    data = result.rows;
    // console.log(data)
  });
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