//Team from IDGS 10-A group. González, Durón, Velasco, Vargas & Reyes.
import React,{ useEffect, useState, useContext } from 'react';
import firebase from "firebase";
import { auth } from "../../firebase";
import * as ImagePicker from 'expo-image-picker';
import { StyledView, StyledText } from "../../styles/styledComp"
import {
    Image,
    StyleSheet,
    Text,
    View,
    TouchableOpacity
  } from "react-native";
  import { MainContext } from "../../context/MainContext";

const Profile = () => {
  const [image, setImage] = useState(null);

  const { mainState,getFotos } = useContext(MainContext);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  useEffect(()=>{
    getFotos()
  },[image])

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const takePhoto = async()=>{
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);

    }
  }

 const uploadImagen = (uri)=>{
    return new Promise((resolve, reject)=>{
      let xhr = new XMLHttpRequest();
      xhr.onerror =reject;
      xhr.onreadystatechange =()=>{
        if(xhr.readyState === 4){
          resolve(xhr.response);
        }
      };
      xhr.open("GET", uri);
      xhr.responseType = "blob";
      xhr.send();
    })
 }


  const updateProfile =()=>{
    const usuario = auth.currentUser.uid;
   uploadImagen(image).then((resolve) =>{
      let ref = firebase.storage().ref().child(`images/${usuario}/foto`);
      ref.put(resolve).then(()=>
        setImage(null),
        getFotos()
      )
    }).catch(error => {
      console.log(error)
    })
    
  }

  const clearPhoto =()=>{
    setImage(null)
  }
    return (
       <View style={styles.container}>
           <StyledText>Profile Image</StyledText>
           {image? <Image source={{ uri: image }} style={ styles.userImg } />
           :
           mainState['fotos']?
           <Image source={{ uri:mainState['fotos'].toString().replace(/,/g, '')}} style={ styles.userImg } />
           :
           <Image source={{ uri:'https://res.cloudinary.com/dwzggunyf/image/upload/v1637006584/dwi/profile_nc2aki.png'}} style={ styles.userImg } />
          }
           

            <TouchableOpacity style={styles.button} onPress={pickImage}>
            <Text style={styles.buttonText}>Gallery!</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={takePhoto}>
            <Text style={styles.buttonText}>Camera</Text>
            </TouchableOpacity>  

            {image && 
              <TouchableOpacity style={styles.button} onPress={updateProfile}>
              <Text style={styles.buttonText}>Save changes</Text>
              </TouchableOpacity>  
            }

            {image && 
              <TouchableOpacity style={styles.button} onPress={clearPhoto}>
              <StyledText style={styles.buttonText}>Redo changes</StyledText>
              </TouchableOpacity>  
            }
       </View>
    )
}

export default Profile;

const styles = StyleSheet.create({
    userImg: {
      width:150,
      height:150,
      borderRadius:75
    },
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    button: {
    backgroundColor: "#0782F9",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    },
  });
  