export default async function ({ store, redirect }) {
  const token = localStorage.getItem('authToken')
  console.log(token)
  const authenticated = store.state.authenticated
  if (!authenticated && !token) {
    return redirect('/login')
  } else {
    console.log('entro')
    const user = JSON.parse(localStorage.getItem('authUser'))
    console.log(user)
    await store.dispatch('logUser', user)
  }
}
