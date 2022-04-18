import client from '@libs/server/client';
import withHandler from '@libs/server/withHandler';
import { NextApiRequest, NextApiResponse } from 'next';


async function handler(req: NextApiRequest, res: NextApiResponse) {

    const { imageIds } = req.body;
    const fetchArr = [];
    try {
        for (let i = 0; i < imageIds.length; i++) {
            const fetchReq =
                fetch(
                    `https://api.cloudflare.com/client/v4/accounts/${process.env.CF_ID}/images/v1/${imageIds[i]}`,
                    {
                        method: "DELETE",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${process.env.CF_IMAGE_TOKEN}`,
                        },
                    }
                ).then(res => res.json());

            fetchArr.push(fetchReq);
        }

        const allReq = (await Promise.all(fetchArr)).map(item => item.success);

        if (allReq.includes(false)) return res.json({ ok: false });

        return res.json({
            ok: true
        });
    } catch (e) {
        return res.json({ ok: false, error: e })
    }

};


export default withHandler("POST", handler);
