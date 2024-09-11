import path from "path";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
    type:"postgres",
    host:"localhost",
    port:5432,
    username: "postgres",
    password: "1609",
    database: "e-commerce",
    synchronize: false,
    logging: true,
    entities: [path.join(process.cwd(), "src/models/*.ts")],
    subscribers: [],
})

export const checkConnection = async()=>{
    try {
        await AppDataSource.initialize();
        console.log('DB connected successful 🔥');
        
    } catch (error) {
        console.log('DB connection failed 😱',error);
        
    }
}