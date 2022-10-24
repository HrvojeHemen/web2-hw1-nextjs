import path from 'path';
import { promises as fs } from 'fs';

export default async function handler(req, res) {
    //Find the absolute path of the json directory
    //Read the json data file data.json
    const fileContents = await fs.readFile('public/data/matches.json', 'utf8');
    let obj = JSON.parse(fileContents)
    obj.push({"bla":"bla"})
    await fs.writeFile('public/data/matches.json', JSON.stringify(obj, null, 4));

    res.status(200).json(obj);
}