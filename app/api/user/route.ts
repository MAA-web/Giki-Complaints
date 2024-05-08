import { NextApiRequest, NextApiResponse } from 'next';

import { NextResponse } from "next/server";

// export const route = async (req: NextApiRequest, res: NextApiResponse) => {
//   switch (req.method) {
//     case 'GET':
//       // Handle GET request
//       return res.status(200).send(`GET request received`);
//     case 'POST':
//       // Handle POST request
//       return res.status(201).json({ message: 'POST request received' });
//     case 'PUT':
//       // Handle PUT request
//       return res.status(200).json({ message: 'PUT request received' });
//     case 'DELETE':
//       // Handle DELETE request
//       return res.status(200).json({ message: 'DELETE request received' });
//     default:
//       return res.status(405).json({ message: 'Method not allowed' });
//   }
// };

// export async function POST(req: NextApiRequest, res: NextApiResponse)  {
//     return res.status(200).send(`GET request received`);
// }

export async function POST(req: Request)  {
    const payload = await req.json()
    console.log(payload)
    return NextResponse.json({
        payload
    })
}