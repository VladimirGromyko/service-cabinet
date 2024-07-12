export const PATH = {
    REGISTRATION: "/registration",
    LOGIN: "/login",
    ERROR: "/404",
    BAD: "/*",
    EDIT_PROFILE: "/edit",
    START_PAGE: "/",
    PROFILE: "/profile",
    MAIN: "/main",
    TEST: "/test",
    CHANGE_PASSWORD: "/change-pass/:token",
    PASSWORD_RECOVERY: "/pass-recovery",
};

export interface Route {
    path: string;
    // component: JSX.Element;
}

export const routes: Route[] = [
    {
        path: PATH.START_PAGE,
    },
    {
        path: PATH.LOGIN,
    },
    {
        path: PATH.REGISTRATION,
    },
    {
        path: PATH.PASSWORD_RECOVERY,
    },
    {
        path: PATH.CHANGE_PASSWORD,
    },
    {
        path: PATH.ERROR,
    },
    {
        path: PATH.BAD,
    },

    //require auth below
    {
        path: PATH.PROFILE,
    },
    {
        path: PATH.MAIN,
    },
];
