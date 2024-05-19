import { type NextRequest } from 'next/server';
import { NextResponse } from "next/server";

import { Props_response } from '@/context/types/response';

import { Conect_database } from "@/backend/utils/db";
import { File_delete } from '@/backend/utils/cloudinary';

import Notes from '@/backend/schemas/notes'

export async function DELETE(req: NextRequest, { params: { segment } }: { params: { segment: string } }): Promise<NextResponse> {
    const token = req.cookies.get('__session')?.value as string;
    
    if (!token) return NextResponse.json<Props_response>({ status: 401, info: { message: "Credenciales invalidas" } });

    const _id = segment;

    const connection: boolean = await Conect_database();
    if (!connection) return NextResponse.json<Props_response>({ status: 500, info: { message: "Error al conectarse a la base de datos" } });

    try {
        const note: any = await Notes.findByIdAndDelete(_id);
        const response = (!note.file.id) ? true : await File_delete(note?.file.id);

        return NextResponse.json<Props_response>({ status: (response) ? 204 : 500, info: { message: (response) ? 'Nota eliminada' : 'La nota no se elimino definitivamente' } })
    } catch (error) {
        return NextResponse.json<Props_response>({ status: 500, info: { message: "Errores con el servidor" } })
    }
}