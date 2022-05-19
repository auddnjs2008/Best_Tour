import client from '@libs/server/client';
import withHandler from '@libs/server/withHandler';
import { withApiSession } from '@libs/server/withSession';
import { NextApiRequest, NextApiResponse } from 'next';


async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { imageUrls, fileId, latitude, longitude, id, name, color, message } = req.body;

    // 마커 생성 or 업데이트

    const Marker = await client.marker.upsert({
        where: {
            placeId: id,
        },
        update: {
            imageUrls,
            name,
            color,
            message,
        },
        create: {
            placeId: id,
            latitude: +latitude,
            longitude: +longitude,
            user: { connect: { id: (req.session as any).user.id } },
            imageUrls,
            name,
            color,
            message,
            file: { connect: { id: fileId } }
        }
    });

    await client.recentSearch.update({
        where: {
            id: id
        },
        data: {
            isMarker: true
        }
    })



    res.json({ ok: true });

}

export default withApiSession(withHandler("POST", handler));
