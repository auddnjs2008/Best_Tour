import client from '@libs/server/client';
import withHandler from '@libs/server/withHandler';
import { withIronSessionApiRoute } from 'iron-session/next';
import { NextApiRequest, NextApiResponse } from 'next';

async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { latitude, longitude } = req.query;

    const markers = await client.marker.findMany({
        where: {
            userId: (req.session as any).user.id
        }
    })

    if (markers.length !== 0) {
        const matchMarker = markers.find(marker => marker.latitude === +latitude && marker.longitude === +longitude);
        return res.json({ ok: true, marker: matchMarker });
    } else {
        return res.json({ ok: false });
    }
}

export default withIronSessionApiRoute(withHandler("GET", handler), {
    cookieName: "besttoursession",
    password: process.env.SESSION_KEY!
});