import express, { Request, Response } from 'express';
import cors from 'cors';
import { checkConnection } from './dbConfig';
import { ApolloServer } from 'apollo-server-express';
import { UserResolver } from './Resolvers/user.resolver';
import { ProductResolver } from './Resolvers/product.resolver';
import { OrderResolver } from './Resolvers/order.resolver';
import { buildSchema } from 'type-graphql';

const startServer = async () => {
    const app = express();
    app.use(cors());

    const schema = await buildSchema({
        resolvers: [UserResolver,ProductResolver,OrderResolver],
        
    });

    const server = new ApolloServer({ schema});

    await server.start();

    server.applyMiddleware({ app: app as any, path: '/e-commerce' });

    app.listen(3000, () => {
        console.log(`Server is running on port 3000..😜`);
        checkConnection();
    });
};

startServer();
