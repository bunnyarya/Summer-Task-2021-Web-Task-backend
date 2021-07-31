const express = require('express');
//const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./backend/modles/blogs');
app.use(express.json());

const app = express();
const router = express.Router();

// connect to mongodb & listen for requests 
const dbURI = "mongodb+srv://bunny_arya_:ShubhaMA7@cluster0.brwrx.mongodb.net/Learn_database?retryWrites=true&w=majority";

const details = mongoose
    .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, })
    .then((result) => {
        app.listen(3001, () => { console.log(`Server is runing and listening to localhost 3001`); });
    })
    .catch((err) => console.log(err));

app.use("/api/article", articleRouter);

app.get('/', (req, res) => {
    console.log("Getting requests");
});

const allNews = (req, res) => {
    Blog.find()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        });
};


const addNews = (req, res) => {
    const blog = new Blog(req.body);

    console.log(req.body);

    blog
        .save()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        });
};


const delNews = (req, res) => {
    const id = req.params.id;

    Blog.findByIdAndDelete(id)
        .then((result) => {
            res.send(`Article with id : ${id} deleted`);
        })
        .catch((err) => {
            console.log(err);
        });
};

const like = (req, res) => {
    const id = req.params.id;


    Blog.findByIdAndUpdate(id, { $inc: { like: 1 } }, { new: true })
        .then((result) => {
            res.send("LIKED");
        })
        .catch((err) => console.log(err));
};

const dislike = (req, res) => {
    const id = req.params.id;

    Blog.findByIdAndUpdate(id, { $inc: { dislike: 1 } }, { new: true })
        .then((result) => {
            res.send("DISLIKED");
        })
        .catch((err) => console.log(err));
};


router.get("/all", allNews);
router.post("/", addNews);
router.post("/:id/like", like);
router.delete("/:id", delNews);
router.post("/:id/dislike", dislike);

app.use("/api/article", router);