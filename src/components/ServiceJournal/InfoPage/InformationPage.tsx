import {useAppSelector} from "@/store/hooks";
import s from "./infoPage.module.scss"
import {ButtonsInfoPage} from "@/components/ServiceJournal/InfoPage/Butttons/ButtonsInfoPage";
import {JournalHeader} from "@/components/ServiceJournal/JournalHeader/JournalHeader";
import React from "react";
import moment from "moment";
import {dateComparisonValue} from "@/utils/utils";
import {StatusImg} from "@/components/utils/StatusImg/StatusImg";

export const InformationPage = () => {
    const longString = useAppSelector((state) => {
        return state.infoService.data
    });
    const timePassed = dateComparisonValue({current: new Date(), comparable: longString.term});
    const timePassedString = ` 
    ${timePassed.days
        ? timePassed.days < 2 
            ? timePassed.days + ' день ' 
            : timePassed.days > 1 && timePassed.days < 5 
                ? timePassed.days + ' дня ' 
                : timePassed.days + ' дней ' 
        : ''}
    ${timePassed.hours 
        ? timePassed.hours < 2 
            ? timePassed.hours + ' час ' 
            : timePassed.hours > 1 && timePassed.hours < 5 
                ? timePassed.hours + ' часа '
                : timePassed.hours + ' часов ' 
        : ''}
    ${timePassed.minutes 
        ? timePassed.minutes < 2 
            ? timePassed.minutes + ' минута назад'
            : timePassed.minutes > 1 && timePassed.minutes < 5 
                ? timePassed.minutes + ' минуты назад' 
                : timePassed.minutes + ' минут назад' 
        : 'назад'}
    `

    return (
        <div className={s.infoPageWrapper}>
            <JournalHeader/>
            <div className={s.infoPageSection}>
                <ButtonsInfoPage/>
                <span className={s.infoPageSpace}>
                  <div className={s.mainInfo}>
                      <div className={s.fieldName}>
                          Обращение № {longString.number} от {longString.creationDate}
                      </div>
                      <div className={s.infoTheme}>{longString.theme}</div>
                      <div>{longString.description}</div>
                  </div>
                  <div className={s.extraInfo}>
                      <div className={s.statusImg}>
                          <StatusImg status={longString.status}/>
                          <span>{longString.status}</span>
                      </div>
                      <div className={s.deadline}>
                          <div className={s.fieldName}>Крайний срок</div>
                          <div>{longString.term} - {timePassedString} </div>
                      </div>
                      <div>
                          <div className={s.fieldName}>Решение</div>
                          <div>{longString.solution}</div>
                      </div>
                  </div>
                </span>
                <span className={s.additionally}>
                    Если остались вопросы создайте новое обращение
                </span>
            </div>
        </div>
    )
}