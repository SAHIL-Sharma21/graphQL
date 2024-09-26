//maing server
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import {ApolloServer} from '@apollo/server'
import {expressMiddleware} from '@apollo/server/express4'

async function startServer(){
    const app = express();
    const server = new ApolloServer({
        typeDefs:  `

            type User {
                id: ID!
                name: String!
                username: String!
                email: String!
                phone: String!
                website: String!
            }

            type Todo {
                id: ID! 
                title: String!
                completed: Boolean!
                user: User
            }

            type Query {
                getTodos: [Todo]
                getAllUsers: [User]
                getUserById(id: ID!): User
            }


        `, //its string and it the schema -> ! is required field / for fetching we use Query and for giving value we use Mutation
        //all logioc is in resolvers
        resolvers: {
            Todo: {
                user: (todo) => fetch(`https://jsonplaceholder.typicode.com/users/${todo.userId}`).then((res) => res.json()).then((data) => data).catch((err) => console.log(err)),
            },
            Query: {
                getTodos: () => fetch('https://jsonplaceholder.typicode.com/todos').then((res) => res.json()).then((data) => data).catch((err) => console.log(err)),
                getAllUsers: () => fetch('https://jsonplaceholder.typicode.com/users').then((res) => res.json()).then((data) => data).catch((err) => console.log(err)),
                getUserById: (parent, {id}) => fetch(`https://jsonplaceholder.typicode.com/users/${id}`).then((res) => res.json()).then((data) => data).catch((err) => console.log(err)),
            }
        },
    });

    app.use(bodyParser.json());
    app.use(cors())

    await server.start();

    app.use("/graphql", expressMiddleware(server))//any request comes on /graphql url will be handled by apollo server

    app.listen(8000, () => {
        console.log("Server is running on port 8000");
    });
}

startServer();
