//Import packages
const express = require("express");
const fs = require("fs");

let app = express();
let movies = JSON.parse(fs.readFileSync("./data/movies.json"));
app.use(express.json());

// //route = http method + url
// app.get("/", (req, res) => {
//   res.status(200).json({ message: "hello, world", status: 200 });
// });

// GET - api/movies
app.get("/api/v1/movies", (req, res) => {
  res.status(200).json({
    status: "sucess",
    count: movies.length,
    data: {
      movies: movies,
    },
  });
});

// GET - api/v1/movies/3
app.get("/api/v1/movies/:id", (req, res) => {
  // console.log(req.params);
  // res.send("test movie");
  //convet id to type num
  const id = req.params.id * 1;

  // find movie based on id
  let movie = movies.find((el) => el.id === id);

  if (!movie) {
    return res.status(404).json({
      status: "fail",
      message: "movie with id " + id + "is not found",
    });
  }

  //send movie in the respond
  res.status(200).json({
    status: "success",
    data: {
      movie: movie,
    },
  });
});

// POST - api/v1/movies
app.post("/api/v1/movies", (req, res) => {
  // console.log(req.body);
  const newId = movies[movies.length - 1].id + 1;

  const newMovie = Object.assign({ id: newId }, req.body);

  movies.push(newMovie);

  fs.writeFile("./data/movies.json", JSON.stringify(movies), (err) => {
    res.status(201).json({
      status: "success",
      data: {
        movie: newMovie,
      },
    });
  });
  // res.send("created");
});

//create server

const port = 3000;
app.listen(port, () => {
  console.log("server has started...");
});

// patch

app.patch("/api/v1/movies/:id", (req, res) => {
  let id = req.params.id * 1;
  let movieToUpdate = movies.find((el) => el.id === id);

  if (!movieToUpdate) {
    return res.status(404).json({
      status: "fail",
      message: "movie with id " + id + "is not found",
    });
  }
  let index = movies.indexOf(movieToUpdate);

  Object.assign(movieToUpdate, req.body);
  movies[index]=movieToUpdate
  fs.writeFile("./data/movies.json", JSON.stringify(movies), (err) => {
    res.status(200).json({
      status: "success",
      data: {
        movie: movieToUpdate,
      },
    });
  });
});


//delete

app.delete("/api/v1/movies/:id", (req, res) => {
  let id = req.params.id * 1;
  let movieToDelete = movies.find((el) => el.id === id);

  if (!movieToDelete) {
    return res.status(404).json({
      status: "fail",
      message: "movie with id " + id + "is not found",
    });
  }
  let index = movies.indexOf(movieToDelete);

 movies.splice(index,1)
  
  fs.writeFile("./data/movies.json", JSON.stringify(movies), (err) => {
    res.status(204).json({
      status: "success",
      data: {
        movie: null
      },
    });
  });
})