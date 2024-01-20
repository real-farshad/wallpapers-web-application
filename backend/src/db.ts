import { MongoClient, Db } from "mongodb"

interface DBConfig {
  uri: string
  dbName: string
}

class MongoDB {
  private static db: Db
  private static config: DBConfig

  static initialize(config: DBConfig): void {
    this.config = config
  }

  static async getDb(): Promise<Db> {
    if (!this.db) {
      try {
        const client = new MongoClient(this.config.uri)
        await client.connect()
        this.db = client.db(this.config.dbName)
        console.log("Connected to MongoDB")
      } catch (error) {
        console.error("Could not connect to MongoDB", error)
        throw error
      }
    }
    return this.db
  }
}

export default MongoDB
