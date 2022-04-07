import fs from 'fs';
import path from 'path'
import process from 'process';
import yaml from 'js-yaml';
import { v5 as uuidv5 } from "uuid";
import stringify from "json-stable-stringify";

const f  = fs.readFileSync(path.resolve(process.cwd(),'define.txt'))
const contentString = f.toString()
const obj = yaml.load(contentString) as any
console.log(obj)
obj.hash=''
const hashString = stringify(obj)
const namespace = uuidv5("https://github.com/sizhicommunity/sizhi", uuidv5.URL);
const hash = uuidv5(hashString,namespace);
console.log(namespace);
console.log(hash)