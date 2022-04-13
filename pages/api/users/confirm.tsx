import client from "@libs/server/client";
import withHandler from "@libs/server/withHandler";
import { withApiSession } from '@libs/server/withSession';
import { NextApiRequest, NextApiResponse } from 'next';

async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    const { token } = req.body;

    const foundToken = await client.token.findUnique({
        where: {
            payload: token
        }
    });

    if (!foundToken) return res.status(404).end();

    (req.session as any).user = {
        id: foundToken.userId
    }
    await req.session.save();
    await client.token.deleteMany({
        where: {
            userId: foundToken.userId
        }
    });

    res.json({ ok: true });
}

export default withApiSession(withHandler("POST", handler))
