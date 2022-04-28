import client from '@libs/server/client';
import withHandler from '@libs/server/withHandler';
import { withApiSession } from '@libs/server/withSession';
import { NextApiRequest, NextApiResponse } from 'next';

async function handler(req: NextApiRequest, res: NextApiResponse) {

    const posts = await client.post.findMany({
        include: {
            user: true,
        }
    })

    return res.json({ ok: true, posts });
}

export default withApiSession(withHandler("GET", handler))
