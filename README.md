# Post-MEAN-on-Angular2-

This application let user to operate post.
It has components below,
  Login : displays login form
  
  Registration : displays registration form
  
  Home : After login page
  
  Create Post : Display create form, with the following fields

  List Posts : Display all the Posts created using create component and each block needs to have the following options
    comments
    like
    
  View Post : Displays details of a Post with option to view / create comments and like
  
  Navigation : Displays navbar with dynamic links

Create separate services for auth and posts

Use route guard and JWT tokens to make sure the user has logged.

Apply the route guards for protecting Create user, List user and View user routes.

Use Http interceptor to pass token value in the request headers.
