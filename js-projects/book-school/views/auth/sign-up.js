const getError = (errors, nameInput) => {
  try {
    console.log(errors);
    return errors.mapped()[nameInput].msg;
  } catch (error) {
    return "";
  }
};

module.exports = ({ req, errors }) => {
  //errors will be undefine but it enter the if statment that I pass the error it will define
  return `<!DOCTYPE html>
  <html>
    <head>

      <title>My Home Page</title>
      <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css" rel="stylesheet">
      <link href="/css/main.css" rel="stylesheet">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.5/css/bulma.min.css"></link>
      <script
      src="https://kit.fontawesome.com/805e959fd5.js"
      crossorigin="anonymous"
    ></script>
    <!--  bootstrab-->
    <script
      src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
      integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
      crossorigin="anonymous"
    ></script>
    <script
      src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js"
      integrity="sha384-IQsoLXl5PILFhosVNubq5LC7Qb9DXgDA9i+tQ8Zj3iwWAwPtgFTxbJ8NT4GN1R8p"
      crossorigin="anonymous"
    ></script>
    <script
      src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.min.js"
      integrity="sha384-cVKIPhGWiC2Al4u+LWgxfKTRIcfu0JTxR+EQDz/bgldoEyl4H0zUF0QKbrJ0EcQF"
      crossorigin="anonymous"
    ></script>
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
      crossorigin="anonymous"
    />
      <style>
        form {
          display:inline-block;
      justify-content: center;
      align-items: center;
      width: 500px;
      height: 700px;
      position:relative;
      top:250px;
      left: 40%;
        }
   .squar{
      display: flex;
      justify-content: space-between;
      width: 500px;
   }
   .size{
     width: 100px;
   }
   
  
      </style>
    </head>
    <div>
      
      <form method="POST" >
          <div class="mb-3">
              <label for="username" class="form-label">username</label>
              <input
                type="text"
                name="username"
                class="form-control"
                id="username"
                aria-describedby="emailHelp"
              />
              <p class="help is-danger">${getError(errors, "username")}</p>
        <div class="mb-3">
          <label for="email" class="form-label">Email address</label>
          <input
            type="email"
            name="email"
            class="form-control"
            id="email"
            aria-describedby="emailHelp"
          /><p class="help is-danger">${getError(errors, "email")}</p>
          <div id="emailHelp" class="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Password</label>
          <input
            type="text"
            name="password"
            class="form-control"
            id="password"
          /> <p class="help is-danger">${getError(errors, "password")}</p>
        </div>
        <div class="mb-3">
          <label for="passwordConfirmation" class="form-label">passwordConfirmation</label>
          <input
            type="text"
            class="form-control"
            id="passwordConfirmation"
            name="passwordConfirmation"
          /><p class="help text-danger">${getError(
            errors,
            "passwordConfirmation"
          )}</p>
        </div>
        <div class="mb-3 squar">
          <input
            type="number"
            class="form-control size"
            id="age"
            name="age"
            placeholder="age"
          /><p class="help text-danger">${getError(errors, "age")}</p>
          <input
          type="text"
          class="form-control size"
          id="country"
          name="country"
          placeholder="country"
        /><p class="help text-danger">${getError(errors, "country")}</p>
       
          
        </div>
        <div class="mb-3 form-check">
          <input type="checkbox" class="form-check-input" id="exampleCheck1" />
          <label class="form-check-label" for="exampleCheck1">Check me out</label>
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
  
    
    </body>
  </html>
    `;
};
