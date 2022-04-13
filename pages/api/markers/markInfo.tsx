import client from '@libs/server/client';
import withHandler from '@libs/server/withHandler';
import { withApiSession } from '@libs/server/withSession';
import { NextApiRequest, NextApiResponse } from 'next';

async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { placeId } = req.query;

    const matchMarker = await client.marker.findUnique({
        where: {
            placeId: placeId.toString()
        }
    })

    if (matchMarker) {
        return res.json({ ok: true, marker: matchMarker });
    } else {
        return res.json({ ok: false });
    }
}

export default withApiSession(withHandler("GET", handler))
