import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest, ev: NextFetchEvent) {

    if (!req.url.includes("/api")) {
        if (!req.url.includes("/signup") && !req.url.includes("/enter") && !req.cookies.besttoursession) {
            return NextResponse.redirect(new URL("/enter", req.url));
        }

    }
    return;
}