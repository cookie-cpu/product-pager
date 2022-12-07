import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  total: number
}




export default function handler(
  
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  let total = 0;
  if (req.method === 'POST') {
    console.log(`POST REQUEST: SOMEONE SPENT: $${req.body}`);
    total = total+parseInt(req.body) 
    console.log(`store total is ${total}`);
  } else {
    res.status(200).json({ total: total })
  }


  
}
//http://localhost:3000/api/store
