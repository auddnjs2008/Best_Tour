import client from '@libs/server/client';
import withHandler from '@libs/server/withHandler';
import { withApiSession } from '@libs/server/withSession';
import { NextApiRequest, NextApiResponse } from 'next';


async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { boardId } = req.body;

    try {
        await client.post.delete({
            where: {
                id: boardId
            }
        })

        res.json({ ok: true });
    } catch (e) {
        res.json({ ok: false, error: e })
    }


}

export default withApiSession(withHandler("POST", handler));
