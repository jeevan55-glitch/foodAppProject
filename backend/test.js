const mongoose = require("mongoose");

mongoose.connect("mongodb://jeevan242_db_user:Jeevan172122@ac-hwfy1qn-shard-00-00.xf0ob2g.mongodb.net:27017,ac-hwfy1qn-shard-00-01.xf0ob2g.mongodb.net:27017,ac-hwfy1qn-shard-00-02.xf0ob2g.mongodb.net:27017/?ssl=true&replicaSet=atlas-ln2bgm-shard-0&authSource=admin&appName=FoodApp")
.then(() => {
    console.log("Connected Successfully");
    process.exit(0);
})
.catch((err) => {
    console.error(err);
    process.exit(1);
});