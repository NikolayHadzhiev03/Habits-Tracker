export default function Register(){
    




    return (
        <>
        <form>
  <div>
    <label htmlFor="username">Username:</label><br />
    <input
      type="text"
      id="username"
      name="username"
      required
    />
  </div>

  <div>
    <label htmlFor="email">Email:</label><br />
    <input
      type="email"
      id="email"
      name="email"
      required
    />
  </div>

  <div>
    <label htmlFor="password">Password:</label><br />
    <input
      type="password"
      id="password"
      name="password"
      required
    />
  </div>

  <div>
    <label htmlFor="repassword">Repeat Password:</label><br />
    <input
      type="password"
      id="repassword"
      name="repassword"
      required
    />
  </div>

  <button type="submit">Register</button>
</form>

        </>
    )
}