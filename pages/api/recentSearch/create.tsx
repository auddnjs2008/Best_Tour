import client from '@libs/server/client';
import withHandler from '@libs/server/withHandler';
import { withApiSession } from '@libs/server/withSession';
import { NextApiRequest, NextApiResponse } from 'next';


async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { name, latitude, longitude, placeId } = req.body;

    try {
        const searches = await client.recentSearch.findMany({
            where: {
                userId: (req.session as any).user.id
            }
        });

        const isExist = searches.findIndex(search => search.placeId === placeId);
        if (isExist !== -1) return res.status(200).end();

        if (searches.length >= 10) {
            await client.recentSearch.delete({
                where: {
                    placeId: searches[0].placeId
                }
            })
        }

        await client.recentSearch.create({
            data: {
                userId: (req.session as any).user.id,
                name,
                latitude: +latitude,
                longitude: +longitude,
                placeId
            }
        });

        return res.json({ ok: true });
    } catch (e) {

        return res.json({ ok: false, error: `${e}` });
    }

}

export default withApiSession(withHandler("POST", handler));
