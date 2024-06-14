import { useEffect, useState } from "react";

import axios from 'axios';

import ComponentList from "@/frontend/components/layouts/notes/list/container";
import ComponentContainerForm from "@/frontend/components/layouts/notes/container_form";
import ComponentMessageConfirmation from "@/frontend/components/layouts/messages/confirmation";

import { Props_note } from "@/context/types/note";
import { Props_session } from "@/context/types/session";
import { Props_response } from "@/context/types/response";

type Props = {
    session: Props_session
}

export default function ComponentNotes(props: Props) {
    const { session } = props;

    const [load, setLoad] = useState<boolean>(false);
    const [search, setSearch] = useState<string>("");
    const [list_notes, setList_notes] = useState<Props_note[]>([]);
    const [selected_note, setSelected_note] = useState<Props_note | undefined>(undefined);

    const [open, setOpen] = useState<boolean>(false);
    const [response, setResponse] = useState<Props_response>();

    const refresh = (): void => {
        setLoad(!load);
    }

    useEffect(() => {
        const load_notes = async () => {
            const { data } = await axios.get(`/api/notes${(search !== "{}") ? `/${search}` : ''}`);
            if (data.status === 200) {
                setList_notes(data.data);
            }
            if (data.status === 500) {
                setOpen(true);
                setResponse(data);
                setList_notes([]);
            }
        }

        if (session.id) {
            load_notes();
        }

    }, [load, search, session.user])

    return (
        <section className="flex flex-col justify-center mt-4 pt-12 pb-5">
            <article className="grid grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8">
                <ComponentContainerForm selected={selected_note} setSelected={setSelected_note} setRefresh={refresh} />
                <ComponentList notes={list_notes} setSelected={setSelected_note} selected={selected_note} setRefresh={refresh} setSearch={setSearch} />
            </article>
            {
                (response) && <ComponentMessageConfirmation open={open} setOpen={setOpen} response={response} />
            }
        </section>
    )
}