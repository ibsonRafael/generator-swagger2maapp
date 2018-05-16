/**
 * @interface <%=classname%>
 * @extends I<%=classname %>
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
    //constructor (<% for (var attribute in required_items) { %><%-required_items[attribute].nameCamelCase -%>: <%-required_items[attribute].type -%><% if (attribute < (required_items.length - 1)) { %>, <% } %><% } %>) {
    //<% for (var attribute in required_items) { %>this.<%=attributes[attribute].nameCamelCase%> = <%=attributes[attribute].nameCamelCase%>;
    //<% } %>
    // }
    constructor (<%=classname.toLowerCase() %>: any = null) {
        <% for (var attribute in required_items) { %>this.<%=attributes[attribute].nameCamelCase%> =  <%=classname.toLowerCase() %> ? <%=classname.toLowerCase() %>.<%=attributes[attribute].nameCamelCase%> : null;
        <% } %>
    }
}