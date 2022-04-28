import client from '@libs/server/client';
import withHandler from '@libs/server/withHandler';
import { withApiSession } from '@libs/server/withSession';
import { NextApiRequest, NextApiResponse } from 'next';

async function handler(req: NextApiRequest, res: NextApiResponse) {

    const { query: { id } } = req;

    const post = await client.post.findUnique({
        where:
        {
            id: +(id)
        },
        include: {
            user: true
        }
    })

    return res.json({ ok: true, post });
}

export default withApiSession(withHandler("GET", handler))
