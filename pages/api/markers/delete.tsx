import client from '@libs/server/client';
import withHandler from '@libs/server/withHandler';
import { withApiSession } from '@libs/server/withSession';
import { NextApiRequest, NextApiResponse } from 'next';


async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { placeId } = req.body;

    await client.marker.delete({
        where: {
            placeId
        }
    })

    await client.recentSearch.update({
        where: {
            id: placeId
        },
        data: {
            isMarker: false
        }
    })

    res.status(200).end();

}

export default withApiSession(withHandler("POST", handler))
