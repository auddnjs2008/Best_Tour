import client from '@libs/server/client';
import withHandler from '@libs/server/withHandler';
import { withApiSession } from '@libs/server/withSession';
import { NextApiRequest, NextApiResponse } from 'next';


async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { name, info } = req.body;

    await client.file.create({
        data: {
            name,
            userId: (req.session as any).user.id,
            info
        }
    });

    res.json({ ok: true });

}

export default withApiSession(withHandler("POST", handler));
