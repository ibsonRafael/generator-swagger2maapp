/**
 * @interface <%=classname%>
 *
 * @author <%=author%> <<%=email%>>
 * @copyright ? - 2017 copyright
 **/
export class <%=classname %> implements <%=classname %> {
<% for (var attribute in attributes) { %>
  private <%=attributes[attribute].nameCamelCase%>: <%-attributes[attribute].type%> = null;<% } %>

  /**
   * @constructor
   */
  constructor (<% for (var attribute in required_items) { %><%=attributes[attribute].nameCamelCase%>: <%-attributes[attribute].type%><% if (attribute < (required_items.length - 1)) { %>, <% } %><% } %>) {
      <% for (var attribute in required_items) { %>
      [<%= attribute %>]
      this.<%=attributes[attribute].nameCamelCase%> = <%=attributes[attribute].nameCamelCase%>;<% } %>

  }
}
