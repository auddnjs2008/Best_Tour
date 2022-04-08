import client from "@libs/server/client";
import withHandler from "@libs/server/withHandler";
import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method === "GET") {
        const profile = await client.user.findUnique({
            where: {
                id: (req.session as any).user?.id,
            },
        });

        return res.json({ ok: true, profile });
    }
}

export default withIronSessionApiRoute(withHandler("GET", handler), {
    cookieName: "besttoursession",
    password: process.env.SESSION_KEY!
});