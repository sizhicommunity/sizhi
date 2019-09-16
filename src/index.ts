
import * as express from "express";
import * as bodyParser from 'body-parser'


import { env } from "./Env";
import { provider as rssProvider } from "./RssDataprovider";



const app = express();
const port = 1112; // default port to listen




app.use(bodyParser.json())


app.post("/feeds", async function (req, res, next) {
    try {
        const data = await req.body
        const type: string = data.type
        const resource: string = data.resource
        const params: { [key: string]: any; } = data.params
        const result: Promise<any> = await (await rssProvider)(type, resource, params)
        res.status(200).json(await result).send()
    } catch (e) {
        next(e);
    }
})

app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`server started at http://localhost:${port}`);
});




