import axios from 'axios';
import { jsonPath, objectPath } from '@nielinjie/shorthand';
import _ from 'lodash'
export async function logs(): Promise<any> {
  return axios.get('/api/logs').then((res) => res.data.logs);
}

export async function myDefine(brief = true): Promise<any> {
  return axios.get('/api/myDefine').then((res) => {
    let raw = res.data.myDefine;
    if (brief) {
      let paths = jsonPath.paths(raw,'$..info')
      console.log(paths)
      _.each(paths, (path: string[]) =>{
        _.unset(raw, objectPath.toLodashPath(path));
      })
      return raw;
    } else {
      return raw;
    }
  });
}

export async function defineUrl(url: string): Promise<any> {
  return axios
    .put('/api/myDefineUrl', { myDefineUrl: url })
    .then((res) => res.data);
}

export async function defines(): Promise<any> {
  return axios.get('/api/defines').then((res) => res.data.defines);
}
export async function items(): Promise<any> {
  return axios.get('/api/timeline/items').then((res) => res.data.items);
}

export async function feeds(): Promise<any> {
  return axios.get('/api/feedInfos').then((res) => res.data.feedInfos);
}
