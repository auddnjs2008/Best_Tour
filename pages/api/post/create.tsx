import client from '@libs/server/client';
import withHandler from '@libs/server/withHandler';
import { withApiSession } from '@libs/server/withSession';
import { NextApiRequest, NextApiResponse } from 'next';


async function handler(req: NextApiRequest, res: NextApiResponse) {
    const placeInfo = req.body;
    try {
        const newPost = await client.post.create({
            data: {
                user: { connect: { id: (req.session as any).user.id } },
                ...placeInfo
            }
        })
        res.json({ ok: true, newPost });
    } catch (e) {
        console.log(e);
        res.json({ ok: false, error: e })
    }


}

export default withApiSession(withHandler("POST", handler));
