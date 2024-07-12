'use client'
import s from './Journal.module.scss'
import {useRouter} from "next/navigation";
import RegistrationForm from "@/components/RegistrationForm/RegistrationForm";

export default function Journal() {
    const {push} = useRouter()
    const checkRegistration = async (value) => {
        push('/table', {scroll: false})
    }

    return (
        <div className={s.journalWrapper}>
            <div className={s.body}>
                <div className={s.firstHeader}>Логин</div>
                <RegistrationForm checkRegistration={checkRegistration}/>
            </div>
        </div>
    )
}