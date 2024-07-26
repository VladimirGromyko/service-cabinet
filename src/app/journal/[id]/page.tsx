'use client'

import {useAppSelector} from "@/store/hooks";


export default function InfoPage() {
    const longString = useAppSelector((state) => { return state.infoService.data });
    return (
        <div>
            <div> Information string:
                <div>===========================</div>

                <div>{longString.changeDate}</div>

                <div>Тема - {longString.theme}</div>
                <div>{longString.service}</div>
                <div>{longString.serviceComposition}</div>
            </div>
        </div>
    )
}