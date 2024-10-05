import Link from "next/link";

import ComponentIcon from "@/frontend/components/partials/icon";

type Props = {
    response?: boolean
}

export default function ComponentButtonCreate(props: Props) {
    const { response = true } = props;

    return (
        <Link href="/notes" title="Crear nota" className={`group relative flex items-center justify-between gap-x-1 rounded-md text-primary ${response ? 'sm:border-[0.1px] sm:dark:border-dark-secondary sm:border-secondary sm:border-opacity-80 sm:px-1.5 dark:bg-dark-primary bg-primary sm:dark:bg-dark-secondary sm:bg-secondary' : 'border-[0.1px] dark:border-dark-secondary border-secondary border-opacity-80 px-1 dark:bg-dark-secondary bg-secondary'} py-[2px] text-md font-normal hover:font-semibold tracking-wider dark:hover:bg-dark-primary hover:bg-primary dark:hover:text-dark-secondary hover:text-secondary outline-none`}>
            <ComponentIcon name='add' size={20} description_class={`dark:group-hover:text-dark-secondary group-hover:text-secondary ${response ? 'dark:text-dark-fifth text-fifth sm:dark:text-dark-primary sm:text-primary' : 'dark:text-dark:primary text-primary'} cursor-pointer`} />
            <span className={`${response && 'sm:flex hidden'} dark:text-dark-primary text-primary dark:group-hover:text-dark-secondary group-hover:text-secondary w-full text-sm transition duration-500 font-semibold`}>
                Crear nota
            </span>
        </Link>
    )
}