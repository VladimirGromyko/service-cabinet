import {searchField} from "@/components/ServiceJournal/constants";
import React from "react";
import {Button, Flex, Space} from "antd";
import s from "@/components/ServiceJournal/InfoPage/infoPage.module.scss";
import {useRouter} from "next/navigation";

export const ButtonsInfoPage = () => {
    const router = useRouter()
    return (
        <div className={s.buttonsWrapper}>
            <Flex justify={"space-between"}>
                <Space>
                    <Button
                        shape={'round'}
                        // type={searchButton.all} shape={'round'}
                        //     style={currentButtonSize}
                        onClick={() => router.push("/journal")}
                    >
                        Назад
                    </Button>
                </Space>
                <Space>
                    <Flex gap="large" justify={'space-around'}>
                        <Button
                            shape={'round'}
                            // type={searchButton.all} shape={'round'}
                            //     style={currentButtonSize}
                            //     onClick={() => handleInput(searchField.ALL)}
                        >
                            Все
                        </Button>
                        <Button
                            shape={'round'}
                            // type={searchButton.open} shape={'round'}
                            //     style={currentButtonSize}
                            //     onClick={() => handleInput(searchField.OPEN)}
                        >
                            Открытые
                        </Button>
                        <Button
                            shape={'round'}
                            // type={searchButton.close} shape={'round'}
                            //     style={currentButtonSize}
                            //     onClick={() => handleInput(searchField.CLOSE)}
                        >
                            Закрытые
                        </Button>
                        <Button
                            shape={'round'}
                            // type={searchButton.await} shape={'round'}
                            //     style={currentButtonSize}
                            //     onClick={() => handleInput(searchField.AWAIT)}
                        >
                            Ожидают ответа
                        </Button>
                    </Flex>
                </Space>
            </Flex>

        </div>
    )
}