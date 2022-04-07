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
        }
    });

    if (!user) {

        user = await client.user.create({
            data: {
                email,
                name: "Annonymous"
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


    } else {
        console.log("유저 있음");

    }
};


export default withHandler("POST", handler);
