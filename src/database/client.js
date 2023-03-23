import 'dotenv/config'
import pg from 'pg'

export const client = new pg.Client({})

await client.connect()