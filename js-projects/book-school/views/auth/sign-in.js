const getError = (errors, nameInput) => {
  try {
    console.log(errors);
    return errors.mapped()[nameInput].msg;
  } catch (error) {
    return "";
  }
};
module.exports = ({ req, errors }) => {
  return `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <!-- Bootstrap CSS -->
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
        />
        <title>Sign In</title>
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css" rel="stylesheet">
        <link href="/css/main.css" rel="stylesheet">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.5/css/bulma.min.css"></link>
        
        <style>
          body {
            background-color: #f8f9fa;
          }
    
          .container {
            max-width: 400px;
            margin: 0 auto;
            margin-top: 100px;
            padding: 20px;
            background-color: #fff;
            border: 1px solid #ddd;
            border-radius: 5px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
          }
    
          .form-group {
            margin-bottom: 20px;
          }
    
          .form-group label {
            font-weight: bold;
          }
    
          .form-group input {
            width: 100%;
            padding: 8px;
            border: 1px solid #ddd;
            border-radius: 3px;
          }
    
          .form-group button {
            width: 100%;
            padding: 8px;
            background-color: #007bff;
            color: #fff;
            border: none;
            border-radius: 3px;
            cursor: pointer;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h2>Sign In</h2>
          <form method="POST">
            <div class="form-group">
              <label for="email">Email:</label>
              <input type="email" name="email" class="form-control" id="email" />
              <p class="help is-danger">${getError(errors, "email")}</p>
              </div>
            <div class="form-group">
              <label for="password">Password:</label>
              <input
                type="text"
                name="password"
                class="form-control"
                id="password"
                
              />
              <p class="help is-danger">${getError(errors, "password")}</p>
            </div>
            <div class="form-group">
              <button type="submit">Sign In</button>
            </div>
          </form>
        </div>
    
        <!-- Bootstrap JS (Optional) -->
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
      </body>
    </html>`;
};
