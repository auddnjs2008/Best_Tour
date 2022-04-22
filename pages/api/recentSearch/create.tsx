import client from '@libs/server/client';
import withHandler from '@libs/server/withHandler';
import { withApiSession } from '@libs/server/withSession';
import { NextApiRequest, NextApiResponse } from 'next';


async function handler(req: NextApiRequest, res: NextApiResponse) {
    const searchInfo = req.body;

    try {
        const searches = await client.recentSearch.findMany({
            where: {
                userId: (req.session as any).user.id
            }
        });

        const isExist = searches.findIndex(search => search.id === searchInfo.id);
        if (isExist !== -1) return res.status(200).end();

        if (searches.length >= 10) {
            await client.recentSearch.delete({
                where: {
                    id: searches[0].id
                }
            })
        }

        const isMarker = await client.marker.findUnique({
            where: {
                placeId: searchInfo.id
            }
        });


        await client.recentSearch.create({
            data: {
                userId: (req.session as any).user.id,
                ...searchInfo,
                isMarker: isMarker ? true : false
            }
        });

        return res.json({ ok: true });
    } catch (e) {
        console.log(e);
        return res.json({ ok: false, error: `${e}` });
    }

}

export default withApiSession(withHandler("POST", handler));
