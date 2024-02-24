'use client'

import { useEffect, useState } from "react";

import axios from 'axios';

import ComponentForm from "./form";
import ComponentList from "./list/container";

import { Props_note } from "@/frontend/types/props";

export default function ComponentNotes() {
    const [list_notes, setList_notes] = useState<Props_note[] | []>([]);
    const [selected_note, setSelected_note] = useState<Props_note | undefined>(undefined);
    const [load, setLoad] = useState<boolean>(false);
    const [search, setSearch] = useState<string>("");

    const refresh = () => {
        setLoad(!load);
    }

    useEffect(() => {
        const load_notes = async () => {
            const { data } = await axios.get(`api/notes${(search !== "") ? `/${search}` : ''}`);
            setList_notes((data.status === 200) ? data.info : []);
        }
        load_notes();
    }, [load, search])

    return (
        <section className="flex min-h-full flex-col justify-center mt-[30px] px-5 py-12 sm:px-10  mx-auto max-w-7xl">
            <article className="grid grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8">
                <ComponentForm selected={selected_note} setSelected={setSelected_note} setRefresh={refresh} />
                <ComponentList notes={list_notes} setSelected={setSelected_note} selected={selected_note} setRefresh={refresh} setSearch={setSearch} />
            </article>
        </section>
    )
}