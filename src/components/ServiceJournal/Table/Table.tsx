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
import {data} from "@/components/ServiceJournal/tableData";
import {useRouter} from "next/navigation";
import {useAppDispatch} from "@/store/hooks";
import {setServiceInfo} from "@/store/slice";

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


export const JournalTable: React.FC = ({searchValue}: Props) => {
    const dispatch = useAppDispatch();

    const router = useRouter()
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
    const handleRowClick = (e, rec: TableData) => {
        dispatch(setServiceInfo(rec))
        router.push(`/journal/${rec.number}`)
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
