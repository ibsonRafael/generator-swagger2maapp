/**
 * Teste unitário para a classe <%=classname%>
 * @author <%=author%> <<%=email%>>
 * @copyright ? - 2017 copyright
 */
import { <%=classname %> }  from '<%=modelfile_name%>';
import { I<%=classname %> } from '../interface/<%=interface_filename%>';

describe('<%=classname %>', () => {
    it ('Deverá criar uma instância da classe <%=classname %>', () => {
        expect(new <%=classname %>()).toBeTruthy();
    });

    it ('Deverá implementar a interface I<%=classname %>', () => {
        expect(new <%=classname %>()).toBeTruthy();
    });

    // testar equals
    it ('Deverá ser igual ao esperado', () => {
        expect(new <%=classname %>()).toBeTruthy();
    });

    // testart getHashCode
    it ('Deverá retornar um hash valido', () => {
        expect(new <%=classname %>()).toBeTruthy();
    });

    // testart toString
    it ('Deverá retornar uma string valido', () => {
        expect(new <%=classname %>()).toBeTruthy();
    });
});
