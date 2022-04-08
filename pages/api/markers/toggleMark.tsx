import client from '@libs/server/client';
import withHandler from '@libs/server/withHandler';
import { withIronSessionApiRoute } from 'iron-session/next';
import { NextApiRequest, NextApiResponse } from 'next';


async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { isStore, info } = req.body;

    if (isStore) {
        // await client.marker.delete({where:{

        // }})

    } else {
        // 마커 생성
        const { latitude, longitude } = info;

        await client.marker.create({
            data: {
                latitude: +latitude,
                longitude: +longitude,
                userId: +(req.session as any).user.id,
                imageUrls: "",
            }
        });
        res.status(200).end();
    }

}

export default withIronSessionApiRoute(withHandler("POST", handler), {
    cookieName: "besttoursession",
    password: process.env.SESSION_KEY!
});