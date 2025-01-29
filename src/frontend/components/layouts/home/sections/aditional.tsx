import { Component } from "@/frontend/types/component";
import { APP_ROUTES } from "@/frontend/constant/app_rutes";

import ComponentIcon from "@/frontend/components/partials/icon";
import ComponentLink from "@/frontend/components/partials/link";
import ComponentMotion from "@/frontend/components/partials/motion";

export default function ComponentAditionalHome(): Component {
    return (
        <ComponentMotion type="section" descriptionClass="mt-16 flex flex-col items-center">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-wide text-center text-gradient">
                ¿Estás listo para comenzar?
            </h2>
            <p className="mt-3 text-md sm:text-lg text-center opacity-80 text-tertiary dark:text-dark-tertiary">
                Da el primer paso hacia una experiencia inigualable.
            </p>
            <ComponentLink url={APP_ROUTES.dashboard.main} title="Empezar" descriptionClass="bg-custom-gradient group mt-6 flex items-center gap-x-2 rounded-md bg-secondary dark:bg-dark-secondary text-primary dark:text-dark-primary px-6 py-3 text-lg font-semibold text-black shadow-lg hover:shadow-2xl hover:scale-105 transition-transform duration-500">
                <ComponentIcon name="box" size={20} descriptionClass="text-primary dark:text-dark-primary group-hover:rotate-[360deg] transition-transform duration-700" />
                <span>
                    Comienza Ahora
                </span>
            </ComponentLink>
        </ComponentMotion>
    )
}