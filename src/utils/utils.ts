import moment from 'moment'
import {ServiceStatus} from "@/components/ServiceJournal/serviceJournal.types";

export interface DateComparison {
    current: string,
    comparable: string,
}
export const dateComparison = ({current, comparable}: DateComparison) => {
    const momentA = moment(current, "DD.MM.YYYY hh:mm")
    const momentB = moment(comparable, "DD.MM.YYYY hh:mm")
    if (moment(momentA).isBefore(momentB)) {
        return -1;
    }
    if (moment(momentA).isAfter(momentB)) {
        return 1;
    }
    if (moment(momentA).isSame(momentB)) {
        return 0;
    }
}
export const dateComparisonValue = ({current, comparable}: DateComparison) => {
    const momentA = moment(current, "DD.MM.YYYY hh:mm")
    const momentB = moment(comparable, "DD.MM.YYYY hh:mm")

    const days = momentA.diff(momentB, "days")
    const hours = momentA.diff(momentB, "hours")
    const minutes = momentA.diff(momentB, "minutes")
    const hoursDiff = hours - (days ? days * 24 : 0)
    const minutesDiff = minutes - (hours ? hours * 60 : 0)
    const result = { days, hours: hoursDiff, minutes: minutesDiff}

    return result
}
export const checkStatus = (status: ServiceStatus) => {
    let color
    switch (status) {
        case "В работе":
            color = "blue";
            break;
        case "Закрыто":
            color = "green"
            break;
        case "Зарегистрировано":
            color = "grey";
            break;
        case "На согласовании":
        case "Выполнено. Требует подтверждения":
            color = "gold";
            break;
        default:
            color = 'white'
    }
    return color
}