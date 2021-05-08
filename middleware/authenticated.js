export default function ({ redirect, $fire }) {
  if (!$fire.auth.currentUser) {
    return redirect('/login')
  }
}
