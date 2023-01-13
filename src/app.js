const {client, connect} = require("./db/connection");
const yargs = require('yargs');
const Movie = require("./utils/index");

async function app(yargsObject) {

    const movieCollection = await connect();
    if (yargsObject.create) {
        const newMovie = new Movie (yargsObject.title, yargsObject.actor, yargsObject.director);
        await newMovie.create(movieCollection);
        console.log(`"${newMovie.title}" has been added.`);

    } else if (yargsObject.update) {
        const query = {title: yargsObject.title};
        const update = {$set: {actor: yargsObject.actor}};
        const result = await movieCollection.updateOne(query, update);
        console.log(result);
        if (result.modifiedCount === 1) {
            console.log("Actor updated")
        } else {
            console.log("Update unsuccsessful");
        };

    } else if (yargsObject.read) {
        const results = await movieCollection.find({}).toArray();
        console.table(results);

    } else if (yargsObject.delete) {
            if (yargsObject.title) {
                const checkTrue = await movieCollection.findOne({title: yargsObject.title})
                if (checkTrue) {
                    console.log(`"${yargsObject.title}" has been deleted.`)
                    await movieCollection.deleteOne({title: yargsObject.title})
                }
            };

    } else {
        console.log("Command not recognised");
    };

    await client.close();
};

app(yargs.argv);