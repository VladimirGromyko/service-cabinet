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
    const result = {days, hours: hoursDiff, minutes: minutesDiff}

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

export const timePassedString = function (timePassed: { days: number, hours: number, minutes: number }) {
    const getPeriod = (part: number, type: "day" | "hour" | "minute") => {
        let dayPart
        switch (type) {
            case "day":
                dayPart = {one: " день ", many: " дня ", lot: " дней "}
                break
            case "hour":
                dayPart = {one: " час ", many: " часа ", lot: " часов "}
                break
            case "minute":
                dayPart = {one: " минута", many: " минуты", lot: " минут"}
                break
            default:
                dayPart = dayPart = {one: "", many: "", lot: ""}
        }

        const comparisonPart = part % 10
        return `${part 
            ? part > 4 && part < 21
                ? part + dayPart.lot
                : comparisonPart > 0 && comparisonPart < 2
                    ? part + dayPart.one
                    : comparisonPart > 1 && comparisonPart < 5
                        ? part + dayPart.many
                        : part + dayPart.lot
            : ''}`
    }
    return getPeriod(timePassed.days, "day") +
        getPeriod(timePassed.hours, "hour") +
        getPeriod(timePassed.minutes, "minute")
}