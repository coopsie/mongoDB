class Movie {
    constructor (inputTitle, inputActor = "Not Specified", inputDirector = "Not Specified") {
        this.title = inputTitle;
        this.actor = inputActor;
        this.director = inputDirector;
    };
    async create (movieCollection) {
        console.log("Entering add within index.js"); // this console.log is for debugging purposes, can delete later
        await movieCollection.insertOne(this);
        //code to save a movie to the database here
    };
};

module.exports = Movie;