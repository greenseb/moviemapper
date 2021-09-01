# Movie Mapper

![Movie Mapper Preview](https://i.ibb.co/306bJVS/mapper.png)

This web app offers an interactive map where you can view and drop pins. The pins represent famous movie locations and give information such as:

* Location
* Description
* Rating
* Author
* Timestamp

You can register as a new user and log in to drop new pins, which you can do by double clicking anywhere on the map. You will be able to tell your pins apart from other users by colour.
___

**Getting Started:**

 1. Clone this repo to your local machine
 2. Install all the dependecies by running `npm install` in both the 'client' and 'server' folders
 3. Adjust the necessary env variables to match your system. (This includes giving your Mongo database a name and running it in the terminal)
 4. You will need an API key for MapBox
 5. Now run `nodemon` inside 'server' and `npm start` inside 'client'
 6. The app should appear in the browser where you can register and login
 7. You should be able to view other users' pins now and double click to add your own

For this app I used the following tech stack:

* MongoDB & Mongoose
* Express
* React
* NodeJS
* Material UI
* Bcrypt
* Mapbox

