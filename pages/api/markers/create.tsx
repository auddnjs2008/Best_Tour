import client from '@libs/server/client';
import withHandler from '@libs/server/withHandler';
import { withApiSession } from '@libs/server/withSession';
import { NextApiRequest, NextApiResponse } from 'next';


async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { info } = req.body;

    // 마커 생성
    const { fileId, latitude, longitude, id, name, color } = info;

    await client.marker.create({
        data: {
            placeId: id,
            latitude: +latitude,
            longitude: +longitude,
            userId: +(req.session as any).user.id,
            imageUrls: "",
            name,
            color,
            fileId
        }
    });

    res.status(200).end();

}

export default withApiSession(withHandler("POST", handler));
