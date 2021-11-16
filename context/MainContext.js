import React, { createContext, useReducer } from "react";
import { mainReducer } from "./mainReducers";
import { database, storage } from '../firebase';
import firebase from "firebase";
import { auth } from "../firebase";


export class MainState {
    todos
    fotos
}

export const mainInitialState = {
    todos:null,
    fotos:null
}

export class MainContextProps {
    mainState
    getTodos
    createTodo
    updateProfilePhoto
    getFotos
    updateEstado
}

export const MainContext = createContext({});

export const MainProvider = ({ children } ) =>{
    const [state, dispatch] = useReducer(mainReducer, mainInitialState)

    const getTodos = ()=>{
        const usuario = auth.currentUser.uid;
        const todoRef = database.ref("todos");
        todoRef.on("value", (snapshot)=>{
            const todos = snapshot.val();
            const todosList = [];
            for (let id in todos[usuario]){
                todosList.push({ id, ...todos[usuario][id] });
            }
            dispatch({ type: 'getTodos',payload: todosList })
        });
    }

    const getFotos =()=>{
        const usuario = auth.currentUser.uid;
        const ref = firebase.storage().ref(`images/${usuario}/foto`).getDownloadURL().then((url)=>{
            dispatch({ type: 'getFotos',payload: url})
        })
        ref
    }

    const createTodo =(newTodo)=>{
        const usuario = auth.currentUser.uid;
        const todoRef = database.ref(`todos/${usuario}`)
        todoRef.push(newTodo)
    }

    const updateProfilePhoto =(fotoUrl)=>{
        const usuario = auth.currentUser.uid;
        const todoRef = database.ref(`fotos/${usuario}`)
        todoRef.update({foto:fotoUrl})
    }

    const updateEstado =(update,ref)=>{
        const usuario = auth.currentUser.uid;
        const todoRef = database.ref(`todos/${usuario}/${ref}`)
        todoRef.update({estado:update})
    }

    return (
        <MainContext.Provider value={{
            mainState: state,
            getTodos,
            createTodo,
            updateProfilePhoto,
            getFotos,
            updateEstado
        }} >
            { children }
        </MainContext.Provider>
    )
}