import { ok } from "assert";
import { NextApiRequest, NextApiResponse } from "next";

export default function (req: NextApiRequest, res: NextApiResponse){
    
    res.json({ num: Math.floor(Math.random() * 10)})
}

// http://localhost:3000/api/random-num