//Team from IDGS 10-A group. González, Durón, Velasco, Vargas & Reyes.
import { useNavigation } from "@react-navigation/core";
import React,{useContext, useState} from "react";
import { StyleSheet, Text, TouchableOpacity, View,  TextInput, FlatList } from "react-native";
// auth is an instance of firebase.auth() and it is imported from the firebase.js file
import { auth } from "../../firebase";
import { MainContext } from '../../context/MainContext';
import { Ionicons } from "react-native-vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyledView, StyledText } from "../../styles/styledComp"
import Profile from "../Profile";
import { NavigationContainer } from "@react-navigation/native";

const Tab = createBottomTabNavigator();


const HomePage = () => {
  const [todo, setTodo] = useState({
    tarea:'',
    estado: false

  })
  const { mainState, createTodo,updateEstado, deleteTodo } = useContext(MainContext);


  // navigation is an instance of our current NavigationContainer and we access to it trough the useNavigation() custom hook
  const navigation = useNavigation();

  // We will make a simple call to auth.signOut() which is also a promise based function and if it fullfills
  // we redirect the user to Login
  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const handleNewTodo =()=>{
    createTodo(todo)
    setTodo((current) => ({...current,text:''}))
  };

  //const userId = auth.onAuthStateChanged((user)=> console.log(user.uid))
     
  const test =()=>{
    console.log(mainState)
  }

  const updateState=(estado,item)=>{
    updateEstado(estado,item.id)
  }

  const deleteItem=(item)=>{
    deleteTodo(item.id)
  }

  return (
    <StyledView style={styles.container}>
      {/* Simple text with the current user */}
      <StyledText>Email:{auth.currentUser?.email}</StyledText>
      
      <TextInput
          placeholder="Add Todo"
          value={todo.text}
          onChangeText={(text) => setTodo({...todo,text: text})}
          style={styles.input}
        />

      <TouchableOpacity style={styles.button} onPress={handleNewTodo}>
        <StyledText style={styles.buttonText}>Add Todo</StyledText>
      </TouchableOpacity>
      <FlatList
        data={mainState['todos']}
        renderItem={({item}) => <Text style={styles.item}> {item.estado?
          <TouchableOpacity onPress={()=>updateState(!item.estado,item)}>
            <Ionicons name="checkmark-circle-sharp" color='green'></Ionicons>
            
          </TouchableOpacity>
        :
        <TouchableOpacity onPress={()=>updateState(!item.estado,item)}>
          <Ionicons name="ellipse-sharp" color='red'></Ionicons>

      </TouchableOpacity>
        
        } {item.text } 
        <TouchableOpacity onPress={()=>deleteItem(item)}>
          <Text>Borrar</Text>
        </TouchableOpacity>
        </Text>}
      />

      {/* Simple button that calls our function */}
      <TouchableOpacity style={styles.button} onPress={handleSignOut}>
        <StyledText style={styles.buttonText}>Sign Out</StyledText>
      </TouchableOpacity>
    </StyledView>
  );
};
export default HomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  button: {
    backgroundColor: "#0782F9",
    width: "60%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 40,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonOutlineText: {
    color: "#0782F9",
    fontWeight: "700",
    fontSize: 16,
  },
});
