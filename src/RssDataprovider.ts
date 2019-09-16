import { DataProvider, wrap, forResource } from '@quick-qui/data-provider';
import { env } from './Env';

import axios from 'axios'
import * as _ from 'lodash';


// export const provider:DataProvider  = chain(usersProvider,prismaProvider)
export const provider: Promise<DataProvider> = wrap(getFeeds()).then(_ => forResource("Feed", _))

async function getFeeds() {
    return axios.get(env.rsshubUrl + '/api/routes/').then(d => {
        const routes = _(d.data.data).values().map(_ => _.routes).flatten().value()
        return { "Feed": _(routes).map(buildFeed).value() }
    })
}

function buildFeed(path: string): Feed {
    return { id: path, path }
}
interface Feed {
    id: string,
    path: string
}
