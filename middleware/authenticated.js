export default async function ({ store, redirect }) {
  const token = localStorage.getItem('authToken')
  const authenticated = store.state.authenticated
  if (!authenticated && !token) {
    return redirect('/login')
  } else {
    const user = JSON.parse(localStorage.getItem('authUser'))
    await store.dispatch('logUser', user)
  }
}
