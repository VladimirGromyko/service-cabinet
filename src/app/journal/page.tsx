'use client'
import s from './Journal.module.scss'
import Image from "next/image";
import {useRouter} from "next/navigation";
export default function Journal() {
    const {push} = useRouter()
    return (<div className={s.journal}>
        <div>Journal</div>
        <Image src='/next.svg' alt='' width={200} height={50}/>
    </div>)
}