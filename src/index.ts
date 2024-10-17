import express from 'express'
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import bodyParser from 'body-parser';
import cors from 'cors'

async function init(){

const app = express()

const PORT = Number(process.env.PORT) || 5000

app.use(express.json())
app.use(bodyParser.json())
app.use(cors())

// Create Graphql Server

const gqlServer = new ApolloServer({
  typeDefs:`
  type Query{
    hello: String
    say(name:String): String
  }
  `,
  resolvers:{
    Query:{
        hello:()=> 'Hey, I am a GraphQL Server...',
        say:(_,{name}:{name:string})=> `Hey My Name is ${name}`
    }
  },
})

// Start the GQL Server
await gqlServer.start()

app.use("/graphql",expressMiddleware(gqlServer))

app.get('/',(req,res)=>{
    res.json({message:'API is Running Successfully!'})
})

app.listen(PORT,()=>{
    console.log(`API is running on port: ${PORT}`);
})
}

init()