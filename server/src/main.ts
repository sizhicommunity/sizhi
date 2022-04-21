import { Repository, Runner } from "@sizhi/domain";
import { services } from ".";

let rep = new Repository({ defines: [], logs: [] }, "./sizhi.db");
services.repository = rep;
services.runner = new Runner(rep, 10);
services.app.listen(3000);

