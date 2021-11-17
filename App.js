import React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Login from "./screens/Login";
import Home from "./screens/Home";
import  Profile  from "./screens/Profile";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MainProvider } from "./context/MainContext";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

const Tab = createMaterialBottomTabNavigator();

// We create an instance of the StackNavigator
const Stack = createNativeStackNavigator();

function Navigation (){
  return(
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  )
}

export default function App() {
  return (
    // Navigator container will contain all navigation flow of our app
    <NavigationContainer>
      <AppState>
      {/* We set the navigator as a Stack navigator, this one will allow us to handle navigation with a stack instead of tabs */}
      <Stack.Navigator>
        {/* Each stack screen will contain a children with the inner props required to work */}
        <Stack.Screen name="Login" options={{ headerShown: false }}>
          {(props) => <Login {...props} />}
        </Stack.Screen>
        <Stack.Screen name="Navigation">
          {(props) => <Navigation {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
      </AppState>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

const AppState = ({ children })=>{
  return(
    <MainProvider>
      { children }
    </MainProvider>
  )
}