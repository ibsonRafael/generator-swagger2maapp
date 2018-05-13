/**
 * @interface <%=interfacename%>
 *
 * @author <%=author%> <<%=email%>>
 * @copyright ? - 2017 copyright
 */
export interface <%=interfacename %> {
<% for (var attribute in attributes) { %>
  <%=attributes[attribute]%>;<% } %>
}
