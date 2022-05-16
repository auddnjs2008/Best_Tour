import client from '@libs/server/client';
import withHandler from '@libs/server/withHandler';
import { withApiSession } from '@libs/server/withSession';
import { NextApiRequest, NextApiResponse } from 'next';


async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { postId, message } = req.body;
    try {
        await client.reply.create({
            data: {
                postId,
                message,
                userId: (req.session as any).user.id
            }
        })

        res.json({ ok: true });
    } catch (e) {
        console.log(e);
        res.json({ ok: false, error: e });
    }

}

export default withApiSession(withHandler("POST", handler));
