import dotenv from "dotenv"
import createApp from "./app"
import MongoDB from "./db"
dotenv.config()

const port = process.env.PORT || 5000
const app = createApp()

;(async () => {
  try {
    MongoDB.initialize({
      uri: process.env.MONGODB_URI as string,
      dbName: process.env.DB_NAME as string,
    })
    await MongoDB.getDb()

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`)
    })
  } catch (error) {
    console.error("Database connection failed", error)
    process.exit(1)
  }
})()
