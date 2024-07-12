import moment from 'moment'

export interface DateComparison {
    current: string,
    next: string,
}
export const dateComparison = ({current, next}: DateComparison) => {
    const momentA = moment(current, "DD.MM.YYYY hh:mm")
    const momentB = moment(next, "DD.MM.YYYY hh:mm")
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