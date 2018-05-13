/**
 * @interface <%=classname%>
 *
 * @author <%=author%> <<%=email%>>
 * @copyright ? - 2017 copyright
 **/
export class <%=classname %> {
<% for (var attribute in attributes) { %>
  private <%=attributes[attribute]%>: tipo = null;<% } %>

  /**
   * @constructor
   */
  constructor (params) {
    //Do simething...
  }
}
