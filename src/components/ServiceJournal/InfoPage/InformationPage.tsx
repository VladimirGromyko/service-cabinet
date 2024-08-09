import { useAppSelector } from "@/store/hooks";
import s from "./infoPage.module.scss"
import { ButtonsInfoPage } from "@/components/ServiceJournal/InfoPage/Butttons/ButtonsInfoPage";
import { JournalHeader } from "@/components/ServiceJournal/JournalHeader/JournalHeader";
import React, {useState} from "react";
import {dateComparisonValue, timePassedString} from "@/utils/utils";
import { StatusImg } from "@/components/utils/StatusImg/StatusImg";
import { Button, Flex } from "antd";
import { DownOutlined } from '@ant-design/icons';

export const InformationPage = () => {
    const longString = useAppSelector((state) => {
        return state.infoService.data
    });
    const timePassed = dateComparisonValue({
        current: new Date() as string, comparable: longString.term
    });

    // const timePassedString = `
    // ${timePassed.days
    //     ? timePassed.days > 4 && timePassed.days < 21
    //         ? timePassed.days + ' дней '
    //         : timePassed.days % 10 > 0 && timePassed.days % 10 < 2
    //             ? timePassed.days + ' день '
    //             : timePassed.days % 10 > 1 && timePassed.days % 10 < 5
    //                 ? timePassed.days + ' дня '
    //                 : timePassed.days + ' дней '
    //     : ''}
    // ${timePassed.hours
    //     ? timePassed.hours > 4 && timePassed.hours < 21
    //         ? timePassed.hours + ' часов '
    //         : timePassed.hours % 10 > 0 && timePassed.hours % 10 < 2
    //             ? timePassed.hours + ' час '
    //             : timePassed.hours % 10 > 1 && timePassed.hours % 10 < 5
    //                 ? timePassed.hours % 10 + ' часа '
    //                 : timePassed.hours + ' часов '
    //     : ''}
    // ${timePassed.minutes
    //     ? timePassed.minutes > 4 && timePassed.minutes < 21
    //         ? timePassed.minutes + ' минут'
    //         : timePassed.minutes % 10 > 0 && timePassed.minutes % 10 < 2
    //             ? timePassed.minutes + ' минута'
    //             : timePassed.minutes % 10  > 1 && timePassed.minutes % 10 < 5
    //                 ? timePassed.minutes + ' минуты'
    //                 : timePassed.minutes + ' минут'
    //     : ''}
    // `
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
                          <div>{longString.term} - {timePassedString(timePassed)} назад</div>
                      </div>
                      <div>
                          <div className={s.fieldName}>Решение</div>
                          <div>{longString.solution}</div>
                      </div>
                  </div>
                </span>
                <Flex justify="center">
                    <Button
                        shape="circle"
                        icon={<DownOutlined />}
                        size="large"
                        className={s.buttonDown}
                        onClick={() => console.log("Hello")}
                    />
                </Flex>
                <span className={s.additionally}>
                    Если остались вопросы создайте новое обращение
                </span>
            </div>
        </div>
    )
}