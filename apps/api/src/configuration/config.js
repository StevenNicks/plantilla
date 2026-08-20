import { config } from 'dotenv'
config()

export const PORT          = process.env.PORT          || 4000

export const MONGO_URI     = process.env.MONGO_URI

export const TOKEN_SECRET  = process.env.TOKEN_SECRET  || 'some secret key'
export const NODE_ENV      = process.env.NODE_ENV      || 'development'
export const CLIENT_URL    = process.env.CLIENT_URL    || 'http://localhost:3000'



// FRONT
// NEXT_PUBLIC_API_URL=http://localhost:4000/api
