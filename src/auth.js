export function getAuthForm () {
    return `
    <form class="mui-form" id="auth_form">

      <div class="mui-textfield mui-textfield--float-label">
        <input type="email" id="emailInput" required >
        <label for="emailInput">email</label>
      </div>

      <div class="mui-textfield mui-textfield--float-label">
        <input type="password" id="passwordInput" required >
        <label for="passwordInput">password</label>
      </div>

      <button 
      type="submit"
      class="mui-btn mui-btn--raised mui-btn--primary"
      id="authBtn"
      >Войти</button>
    </form>
    `
}

export function authWithEmailAndPassword (email, password){
    const apikey = 'AIzaSyC7s4nKWz6ZNEgMHQleaxcDlWrJIP7mBLQ';
    return fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apikey}`,{
        method:'POST',
        headers:{
            'Content-type': 'application/json'
        },
        body:JSON.stringify({
            email, password, returnSecureToken:true
        })})
        .then(response=>response.json())
        .then(data=>(data.idToken))

}