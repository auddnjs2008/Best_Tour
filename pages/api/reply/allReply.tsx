import client from '@libs/server/client';
import withHandler from '@libs/server/withHandler';
import { withApiSession } from '@libs/server/withSession';
import { NextApiRequest, NextApiResponse } from 'next';


async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { postId } = req.query;
    try {
        const allReply = await client.reply.findMany({
            where: {
                postId: +postId
            },
            include: {
                user: {
                    select: {
                        name: true,
                        avatar: true
                    }
                }
            }
        })
        res.json({ ok: true, replies: allReply });
    } catch (e) {
        res.json({ ok: false, error: e });
    }

}

export default withApiSession(withHandler("GET", handler));
