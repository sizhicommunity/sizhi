import { Repository, Runner } from "@sizhi/domain";
import { services } from ".";
import path from 'path';


let port = process.env.PORT??3000
let dbPath = process.env.DB_PATH??"."
let rep = new Repository({ defines: [], logs: [] }, path.join(dbPath, "./sizhi.db"));
services.repository = rep;
services.runner = new Runner(rep, 10);

services.app.listen(port);

