const movie_controllers = require("../controllers/movie");

const router = (app) => {

    app.route("/ping")
        .get((req, res) => {
            res.status(200).send({message: "Server is up and running"})
        })
    
    app.route("/api/movies")
        .post(movie_controllers.insert_movie)
        .get(movie_controllers.get_all_movies)

    app.route("/api/movies/:id")
        .put(movie_controllers.update_movie)
        .get(movie_controllers.get_movie_by_id)
        .delete(movie_controllers.delete_movie);

}


module.exports = router;