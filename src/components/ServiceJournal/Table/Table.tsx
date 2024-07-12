import React, {useEffect, useState} from 'react';
import type {GetProp, TableProps,} from 'antd';
import {Table} from 'antd';
import ExclamationCircleOutlined from '@ant-design/icons/ExclamationCircleOutlined';
import type {SorterResult} from 'antd/es/table/interface';
import type {TableData} from "@/components/ServiceJournal/serviceJournal.types";
import {dateComparison} from "@/utils/utils";
import s from "@/components/ServiceJournal/Table/Table.module.scss";
import {SearchGroup} from "@/components/ServiceJournal/serviceJournal.types";
import {searchField} from "@/components/ServiceJournal/constants";

type ColumnsType<T> = TableProps<T>['columns'];
type TablePaginationConfig = Exclude<GetProp<TableProps, 'pagination'>, boolean>;

type OnChange = NonNullable<TableProps<TableData>['onChange']>;
type GetSingle<T> = T extends (infer U)[] ? U : never;
type Sorts = GetSingle<Parameters<OnChange>[2]>;
type Filters = Parameters<OnChange>[1];

type Props = {
    searchValue: SearchGroup
}

interface TableParams {
    pagination?: TablePaginationConfig;
    sortField?: SorterResult<any>['field'];
    sortOrder?: SorterResult<any>['order'];
    filters?: Parameters<GetProp<TableProps, 'onChange'>>[1];
}

const data: TableData[] = [{
    key: "1",
    name: "gavrilov",
    theme: "Электронная почта",
    number: "95708",
    creationDate: "20.05.2024 15:22",
    changeDate: "20.05.2024 17:22",
    term: "21.05.2024 15:22",
    status: "В работе",
    waiting: "Нет",
    description: "Прошу сделать переадресацию на время отпуска",
    solution: "",
    service: "Интернет",
    serviceComposition: "Почта"
},
    {
        key: "2",
        name: "gavrilov",
        theme: "Установка платформы",
        number: "95802",
        creationDate: "22.05.2024 11:03",
        changeDate: "22.05.2024 11:03",
        term: "23.05.2024 11:03",
        status: "Зарегистрировано",
        waiting: "Нет",
        description: "Прошу установить платформу 8.3.24",
        solution: "",
        service: "Поддержка рабочих мест",
        serviceComposition: "Настройка ПО"
    },
    {
        key: "3",
        name: "gavrilov",
        theme: "Подключение к сети",
        number: "95803",
        creationDate: "24.05.2024 9:41",
        changeDate: "24.05.2024 11:41",
        term: "25.05.2024 9:41",
        status: "На согласовании",
        waiting: "Нет",
        description: "Нужен доступ к serversoft",
        solution: "",
        service: "Интернет",
        serviceComposition: "Доступ"
    },
    {
        key: "4",
        name: "gavrilov",
        theme: "Установка ПО на ПК",
        number: "95804",
        creationDate: "24.05.2024 12:30",
        changeDate: "24.05.2024 12:30",
        term: "25.05.2024 12:30",
        status: "Выполнено. Требует подтверждения",
        waiting: "Да",
        description: "Для нового сотрудника нужна IDE",
        solution: "Софт установлен",
        service: "Поддержка рабочих мест",
        serviceComposition: "Настройка ПО"
    },
    {
        key: "5",
        name: "gavrilov",
        theme: "Проблема с сетью",
        number: "95901",
        creationDate: "25.05.2024 10:07",
        changeDate: "26.05.2024 9:00",
        term: "26.05.2024 10:07",
        status: "Зарегистрировано",
        waiting: "Нет",
        description: "Не заходит на внешние сайты при включенном впн",
        solution: "",
        service: "Интернет",
        serviceComposition: "Доступ"
    },
    {
        key: "6",
        name: "gavrilov",
        theme: "Установка проектора",
        number: "95902",
        creationDate: "27.05.2024 14:11",
        changeDate: "27.05.2024 14:11",
        term: "28.05.2024 14:11",
        status: "Закрыто",
        waiting: "Нет",
        description: "В ауд. 312. Проектор установлен",
        solution: "",
        service: "Поддержка рабочих мест",
        serviceComposition: "Настройка оборудования"
    },
    {
        key: "7",
        name: "gavrilov",
        theme: "Активация Office",
        number: "95903",
        creationDate: "29.05.2024 13:15",
        changeDate: "29.05.2024 13:15",
        term: "30.05.2024 13:15",
        status: "На согласовании",
        waiting: "Да",
        description: "Требуется офис на выездном ноутбуке",
        solution: "Активирован 2016",
        service: "Поддержка рабочих мест",
        serviceComposition: "Настройка ПО"
    },
]

