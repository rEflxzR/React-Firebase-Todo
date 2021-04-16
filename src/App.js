import Todos from './todos'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from './firebase'
import firebase from 'firebase'
import Button from '@material-ui/core/Button'
import './App.css'

const googleSignIn = () => auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())

const SignIn = () => (
	<main id="mainbox">
		<div id="signinbox">
			<h1 className="text-center"><strong>ReflxzR's Todo App</strong></h1>
			<span><Button variant="contained" size="large" color="secondary" onClick={googleSignIn}><strong>Sign in with Google</strong></Button></span>
		</div>
	</main>
)

const App = () => {
	const [user] = useAuthState(auth)

	return user ? <Todos /> : <SignIn />
}


export default App