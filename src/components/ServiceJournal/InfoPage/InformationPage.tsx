import {useAppSelector} from "@/store/hooks";
import s from "./infoPage.module.scss"
import {ButtonsInfoPage} from "@/components/ServiceJournal/InfoPage/Butttons/ButtonsInfoPage";
import {JournalHeader} from "@/components/ServiceJournal/JournalHeader/JournalHeader";
import React, {useState} from "react";
import {dateComparisonValue, timePassedString} from "@/utils/utils";
import {StatusImg} from "@/components/utils/StatusImg/StatusImg";
import {Button, Flex} from "antd";
import {DownOutlined, UpOutlined} from '@ant-design/icons';

export const InformationPage = () => {
    const longString = useAppSelector((state) => {
        return state.infoService.data
    });
    const timePassed = dateComparisonValue({
        current: new Date() as string, comparable: longString.term
    });
    const [expand, setExpand] = useState(false)
    return (
        <div className={s.infoPageWrapper}>
            <JournalHeader/>
            <div className={s.infoPageSection}>
                <ButtonsInfoPage/>

                <span className={s.infoPageAllSpace}>
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
                    {expand && (
                        <span>
                            <div className={s.fieldName}>Дополнительная информация</div>
                            <div>Услуга - {longString.service}</div>
                            <div>Состав услуги - {longString.serviceComposition}</div>
                        </span>)}
                </span>

                <Flex justify="center">
                    <Button
                        shape="circle"
                        icon={expand ? <UpOutlined /> : <DownOutlined />}
                        size="large"
                        className={s.buttonDown}
                        onClick={() => setExpand(!expand)}
                    />
                </Flex>
                <span className={s.additionally}>
                    Если остались вопросы создайте новое обращение
                </span>
            </div>
        </div>
    )
}