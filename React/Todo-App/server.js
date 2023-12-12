let express = require("express");
const mongodb = require("mongodb");
let sanitizeHTML = require("sanitize-html");
let app = express();
let db;

app.use(express.static("public"));

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  "mongodb+srv://todoAppUser:Eligandin1@cluster0.att56ej.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    db = client.db("TodoAPP");

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );

    app.listen(3000);
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

function passwordProtected(req, res, next) {
  res.set("WWW-authenticate", "Basic realm='Simple Todo App'");
  console.log(req.headers.authorization);
  if (req.headers.authorization == "Placeholder") {
    next();
  } else {
    res.status(401).send("Authentication required");
  }
}

app.use(passwordProtected);

app.get("/", async (req, res) => {
  let items = await db.collection("items").find().toArray();
  res.send(`<!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Simple To-Do App</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css" integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS" crossorigin="anonymous">
  </head>
  <body>
    <div class="container">
      <h1 class="display-4 text-center py-1">To-Do App !!!!$$</h1>
      
      <div class="jumbotron p-3 shadow-sm">
        <form id="create-form" action="/create-item" method="POST">
          <div class="d-flex align-items-center">
            <input id="create-field" name="item" autofocus autocomplete="off" class="form-control mr-3" type="text" style="flex: 1;">
            <button class="btn btn-primary">Add New Item</button>
          </div>
        </form>
      </div>
      
      <ul id="item-list" class="list-group pb-5">
        ${items
          .map((item) => {
            return `<li class="list-group-item list-group-item-action d-flex align-items-center justify-content-between">
            <span class="item-text">${item.text}</span>
            <div>
              <button data-id="${item._id}" class="edit-me btn btn-secondary btn-sm mr-1">Edit</button>
              <button data-id="${item._id}" class="delete-me btn btn-danger btn-sm">Delete</button>
            </div>
          </li>`;
          })
          .join("")}
      </ul>
      
    </div>
    <script src="https://unpkg.com/axios@1.1.2/dist/axios.min.js"></script>
    <script src="/browser.js"></script>
  </body>
  </html>`);
});

// Creating a task
app.post("/create-item", async (req, res) => {
  try {
    let safeText = sanitizeHTML(req.body.text, {
      allowedTags: [],
      allowedAttributes: {},
    });

    let info = await db.collection("items").insertOne({ text: safeText });
    let data = await db.collection("items").findOne({ _id: info.insertedId });

    res.json(data);
  } catch (err) {
    console.log("post create " + err);
  }
});

// Editing Feature
app.post("/update-item", (req, res) => {
  let newInput = sanitizeHTML(req.body.text, {
    allowedTags: [],
    allowedAttributes: {},
  });

  let objectId = new mongodb.ObjectId(req.body.id);
  try {
    db.collection("items").findOneAndUpdate(
      { _id: objectId },
      { $set: { text: newInput } },
      () => {
        res.send("Successfully updated the item");
      }
    );
  } catch (err) {
    console.log("Error Updating item " + err);
  }
});

// Deleting an item
app.post("/delete-item", (req, res) => {
  let objectId = new mongodb.ObjectId(req.body.id);
  db.collection("items").deleteOne({ _id: objectId }, () => {
    res.send("Successfully deleted the item");
  });
});
