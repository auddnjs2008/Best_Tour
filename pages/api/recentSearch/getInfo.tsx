import client from '@libs/server/client';
import withHandler from '@libs/server/withHandler';
import { withApiSession } from '@libs/server/withSession';
import { NextApiRequest, NextApiResponse } from 'next';


async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const searches = await client.recentSearch.findMany({
            where: {
                userId: (req.session as any).user.id
            }
        })
        return res.json({ ok: true, searches });
    } catch (e) {
        return res.json({ ok: false, error: `${e}` });
    }

}

export default withApiSession(withHandler("GET", handler));
