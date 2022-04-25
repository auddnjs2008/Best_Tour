import client from '@libs/server/client';
import withHandler from '@libs/server/withHandler';
import { withApiSession } from '@libs/server/withSession';
import { NextApiRequest, NextApiResponse } from 'next';


async function handler(req: NextApiRequest, res: NextApiResponse) {
    const placeInfo = req.body;

    await client.post.create({
        data: {
            userId: (req.session as any).user.id,
            ...placeInfo
        }
    })


}

export default withApiSession(withHandler("POST", handler));
