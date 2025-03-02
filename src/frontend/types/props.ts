export type PropsItemsSelect = {
    value: string,
    icon: {
        name: string,
        class: string
    }
}

export type PropsItemsDashboard = {
    url: string,
    icon: string,
    nameTranslate: string
}

export type PropsLoadingNotes = {
    value: boolean,
    icon?: string,
    description?: string,
    button?: boolean
}