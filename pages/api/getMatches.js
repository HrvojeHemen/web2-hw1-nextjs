import path from 'path';
import { promises as fs } from 'fs';

export default async function handler(req, res) {
    //Read the json data file data.json
    const fileContents = await fs.readFile('public/data/matches.json', 'utf8');
    //Return the content of the data file in json format
    let obj = JSON.parse(fileContents)
    res.status(200).json(obj);
}