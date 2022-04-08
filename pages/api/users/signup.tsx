import client from '@libs/server/client';
import withHandler from '@libs/server/withHandler';
import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from 'next';


async function handler(req: NextApiRequest, res: NextApiResponse) {

    const { email, password, passwordConfirm } = req.body;
    if (password !== passwordConfirm) {
        return res.status(400).end();
    }

    let user;
    user = await client.user.findUnique({
        where: {
            email
        },
        include: {
            tokens: true
        }
    });

    if (!user) {
        user = await client.user.create({
            data: {
                email,
                name: "Annonymous",
                password
            }
        });
        const payload = Math.floor(100000 + Math.random() * 900000) + "";

        const token = await client.token.create({
            data: {
                payload,
                user: {
                    connect: {
                        id: user.id
                    }
                }
            }
        });

        return res.json({ ok: true, token: token.payload });
    } else {
        // token이 있는 경우와 없는 경우 
        if (user.tokens) {
            return res.json({ ok: true, token: user.tokens[0].payload });
        } else {
            return res.json({ ok: false, error: "같은 이메일이 존재합니다." });
        }
    }
};


export default withHandler("POST", handler);
