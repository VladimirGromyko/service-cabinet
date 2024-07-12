import {NextRequest, NextResponse} from "next/server";

export async function middleware(request: NextRequest, response: NextResponse) {
    const {url, cookies} = request
    // const { meStatus } = useAppSelector(selectAuth);
    // const refreshToken = true
    // const isDashboardPage = url.includes('/journal')
    // if (isDashboardPage && refreshToken) {
    //     return NextResponse.redirect(new URL('/login', url))
    // }
    return NextResponse.next()
}
export const config = {
    matcher: ['/journal/:path*', '/login/:path']
}