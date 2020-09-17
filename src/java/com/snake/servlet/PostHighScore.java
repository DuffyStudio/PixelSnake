/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.snake.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.Properties;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author Duffy
 */
@WebServlet(name = "posthighscore", urlPatterns = {"/posthighscore"})
public class PostHighScore extends HttpServlet {

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response){
    
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
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
      System.out.println("Creating statement...");
      stmt = conn.createStatement();
      String sql;
      sql = "insert into players (playername, score) values ('"+request.getParameter("player_name")+"',"+request.getParameter("score")+");";
      stmt.executeQuery(sql);
      stmt.close();
      
//      stmt = conn.createStatement();
//      String sql = "select playername, score from players order by score desc;";
//      ResultSet rs = stmt.executeQuery(sql);
//      while (rs.next()) {
//        System.out.println(rs.getString(1));
//      }
//      stmt.close();
      
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
        response.sendRedirect("highscores.jsp");
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
