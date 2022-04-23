import client from '@libs/server/client';
import withHandler from '@libs/server/withHandler';
import { withApiSession } from '@libs/server/withSession';
import { NextApiRequest, NextApiResponse } from 'next';

async function handler(req: NextApiRequest, res: NextApiResponse) {

    const markers = await client.marker.findMany({
        where: {
            userId: (req.session as any).user.id,
        },
        include: {
            file: true,
        }
    })

    return res.json({ ok: true, markers });
}

export default withApiSession(withHandler("GET", handler))
