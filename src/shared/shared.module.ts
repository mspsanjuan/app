import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HoverClassDirective } from './directives/hover-class.directive';
import { EdadPipe } from './pipes/edad.pipe';
import { ProfesionalPipe } from './pipes/profesional.pipe';
import { FromNowPipe } from './pipes/fromNow.pipe';
import { FechaPipe } from './pipes/fecha.pipe';
import { PacientePipe } from './pipes/paciente.pipe';
import { SexoPipe } from './pipes/sexo.pipe';
import { OrganizacionPipe } from './pipes/organizacion.pipe';
import { SortBloquesPipe } from './pipes/agenda-bloques.pipe';
import { TextFilterPipe } from './pipes/textFilter.pipe';
import { FilterPermisos } from './pipes/filterPermisos.pipe';
import { EnumerarPipe } from './pipes/enumerar.pipe';
import { PluralizarPipe } from './pipes/pluralizar.pipe';
import { IconoCamaPipe } from './pipes/iconoCama.pipe';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        EdadPipe,
        ProfesionalPipe,
        FromNowPipe,
        FechaPipe,
        PacientePipe,
        SexoPipe,
        OrganizacionPipe,
        SortBloquesPipe,
        TextFilterPipe,
        FilterPermisos,
        EnumerarPipe,
        PluralizarPipe,
        IconoCamaPipe,
        HoverClassDirective
    ],
    exports: [
        EdadPipe,
        ProfesionalPipe,
        FromNowPipe,
        FechaPipe,
        PacientePipe,
        SexoPipe,
        OrganizacionPipe,
        SortBloquesPipe,
        TextFilterPipe,
        FilterPermisos,
        EnumerarPipe,
        PluralizarPipe,
        IconoCamaPipe,
        HoverClassDirective
    ],
    providers: [
    ]
})
export class SharedModule {
}
