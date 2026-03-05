import express from "express"
import { MongoClient } from "mongodb"
import cors from "cors"

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static("public"))

const client = new MongoClient("mongodb://127.0.0.1:27017")

let db

async function startServer() {
  await client.connect()
  db = client.db("bookdb")

  app.listen(3000, () => {
    console.log("Server running at http://localhost:3000")
  })
}

startServer()

// GET BOOKS WITH PAGINATION
app.get("/books", async (req, res) => {

  const page = parseInt(req.query.page) || 1
  const limit = 5
  const search = req.query.search || ""
  const category = req.query.category || ""
  const sort = req.query.sort || ""

  let query = {}

  if (search) {
    query.title = { $regex: search, $options: "i" }
  }

  if (category) {
    query.category = category
  }

  let cursor = db.collection("books").find(query)

  if (sort === "price") {
    cursor = cursor.sort({ price: 1 })
  }

  if (sort === "rating") {
    cursor = cursor.sort({ rating: -1 })
  }

  const books = await cursor
    .skip((page - 1) * limit)
    .limit(limit)
    .toArray()

  res.json(books)
})