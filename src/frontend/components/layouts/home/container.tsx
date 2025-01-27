'use client'

import { useEffect, useState } from 'react';
import Confetti from 'react-confetti'

import { Component } from "@/frontend/types/component";
import { APP_ROUTES } from "@/frontend/constant/app_rutes";

import IContext from "@/context/interfaces/context";
import useAppContext from "@/context/hooks/context";

import ComponentIcon from "@/frontend/components/partials/icon";
import ComponentLink from "@/frontend/components/partials/link";
import ComponentLoadingHome from '@/frontend/components/layouts/home/loading';

export default function ComponentHome(): Component {
    const { session, opacity }: IContext = useAppContext();

    const [confetti, setConfetti] = useState<boolean>(false);

    useEffect(() => {
        if (session.isSignedIn && session.value.user && session.value.user?.lastSignInAt == null) {
            setConfetti(true);
            const viewConfetti: NodeJS.Timeout = setTimeout(() => {
                setConfetti(false);
            }, 9000);
            return () => clearTimeout(viewConfetti);
        }
    }, [session.value.user?.lastSignInAt]);

    if (!session.value.user) return <ComponentLoadingHome />

    return (
        <article className={`${opacity && 'opacity-40'} flex flex-col min-h-screen justify-between relative w-full  px-6 lg:px-8 pb-5`}>
            {
                confetti && <Confetti width={1100} height={1100} className="w-full h-full" numberOfPieces={600} />
            }
            <article className="mt-[130px] flex flex-col items-center gap-y-9">
                <ComponentIcon testid="icon-home" name="logo" size={70} descriptionClass="dark:text-dark-secondary text-secondary" />
                <div className="flex flex-col sm:gap-y-2">
                    <h1 className="text-center font-bold tracking-wider dark:text-dark-tertiary text-tertiary text-2xl sm:text-6xl">
                        {`Bienvenido, ${session.value.user.name.split(' ')[0]}!`}
                    </h1>
                    <p className="text-center text-sm sm:text-lg leading-8 dark:text-dark-tertiary text-tertiary dark:opacity-100 opacity-60 tracking-wider">
                        ¡Es un placer tenerte con nosotros!
                    </p>
                </div>
                <div className="mt-3 flex items-center justify-center gap-x-6">
                    <ComponentLink url={APP_ROUTES.dashboard.main} title="Empezar" descriptionClass="group flex items-center gap-x-2 rounded-md border-[1px] dark:border-dark-secondary border-secondary dark:hover:bg-dark-secondary hover:bg-secondary px-3.5 py-2.5 transition duration-700 cursor-pointer">
                        <ComponentIcon name="box" size={16} descriptionClass="group-hover:rotate-[360deg] group-hover:text-primary dark:group-hover:text-dark-primary dark:text-dark-secondary text-secondary duration-700" />
                        <span className="dark:group-hover:text-dark-primary group-hover:text-primary dark:text-dark-secondary text-secondary text-sm group-hover:font-semibold tracking-wider duration-300">
                            Comienza a explorar
                        </span>
                    </ComponentLink>
                </div>
            </article>
        </article>
    )
}