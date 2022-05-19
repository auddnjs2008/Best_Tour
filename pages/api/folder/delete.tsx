import client from '@libs/server/client';
import withHandler from '@libs/server/withHandler';
import { withApiSession } from '@libs/server/withSession';
import { NextApiRequest, NextApiResponse } from 'next';


async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { fileId } = req.body;

    try {
        await client.marker.deleteMany({
            where: {
                fileId: +fileId
            }
        });

        await client.marker.delete({
            where: {
                id: +fileId
            }
        })

        res.json({ ok: true });

    } catch (e) {
        res.json({ ok: false });
    }

}

export default withApiSession(withHandler("POST", handler))
