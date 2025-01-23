'use client'

import { useEffect, useState } from "react"

import { Component } from "@/frontend/types/component";

import { PropsNote } from "@/context/types/note";
import { PropsSession } from "@/context/types/session";

import { httpRequest } from "@/backend/logic/requests";

import ComponentHeader from "@/frontend/components/layouts/private/header";
import ComponentListNotes from "@/frontend/components/layouts/private/notes/container";
import ComponentListSessions from "@/frontend/components/layouts/private/sessions/container";

export default function ComponentSessions(): Component {
    const [sessions, setSessions] = useState<PropsSession[] | []>([]);
    const [notes, setNotes] = useState<PropsNote[] | []>([]);

    const [userSelected, setUserSelected] = useState<PropsSession>();

    const loadNotes = async (session: PropsSession): Promise<void> => {
        setNotes([]);
        setUserSelected(session);

        const { data } = await httpRequest({ type: 'GET', url: `/api/private/notes/${session.id}` });

        if (data.status === 200) {
            setNotes(data.data);
        }
    }

    const loadSessions = async (): Promise<void> => {
        const { data } = await httpRequest({ type: 'GET', url: '/api/private/sessions' });

        if (data.status === 200) {
            setSessions(data.data);
        }
    }

    useEffect(() => {
        loadSessions();
    }, []);

    return (
        <article className="flex flex-col gap-5 2xl:px-0 xl:px-1 sm:pl-3 mt-[40px] pt-7 pb-10 min-h-screen">
            <ComponentHeader countSessions={sessions.length} userSelected={userSelected} setUserSelected={setUserSelected} />
            {
                (userSelected) ?
                    <ComponentListNotes notes={notes} userSelected={userSelected} />
                    :
                    <ComponentListSessions sessions={sessions} loadNotes={loadNotes} />
            }
        </article>
    )
}