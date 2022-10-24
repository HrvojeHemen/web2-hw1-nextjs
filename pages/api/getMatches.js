import {supabase} from "../../db/supabaseConnector";

export default async function handler(req, res) {
    //Read the json data file data.json
    const { data, error } = await supabase
        .from('Match')
        .select()
    console.log(data)
    res.status(200).json(data);
}