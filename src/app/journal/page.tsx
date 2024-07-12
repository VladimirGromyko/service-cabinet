'use client'
import s from './JournalPage.module.scss'

import {JournalHeader} from "@/components/ServiceJournal/JournalHeader/JournalHeader";
import {Search} from "@/components/ServiceJournal/Search/Search";

import {JournalTable} from "@/components/ServiceJournal/Table/Table";
import {useState} from "react";
import {SearchGroup} from "@/components/ServiceJournal/serviceJournal.types";

export default function Journal() {
    const [searchValue, setSearchValue] = useState<SearchGroup>({field: null, value: ''})
    return (
        <div className={s.journalWrapper}>
            <JournalHeader/>
            <Search handleSearch={(value) => setSearchValue(value)}/>
            <JournalTable searchValue={searchValue}/>
        </div>
    )
}