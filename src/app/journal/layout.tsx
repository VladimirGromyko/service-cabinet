import React from "react";
import {JournalHeader} from "@/components/ServiceJournal/JournalHeader/JournalHeader";

export default function Layout(
    {
        children,
    }:
        {
            children: React.ReactNode
        }) {
    return <section>
        {children}
    </section>
}