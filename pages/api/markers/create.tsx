import client from '@libs/server/client';
import withHandler from '@libs/server/withHandler';
import { withApiSession } from '@libs/server/withSession';
import { NextApiRequest, NextApiResponse } from 'next';


async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { imageUrls, fileId, latitude, longitude, id, name, color, message } = req.body;

    // 마커 생성




    const newMarker = await client.marker.create({
        data: {
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


    res.status(200).end();

}

export default withApiSession(withHandler("POST", handler));
