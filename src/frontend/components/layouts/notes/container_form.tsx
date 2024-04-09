'use client'

import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import axios from 'axios';

import ComponentIcon from '@/frontend/components/partials/icon';
import ComponentInput from '@/frontend/components/partials/form/input';
import ComponentLabel from '@/frontend/components/partials/form/label';
import ComponentSelect from '@/frontend/components/partials/form/select';
import ComponentItemPriority from '@/frontend/components/partials/form/item_priority';
import ComponentItemFeatured from '@/frontend/components/partials/form/item_featured';
import ComponentMessageWait from '@/frontend/components/layouts/messages/wait';
import ComponentMessageConfirmation from '@/frontend/components/layouts/messages/confirmation';

import { Props_note } from '@/context/types/note';
import { Props_response } from '@/context/types/response';

import { validation } from '@/frontend/validations/form';
import { Props_category } from '@/context/types/category';

type Props = {
    setSelected: Dispatch<SetStateAction<Props_note | undefined>>,
    selected: Props_note | undefined,
    setRefresh: () => void
}

export default function ComponentContainerForm({ setSelected, selected, setRefresh }: Props) {
    const [open, setOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [response, setResponse] = useState<Props_response>();

    const [file, setFile] = useState<File | undefined>(undefined);
    const [select_category, setSelect_category] = useState<string>('Seleccionar categoria...');
    const [list_categorys, setList_Categorys] = useState<Props_category[]>([]);

    const { register, handleSubmit, formState: { errors }, setValue, reset, watch, clearErrors } = useForm();

    const restart = (): void => {
        setRefresh();
        reset();
        setSelected(undefined);
        setFile(undefined);
        setSelect_category('Seleccionar categoria...');
    }

    const open_modal = (data: Props_response): void => {
        restart();
        setOpen(true);
        setResponse(data);
    }

    const onSubmit: SubmitHandler<FieldValues | Props_note> = async (data) => {
        let response;

        const form = new FormData();
        form.set('title', data.title);
        form.set('description', data.description);
        form.set('priority', data.priority);
        form.set('featured', data.featured);
        form.set('category', data.category);

        if (file !== undefined) {
            form.set('file', file as File);
        }

        setLoading(true);
        if (!selected) {
            response = await axios.post("api/notes", form);
        } else {
            form.set('_id', selected._id as string);
            response = await axios.put("api/notes", form);
        }
        setLoading(false);
        open_modal(response.data);
    }

    useEffect(() => {
        const load_categorys = async () => {
            const { data } = await axios.get("api/categorys/true");

            if (data.status === 200) {
                setList_Categorys(data.data);
            }
            if (data.status === 500) {
                open_modal(data)
            }
        }
        load_categorys();
    }, []);

    useEffect(() => {
        reset();
        setValue('title', selected?.title);
        setValue('description', selected?.description);
        setValue('priority', selected?.priority);
        setValue('featured', selected?.featured ? 'SI' : 'NO');
        setValue('category', selected?.category);

        if (selected?.category) {
            setSelect_category(selected.category);
        }

    }, [selected])

    return (
        <div className="col-span-full lg:col-span-1 flex flex-col gap-y-1">
            <div className="flex justify-center">
                <span title="Titulo formulario" className="text-2xl text-secondary font-semibold text-center">
                    {(!selected) ? 'Crear nota' : 'Actualizar nota'}
                </span>
            </div>
            <form method="POST" onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-6">
                <div className="flex flex-col gap-y-3">
                    <div className="flex flex-col gap-y-0.5">
                        <ComponentLabel title="Titulo" html_for="title" validation={validation('title')} error={errors.title?.type} />
                        <ComponentInput
                            type="text"
                            name="title"
                            placeholder="Escriba el titulo..."
                            register={register}
                            error={errors.title?.type}
                            description_class="border-opacity-50 bg-primary w-full rounded-md border-[0.1px] py-1 px-2 outline-none tracking-wide placeholder:opacity-70 sm:text-md"
                        />
                    </div>
                    <div className="flex flex-col gap-y-0.5">
                        <ComponentLabel title="Descripcion" html_for="description" validation={validation('description')} error={errors.description?.type} />
                        <ComponentInput
                            rows={3}
                            name="description"
                            placeholder="Escriba la descripcion..."
                            register={register}
                            error={errors.description?.type}
                            description_class="border-opacity-50 bg-primary w-full rounded-md border-[0.1px] min-h-[65px] scroll-text py-1 px-2 outline-none tracking-wide placeholder:opacity-70 sm:text-md"
                        />
                    </div>
                    <ComponentSelect
                        categorys={list_categorys}
                        error={errors.category?.type}
                        select_category={select_category}
                        setSelect_category={setSelect_category}
                        register={register}
                    />
                    <div className="flex flex-col gap-y-0.5">
                        <ComponentLabel title="Prioridad" html_for="priority" error={errors.priority?.type} />
                        <div className="grid grid-cols-3 gap-x-1">
                            <ComponentItemPriority
                                id="option_1"
                                value='Alta'
                                class_icon="text-red-500 rotate-[-180deg]"
                                paint={watch('priority') === "Alta"}
                                error={errors.priority?.type}
                                register={register}
                            />
                            <ComponentItemPriority
                                id="option_2"
                                value='Media'
                                class_icon="text-orange-500 rotate-[-180deg]"
                                paint={watch('priority') === "Media"}
                                error={errors.priority?.type}
                                register={register}
                            />
                            <ComponentItemPriority
                                id="option_3"
                                value='Baja'
                                class_icon="text-green-500"
                                paint={watch('priority') === "Baja"}
                                error={errors.priority?.type}
                                register={register}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 items-center my-1">
                        <ComponentLabel title="¿Destacar nota?" html_for="featured" validation={validation('featured')} error={errors.featured?.type} />
                        <div className='flex w-full gap-x-2'>
                            <ComponentItemFeatured
                                value='SI'
                                paint={watch('featured') === 'SI'}
                                error={errors.featured?.type}
                                register={register}
                            />
                            <ComponentItemFeatured
                                value='NO'
                                paint={watch('featured') === 'NO'}
                                error={errors.featured?.type}
                                register={register}
                            />
                        </div>
                    </div>
                    <label htmlFor="file-upload" className="grid gap-y-0.5 place-items-center mt-0.5 p-1.5 cursor-pointer border-secondary border-opacity-50 bg-primary w-full rounded-md border-[0.1px]">
                        <ComponentIcon name={`upload-file${(selected?.file?.id) ? '-selected' : (file === undefined) ? '' : '-selected'}`} size={27} description_class="icon-home text-secondary cursor-pointer" />
                        <span className='line-clamp-1 text-secondary text-md font-normal tracking-wide'>
                            {
                                (file) ? `${file.name} seleccionado` :
                                    (selected?.file?.id) ? `${selected.file.name} cargado` : "Subir archivo..."
                            }
                        </span>
                        <input id="file-upload" name="file-upload" type="file" onChange={(e) => setFile(e.target.files?.[0])} className="sr-only" />
                    </label>
                </div>
                <div className="flex gap-x-10">
                    <button type="submit" title={(!selected) ? 'Crear' : 'Actualizar'} name={(!selected) ? 'Crear' : 'Actualizar'} className="flex w-full justify-center rounded-md text-secondary border-[0.1px] border-secondary border-opacity-80 px-3 py-1 text-md font-normal hover:font-semibold bg-primary tracking-wider hover:bg-sixth outline-none">
                        {(!selected) ? 'Crear' : 'Actualizar'}
                    </button>
                    <button onClick={() => restart()} type="button" name="Deshacer" title="Reiniciar" className="flex w-full justify-center rounded-md text-error border-[0.1px] border-error border-opacity-80 px-3 py-1 text-md font-normal hover:font-semibold bg-primary tracking-wider hover:bg-sixth outline-none">
                        Deshacer
                    </button>
                </div>
            </form>
            {
                (response) && <ComponentMessageConfirmation open={open} setOpen={setOpen} response={response} />
            }
            {
                (loading) && <ComponentMessageWait open={loading} setOpen={setLoading} />
            }
        </div >
    )
}