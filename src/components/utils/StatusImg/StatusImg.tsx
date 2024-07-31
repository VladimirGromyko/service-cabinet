import {ServiceStatus} from "@/components/ServiceJournal/serviceJournal.types";
import s from "./StatusImg.module.scss"
import {checkStatus} from "@/utils/utils";

interface Props {
    status: ServiceStatus
}

export const StatusImg = ({status}: Props) => {
    return <div className={`${s.status} ${s[checkStatus(status)]}`}></div>
}