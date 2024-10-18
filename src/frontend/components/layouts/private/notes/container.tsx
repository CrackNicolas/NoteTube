import Image from "next/image";

import ComponentIcon from "@/frontend/components/partials/icon";
import ComponentLoading from "@/frontend/components/layouts/notes/list/loading";

import { Props_note } from "@/context/types/note";
import { Props_session } from "@/context/types/session";

import { Time_elapsed } from "@/frontend/logic/format_time";

type Props = {
    notes: Props_note[],
    user_selected: Props_session
}

export default function ComponentList(props: Props) {
    const { notes, user_selected } = props;

    return (
        <article className="grid grid-cols-1 lg:grid-cols-2 place-items-center gap-4 pb-5">
            {
                (notes.length === 0) ?
                    <ComponentLoading count={10} />
                    :
                    notes.map(note => {
                        return (
                            <div key={note._id} title="Nota" className={`relative transition-padding group grid grid-cols-9 w-full dark:bg-dark-sixth bg-sixth sm:px-2.5 px-2 sm:py-2 py-1.5 cursor-pointer rounded-md border-[0.1px] dark:border-dark-secondary border-secondary border-opacity-20 hover:border-opacity-100`}>
                                <div className="col-span-8 flex flex-col">
                                    <span className="flex">
                                        <span className="line-clamp-1 text-md font-normal group-hover:font-semibold tracking-wide dark:text-dark-secondary text-secondary">
                                            {note.title}
                                        </span>
                                        {(note.priority === "Alta") && <ComponentIcon name="arrow" size={15} description_class="sm:relative absolute sm:right-auto right-3 cursor-pointer text-red-500 rotate-[-180deg] mt-[3px] " />}
                                        {(note.priority === "Media") && <ComponentIcon name="arrow" size={15} description_class="sm:relative absolute sm:right-auto right-3 cursor-pointer text-yellow-500 rotate-[-180deg] mt-[3px] " />}
                                        {(note.priority === "Baja") && <ComponentIcon name="arrow" size={15} description_class="sm:relative absolute sm:right-auto right-3 cursor-pointer text-green-500 mt-[2.7px] " />}
                                    </span>
                                    <p className="line-clamp-1 text-sm dark:text-dark-tertiary dark:opacity-90 text-tertiary opacity-50">
                                        {note.description}
                                    </p>
                                    <span title="Tiempo transcurrido" className="sm:visible invisible absolute right-3 dark:text-dark-tertiary dark:opacity-90 text-tertiary text-[11px] opacity-50">
                                        {Time_elapsed(note.createdAt)}
                                    </span>
                                </div>
                                <div className="col-span-1 flex flex-col items-end justify-end">
                                    <Image src={(user_selected.user) ? user_selected.user.image : 'https://cdn.icon-icons.com/icons2/1381/PNG/512/systemusers_94754.png'} alt="Imagen de usuario" width={24} height={20} className="rounded-full mt-1" />
                                </div>
                            </div >
                        )
                    })
            }
        </article>
    )
}