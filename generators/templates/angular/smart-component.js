/**
 * @class <%=component%>PageComponent
 *
 * @author <%=author %> <<%=email %>>
 * @copyright ???? - 2017 copyright
 */
import {
    Component,
    ChangeDetectionStrategy, SimpleChanges, ChangeDetectorRef,
    OnChanges, OnDestroy, OnInit
} from '@angular/core';
// -------------------------------------- //
import {Subscription} from "rxjs/Subscription";
// -------------------------------------- //
import {<%=component%>PropriedadesService} from './<%=componentName%>-propriedades.service';
import {<%=component%>SandboxService} from '../<%=componentName%>-sandbox.service';
// -------------------------------------- //

@Component({
    selector:    '<%=componentName%>-page',
    templateUrl: './<%=componentName%>-page.component.html',
    styleUrls:  ['./<%=componentName%>-page.component.scss'],
    providers:  [<%=component%>PropriedadesService],
    changeDetection: ChangeDetectionStrategy.Default
})
export class <%=component%>PageComponent implements OnInit, OnChanges, OnDestroy {

    // -------------------------------------- //
    private subscriptions: Array<Subscription> = [];
    // -------------------------------------- //

    /**
     * @constructor
     * @param {<%=component%>PropriedadesService} capacidadePropriedadesService
     * @param {<%=component%>SandboxService} sandbox
     * @param {ChangeDetectorRef} changeDetector
     */
    constructor (
        protected capacidadePropriedadesService: <%=component%>PropriedadesService,
        protected sandbox: <%=component%>SandboxService,
        private changeDetector: ChangeDetectorRef,
    ) {
        // Do nothing... Because silence is golden!
    }

    ngOnInit() {

    }

    ngOnChanges(changes: SimpleChanges): void {

    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(sub => sub.unsubscribe());
        this.sandbox.unregisterEvents();
    }

}