import { useState } from "react";

import { Component } from "@/frontend/types/component";
import { validateRegex } from "@/frontend/constant/regex";

import ISetValue from "@/frontend/interfaces/elements/form/value";
import useAppTranslation from "@/shared/hooks/translation";

import ComponentIcon from "@/frontend/components/partials/icon";

interface IInputSearch extends Required<ISetValue> {
    design?: boolean,
    value?: string
}

export default function ComponentInputSearch(props: IInputSearch): Component {
    const { setValue, value = '', design = false } = props;

    const { translate } = useAppTranslation();

    const [error, setError] = useState<boolean>(false);

    const validation = (value: string): void => {
        if (value == '') {
            setValue('title', value);
            setError(false);
            return;
        }

        const resolvedRegex: boolean = validateRegex("title", value);
        if (resolvedRegex) {
            setValue('title', value);
        }

        setError(!resolvedRegex);
    }

    return (
        <div className="flex items-center sm:w-auto w-full">
            {
                !design && (
                    <div title={translate('search.nav.icon')} className={`dark:bg-dark-sixth bg-sixth border-[0.1px] ${error ? 'dark:border-dark-error border-error' : 'dark:border-dark-secondary border-secondary'} border-opacity-40 py-[4.5px] px-2 sm:rounded-l-md rounded-l-md`}>
                        <ComponentIcon name="search" descriptionClass={`${error ? 'dark:text-dark-error text-error' : ' dark:text-dark-fifth text-fifth'} mt-[3px]`} size={20} viewBox="0 0 24 24" />
                    </div>
                )
            }
            <input
                type="text"
                id="search"
                value={value}
                placeholder={`${translate('search.nav.input_search')}...`}
                onChange={(event) => validation(event.target.value)}
                className={`${design ? 'border-l-[0.1px] rounded-l-md' : 'sm:w-auto border-l-none'} w-full dark:bg-dark-sixth bg-sixth border-y-[0.1px] border-r-[0.1px] ${error ? 'dark:text-dark-error text-error dark:border-dark-error border-error' : 'dark:text-dark-fifth text-fifth dark:border-dark-secondary border-secondary'} border-opacity-40 rounded-r-md outline-none px-2 py-1 dark:placeholder:opacity-100 placeholder:opacity-60 placeholdel:text-sm`}
            />
        </div>
    )
}