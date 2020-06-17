<%- include('../partials/header') %>
 <h1 class="display-3" style="margin-top:10%">Create New User</h1>
   <form method="post" action="/users/insert">
  <fieldset>
    <legend>Add User</legend>
    <div class="form-group">
      <label for="first_name">First Name</label>
      <input type="text" class="form-control" id="first_name" name="first_name" placeholder="First Name">
    </div>
    <div class="form-group">
      <label for="last_name">Last Name</label>
      <input type="text" class="form-control" id="last_name" name="last_name" placeholder="Last Name">
    </div>
    <div class="form-group">
      <label for="email">Email</label>
      <input type="email" class="form-control" id="email" name="email" aria-describedby="emailHelp" placeholder="Enter email">
      <small id="emailHelp" class="form-text text-muted">We won't share your email address.</small>
    </div>
    <button type="submit" class="btn btn-primary">Submit</button>
  </fieldset>
</form>
<%- include('../partials/footer') %>
