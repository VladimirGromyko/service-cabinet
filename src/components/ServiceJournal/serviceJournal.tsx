import s from "@/components/ServiceJournal/ServiceJournal.module.scss";
import {Search} from "@/components/ServiceJournal/Search/Search";
import {JournalTable} from "@/components/ServiceJournal/Table/Table";
import React, {useState} from "react";
import {SearchGroup} from "@/components/ServiceJournal/serviceJournal.types";
import {JournalHeader} from "@/components/ServiceJournal/JournalHeader/JournalHeader";


export default function ServiceJournal() {
    const [searchValue, setSearchValue] = useState<SearchGroup>({field: null, value: ''})
    return (
        <div className={s.journalWrapper}>
            <JournalHeader/>
            <Search handleSearch={(value) => setSearchValue(value)}/>
            <JournalTable searchValue={searchValue}/>
        </div>
    )
}