export const JournalTable: React.FC = ({searchValue}: Props) => {
    const [newData, setNewData] = useState<TableData[]>(data);
    const [loading, setLoading] = useState(false);
    const [tableParams, setTableParams] = useState<TableParams>(
        {
            pagination: {
                current: 1,
                pageSize: 10,
            }
        });
    const [sortedInfo, setSortedInfo] = useState<Sorts>({} as Sorts);
    const [filter, setFilter] = useState<SearchGroup>({field: null, value: ""});

    const handleTableChange: TableProps['onChange'] = (pagination, filters, sorter) => {
        setSortedInfo(sorter as Sorts);
    };
    const handleRowClick = (e, f) => {
    }


    const columns: ColumnsType<TableData>[] = [
        {
            title: "Тема",
            dataIndex: "theme",
            render: (name, record: TableData) => {
                return (
                    <div onClick={(e) => handleRowClick(e, record)}>
                        <a>{record.theme}</a>
                        {record.description === "Да" && <ExclamationCircleOutlined className={s.exclamation}/>}
                    </div>
                )
            },
            sorter: (a, b) => {
                const ruCollator = new Intl.Collator('ru-RU');
                return ruCollator.compare(a.theme, b.theme)
            },
            sortOrder: sortedInfo?.field === 'theme' ? sortedInfo.order : null,
            width: '15%',
        },
        {
            title: "Номер",
            dataIndex: "number",
            // filters: [
            //     { text: 'London', value: 'London' },
            //     { text: 'New York', value: 'New York' },
            // ],

            sorter: (a, b) => {
                return a.number - b.number
            },
            sortOrder: sortedInfo?.field === 'number' ? sortedInfo.order : null,
            width: '10%',
        },
        {
            title: "Дата создания",
            dataIndex: "creationDate",
            sorter: (a, b) => dateComparison({current: a.creationDate, next: b.creationDate}),
            sortOrder: sortedInfo?.field === 'creationDate' ? sortedInfo.order : null,
            width: '15%',
        },
        {
            title: "Дата изменения",
            dataIndex: "changeDate",
            sorter: (a, b) => dateComparison({current: a.changeDate, next: b.changeDate}),
            sortOrder: sortedInfo?.field === 'changeDate' ? sortedInfo.order : null,
            width: '15%',
        },
        {
            title: "Крайний срок",
            dataIndex: "term",
            sorter: (a, b) => dateComparison({current: a.term, next: b.term}),
            sortOrder: sortedInfo?.field === 'term' ? sortedInfo.order : null,
            width: '15%',
        },
        {
            title: "Статус",
            dataIndex: "status",
            sorter: (a, b) => {
                const ruCollator = new Intl.Collator('ru-RU');
                return ruCollator.compare(a.status, b.status)
            },
            sortOrder: sortedInfo?.field === 'status' ? sortedInfo.order : null,
            width: '20%',
        },
    ];
    const handleFilter = (search: SearchGroup) => {
        if (filter.field === search.field && filter.value === search.value) {
            return
        }
        let updateData: TableData[] = data.map((el) => ({...el}))
        const filterCondition = !search.field && !search.value || search.field === searchField.ALL
        if (!filterCondition) {
            updateData = updateData.filter((el) => {
                let check = false
                const userFieldKeys: string[] = columns.map(el => el.dataIndex)
                userFieldKeys.push("waiting")
                for (let i = 0; i < userFieldKeys.length; i++) {
                    const item = userFieldKeys[i]
                    if (search.field === searchField.OPEN && item === "status" && el[item] !== "Закрыто") {
                        check = true
                    } else if (search.field === searchField.CLOSE && item === "status" && el[item] === "Закрыто") {
                        check = true
                    } else if (search.field === searchField.AWAIT && item === "waiting" && el[item] === "Да") {
                        check = true
                    } else if (!search.field && item !== "key") {
                        check = el[item].includes(search.value)
                    }
                    if (check) {
                        break
                    }
                }
                return check
            })
        }
        setFilter(search)
        setNewData(updateData)
    }
    useEffect(() => handleFilter(searchValue), [searchValue])
    return (
        <Table
            columns={columns}
            dataSource={newData}
            onChange={handleTableChange}
        />
    );
};
