# Node-CRUD
CRUD API integration with Node and MongoDB

# download and install Node and mongoDB using homebrew on mac
https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/
`brew install node`

# steps to start and configure server
1. Clone/Fork the repo in your workspace
2. install the dependancies using `npm install`
3. set up `.env` file at a root level
4. run your mongodb server and change configuration at config/db.js if applicable
5. run command `npm start` to start the server

# API
1. Load all movies from seeder
curl --location --request POST 'http://localhost:3000/api/load/all'

2. Get All movies (without filtering and options)
curl --location --request GET 'http://localhost:3000/api/movies'

3. Get movie by id
curl --location --request GET 'http://localhost:3000/api/movies/5edab5b4a92dc58e819c33a5'

4. Update movie by id
curl --location --request PUT 'http://localhost:3000/api/movies/5edab5b4a92dc58e819c33a5' \
--header 'Content-Type: application/json' \
--data-raw '{
        "title": "1000",
        "release_year": "2011",
        "locations": "555 Market St.",
        "production_company": "SPI Cinemas updated",
        "writer": "Umarji Anuradha, Jayendra, Aarthi Sriram, & Suba",
        "actor_1": "Siddarth",
        "actor_3": "Siddarth"
    }'

5. Delete movie by id
curl --location --request DELETE 'http://localhost:3000/api/movies/5edab5b4a92dc58e819c33a5'

6. Insert movie
curl --location --request POST 'http://localhost:3000/api/movies' \
--header 'Content-Type: application/json' \
--data-raw '{
        "title": "1000",
        "release_year": "2011",
        "locations": "555 Market St.",
        "production_company": "SPI Cinemas updated",
        "director": "jayendra",
        "writer": "Umarji Anuradha, Jayendra, Aarthi Sriram, & Suba",
        "actor_1": "Siddarth",
        "actor_2": "Nithya Menon",
        "actor_3": "Siddarth"
    }'

7. Update Movie by Query
curl --location --request PUT 'http://localhost:3000/api/movies?actor_1=Siddarth&locations=555%20Market%20St.&release_year=2011' \
--header 'Content-Type: application/json' \
--data-raw '{
	"distributor": "Home Production",
	"actor_2": "HP"
}'

8. Get Movie with filtering in query and options
curl --location --request GET 'http://localhost:3000/api/movies?title=Always%20Be%20My%20Maybe' \
--header 'limit: 50' \
--header 'offset: 0' \
--header 'sort_by: release_year' \
--header 'sort_val: desc'