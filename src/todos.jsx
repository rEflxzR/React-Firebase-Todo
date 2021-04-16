import { useState } from 'react'
import { auth, firestore, functions } from "./firebase";
import firebase from 'firebase'
import { useCollectionData } from "react-firebase-hooks/firestore";
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { styled } from '@material-ui/core/styles';
import './App.css'


const DetailButton = styled(Button)({
    background: 'linear-gradient(315deg, #3bb78f 0%, #0bab64 74%)'
})

const Todos = () => {
    const [todo, setTodo] = useState("")
    const todosRef = firestore.collection(`users/${auth.currentUser.uid}/todos`)
    const [todos] = useCollectionData(todosRef, {idField: "id"})

    const signOut = () => auth.signOut()

    const onSubmitTodo = (evt) => {
        evt.preventDefault()

        setTodo("")
        todosRef.add({
            text: todo,
            complete: false,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        })
    }

    return (
        <>
            <header id="signoutbox">
                <Button variant="contained" size="large" color="primary" onClick={signOut}><strong>Sign Out</strong></Button>
            </header>
            <main id="todolist">
                <h1 className="text-center"><strong>Your Task List</strong></h1>
                <form onSubmit={onSubmitTodo}>
                    <div id="newtodoform" className="my-5">
                        <TextField className="todoinput" required value={todo} onChange={(evt) => setTodo(evt.target.value)} id="title" label="Enter A New Todo" type="text"/>
                        <DetailButton className="submitbutton ml-3" type="submit" variant="contained" size="large" color="primary"><strong>Add</strong></DetailButton>
                    </div>
                </form>

                {todos && todos.map((todo) => <Todo {...todo}/>)}
            </main>
        </>
    )
}


const Todo = ({ id, complete, text }) => {
    const todosRef = firestore.collection(`users/${auth.currentUser.uid}/todos`)
    const onCompleteTodo = (id, complete) => todosRef.doc(id).set({ complete: !complete }, { merge: true })
  
    const onDeleteTodo = (id) => todosRef.doc(id).delete()
  
    return (
      <div key={id} className="todoli mx-auto py-3 px-3 h5">
          <span id="todolitext" className={`${complete ? "complete" : ""}`} onClick={() => onCompleteTodo(id, complete)}>{text}</span>
          <span id="todolidelete" onClick={() => onDeleteTodo(id)}><strong>X</strong></span>
      </div>
    )
}
  
export default Todos