/**
 * @author <%=author %> <<%=email %>>
 * @copyright ???? - 2017 copyright
 */
import { TestBed, inject } from '@angular/core/testing';

import { <%=tag %>SandboxService } from './<%=tag.toLowerCase() %>-sandbox.service';

describe('<%=tag %>SandboxService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [<%=tag %>SandboxService]
        });
    });

    it('deve criar uma instancia', inject(
        [<%=tag %>SandboxService],
        (sandbox: <%=tag %>SandboxService) => {
            expect(sandbox).toBeTruthy();

    }));
});
