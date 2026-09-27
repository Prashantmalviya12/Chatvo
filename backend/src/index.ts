import app from "./app.js"
import connectDB from "./db/db.js"

const port  = process.env.PORT || 8000

connectDB().then(() => {
    app.listen(port,() => {
    console.log("Server Connected with http://localhost:",port)
})
})