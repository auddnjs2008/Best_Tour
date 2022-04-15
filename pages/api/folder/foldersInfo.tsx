import client from '@libs/server/client';
import withHandler from '@libs/server/withHandler';
import { withApiSession } from '@libs/server/withSession';
import { NextApiRequest, NextApiResponse } from 'next';


async function handler(req: NextApiRequest, res: NextApiResponse) {

    const folders = await client.file.findMany({
        where: {
            userId: (req.session as any).user.id
        },
        include: {
            markers: true
        }
    });
    console.log(folders);
    return res.json({ ok: true, folders });

}

export default withApiSession(withHandler("GET", handler));
