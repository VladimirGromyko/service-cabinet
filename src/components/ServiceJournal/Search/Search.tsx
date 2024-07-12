import s from "@/components/ServiceJournal/Search/Search.module.scss";
import React, {useState} from "react";
import { Input, ConfigProvider, Space, Button, Flex } from 'antd';
import SearchOutlined from '@ant-design/icons/SearchOutlined';
import CloseOutlined from '@ant-design/icons/CloseOutlined';
import type { SearchFieldType, SearchGroup } from "@/components/ServiceJournal/serviceJournal.types";
import { searchField } from "@/components/ServiceJournal/constants";

type Props = {
    handleSearch: ({}:SearchGroup) => void
}
const initButton = {
    all: "",
    open: "",
    close: "",
    await: ""
}
const currentButtonSize = {width: 130, height: 37}
export const Search = ({handleSearch}: Props) => {
    const [searchValue, setSearchValue] = useState('')
    const [searchButton, setSearchButton] = useState({...initButton, all: "primary"})
    const changeValue = (e) => {
        setSearchValue(e.currentTarget.value)
    }
    const handleInput = (field?: SearchFieldType) => {
        let value
        if (field) {
            value = { field, value: ""}
            setSearchButton({...initButton, [field]: "primary"})
            setSearchValue('')
        } else {
            value = { field: null, value: searchValue.trim()}
            setSearchButton({...initButton, all: "primary"})
        }
        handleSearch(value)
    }
    const handleClear = () => {
        if (searchValue) {
            setSearchValue('')
        }
        searchButton.all === "primary" && handleSearch({field: null, value: ""})
    }
    return (
        <div className={s.searchWrapper}>
            <ConfigProvider
                theme={{
                    components: {
                        Input: {
                            colorPrimary: '#1677ff',
                            activeShadow: '0 0 0 6px rgba(5, 145, 255, 0.1)',
                            activeBorderColor: "#1677ff"
                        },
                        Button: {
                            contentFontSize: 16,
                            paddingBlock: 6
                        },
                    },
                }}
            >
                <Flex justify={"space-between"}>
                    <Space>
                        <Input
                            value={searchValue}
                            prefix={<SearchOutlined onClick={()=> handleInput()} style={{ padding: '0 5px' }}/>}
                            suffix={<CloseOutlined onClick={handleClear} style={{ padding: '0 5px' }}/>}
                            placeholder="Введите текст для поиска"
                            onChange={changeValue}
                            onPressEnter={()=> handleInput()}
                            className={s.input}
                        />

                    </Space>
                    <Space>
                        <Flex gap="large" justify={'space-around'}>
                            <Button type={searchButton.all} shape={'round'}
                                    style={currentButtonSize}
                                    onClick={() => handleInput(searchField.ALL)}
                            >
                                Все
                            </Button>
                            <Button type={searchButton.open} shape={'round'}
                                    style={currentButtonSize}
                                    onClick={() => handleInput(searchField.OPEN)}
                            >
                                Открытые
                            </Button>
                            <Button type={searchButton.close} shape={'round'}
                                    style={currentButtonSize}
                                    onClick={() => handleInput(searchField.CLOSE)}
                            >
                                Закрытые
                            </Button>
                            <Button type={searchButton.await} shape={'round'}
                                    style={currentButtonSize}
                                    onClick={() => handleInput(searchField.AWAIT)}
                            >
                                Ожидают ответа
                            </Button>
                        </Flex>
                    </Space>
                </Flex>
            </ConfigProvider>
        </div>
    )
}