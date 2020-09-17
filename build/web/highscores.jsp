<%-- 
    Document   : highscores
    Created on : Sep 17, 2020, 12:47:46 PM
    Author     : Duffy
--%>

<%@page import="java.util.Properties"%>
<%@page import="java.sql.*"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <link type="text/css" rel="stylesheet" href="./resources/styles/scores.css"/>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>JSP Page</title>
    </head>
    <body>
        <h1>High Scores</h1>
        <%
                     Connection conn = null;
   Statement stmt = null;
   try{
       
      //STEP 2: Register JDBC driver
      Class.forName("org.postgresql.Driver");
      
      
      //STEP 3: Open a connection 
      String url = "jdbc:postgresql://ec2-34-232-212-164.compute-1.amazonaws.com:5432/dbpfm7kv1qt7q6";
      Properties props = new Properties();
      props.setProperty("user","cxukzgmhdmfoek");
      props.setProperty("password","3630317232050e12c22e905fa1057902cc7c4c77d057c9507877a50fcd5aeb79");
      conn = DriverManager.getConnection(url, props);



      

      //STEP 4: Execute a query
//      System.out.println("Creating statement...");
//      stmt = conn.createStatement();
//      String sql;
//      sql = "insert into players (playername, score) values ('"+request.getParameter("player_name")+"',"+request.getParameter("score")+");";
//      stmt.executeQuery(sql);
//      stmt.close();
      
      stmt = conn.createStatement();
      String sql = "select playername, score from players order by score desc;";
      ResultSet rs = stmt.executeQuery(sql);
      int counter = 0;
      while (rs.next()) {
        counter++;
        out.println("<p><span class=\"scoreName\">"+counter+": "+rs.getString(1) +" </span><span class=\"scoreName\"> "+ rs.getString(2)+" </span></p>");
      }
      stmt.close();
      
      conn.close();
   }catch(SQLException se){
      //Handle errors for JDBC
      se.printStackTrace();
   }catch(Exception e){
      //Handle errors for Class.forName
      e.printStackTrace();
   }finally{
      //finally block used to close resources
      try{
         if(stmt!=null)
            stmt.close();
      }catch(SQLException se2){
      }// nothing we can do
      try{
         if(conn!=null)
            conn.close();
      }catch(SQLException se){
         se.printStackTrace();
      }//end finally try
   }//end try
   System.out.println("Goodbye!");
        %>
        <a href="./main.jsp"> Play Again!</a>
    </body>
</html>
