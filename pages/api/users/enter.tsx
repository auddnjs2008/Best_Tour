
import client from "@libs/server/client";
import withHandler from '@libs/server/withHandler';
import { withApiSession } from '@libs/server/withSession';
import { NextApiRequest, NextApiResponse } from 'next';

async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    const { email, password } = req.body;

    const user = await client.user.findUnique({
        where: {
            email,
        }
    })

    if (!user) {

        return res.json({ ok: false, error: "가입이 안되어 있는 아이디입니다." });
    } else {
        if (user.password === password) {
            (req.session as any).user = {
                id: user.id
            };
            await req.session.save();
            return res.json({ ok: true });
        } else {
            return res.json({ ok: false, error: "비밀번호가 틀립니다." });
        }

    }


}

export default withApiSession(withHandler("POST", handler))
