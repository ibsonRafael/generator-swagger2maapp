/**
 * @class <%=classname%>
 * @implements I<%=classname %>
 * @author <%=author%> <<%=email%>>
 * @copyright ? - 2017 copyright
 */
import { I<%=classname %> } from '../interface/<%=interface_filename %>';

export class <%=classname %> implements I<%=classname %> {
    <% for (var attribute in attributes) { %>
    public <%= attributes[attribute].nameCamelCase %>: <%-attributes[attribute].type %> = null;<% } %>

    /**
     * @constructor
     */
    constructor (<%=classname.toLowerCase() %>: any = null) {
        <% for (var attribute in required_items) { %>this.<%=attributes[attribute].nameCamelCase%> =  <%=classname.toLowerCase() %> ? <%=classname.toLowerCase() %>.<%=attributes[attribute].nameCamelCase%> : null;
        <% } %>
    }

<% for (var attribute in attributes) { -%>
<% if(attributes[attribute].originalTye == 'array') { -%>
    public add<%=attributes[attribute].nameCamelCase.charAt(0).toUpperCase() + attributes[attribute].nameCamelCase.slice(1) %> (<%=attributes[attribute].nameCamelCase %>: any): boolean {
        this.<%=attributes[attribute].nameCamelCase%>.push(<%=attributes[attribute].nameCamelCase %>);
        return true;
    }

<% } -%>
<% } -%>
    public equals(item: any): boolean {
        return false;
    }

    public toString(): string {
        return '';
    }

    public getHashCode(): string {
        return '';
    }
}