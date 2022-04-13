import client from '@libs/server/client';
import withHandler from '@libs/server/withHandler';
import { NextApiRequest, NextApiResponse } from 'next';


async function handler(req: NextApiRequest, res: NextApiResponse) {

    const response = await (
        await fetch(
            `https://api.cloudflare.com/client/v4/accounts/${process.env.CF_ID}/images/v1/direct_upload`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${process.env.CF_IMAGE_TOKEN}`,
                },
            }
        )
    ).json();

    res.json({
        ok: true,
        ...response.result
    })
};


export default withHandler("GET", handler);
