
import client from "@libs/server/client";
import withHandler from '@libs/server/withHandler';
import { withApiSession } from '@libs/server/withSession';
import { NextApiRequest, NextApiResponse } from 'next';

async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    const { email, name, avatar } = req.body;
    try {
        await client.user.update({
            where: {
                id: (req.session as any).user.id,
            },
            data: {
                email,
                name,
                avatar
            }
        })
        res.json({ ok: true });
    } catch (e) {
        res.json({ ok: false });
    }
}

export default withApiSession(withHandler("POST", handler))
