import '@testing-library/jest-dom'
import { fireEvent, render, waitFor } from '@testing-library/react'

import ResizeObserver from 'resize-observer-polyfill';
global.ResizeObserver = ResizeObserver;

import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

import ComponentList from "@/frontend/components/layouts/category/list/container"
import ComponentHeader from "@/frontend/components/partials/template/dashboard/header"

import { categorys } from '../../mocks/categorys'

const mock = new MockAdapter(axios);

mock.onPut('/api/categorys').reply(200, {
    status: 200,
    info: {
        message: 'Categoria modificada'
    }
});

describe('Componente <Category/>', () => {

    test('Renderizacion correcta en el Header', () => {
        const { getByText } = render(<ComponentHeader title="Categorias de notas" subtitle="Selecciona las categorias que deseas agregar o quitar de tus notas" />)

        const title = getByText("Categorias de notas");
        const subtitle = getByText("Selecciona las categorias que deseas agregar o quitar de tus notas");

        expect(title).toBeInTheDocument();
        expect(subtitle).toBeInTheDocument();
    });

    test('Renderizacion correcta loading Items', () => {
        const setRestart = jest.fn();
        const { getAllByTitle } = render(<ComponentList categorys={[]} setRestart={setRestart} />);

        const items_loading = getAllByTitle('Cargando...');

        items_loading.map(item => {
            expect(item).toBeInTheDocument();
        })
    });

    describe('Renderizacion correcta en la <List/>', () => {
        const setRestart = jest.fn();

        test('Renderizacion seleccionando una categoria y confirmacion exitosa', async () => {
            const { getByTitle, getByRole } = render(<ComponentList categorys={categorys} setRestart={setRestart} />);

            await waitFor(() => {
                const item = getByTitle(`Categoria ${categorys[0].title}`);
                fireEvent.click(item);
            })

            await waitFor(() => {
                const modal_confirmation = getByTitle('modal');
                const button_confirmation = getByRole('button', { name: 'Aceptar' });

                expect(modal_confirmation).toBeInTheDocument();

                fireEvent.click(button_confirmation);

                expect(modal_confirmation).not.toBeInTheDocument();
            })
        })

        test('Renderizacion seleccionando una categoria y cerrando confirmacion', async () => {
            const { getByTitle } = render(<ComponentList categorys={categorys} setRestart={setRestart} />);

            await waitFor(() => {
                const item = getByTitle(`Categoria ${categorys[0].title}`);

                fireEvent.click(item);
            })

            await waitFor(() => {
                const modal_confirmation = getByTitle('modal');
                const button_close = getByTitle('Boton cerrar')

                expect(modal_confirmation).toBeInTheDocument();

                fireEvent.click(button_close);

                expect(modal_confirmation).not.toBeInTheDocument();
            })
        })
    });
})