import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebaseConfig';

const LoginScreen = ({ navigation }: any) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleLogin = async() => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigation.replace("Dashboard");
        } catch (error: any) {
            setErrorMessage("Usuario o password incorrectos. Intenta nuevamente.");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Iniciar sesión</Text>
            {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
            <TextInput 
                style={styles.input}
                placeholder='Correo electrónico'
                keyboardType='email-address'
                value={email}
                onChangeText={setEmail}
            />
            <TextInput 
                style={styles.input}
                placeholder='Contraseña'
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Ingresar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                <Text style={styles.link}>¿No tiene una cuenta? Ingrese aquí para registrarse</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 16,
      backgroundColor: "#f5f5f5",
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 16,
    },
    input: {
      width: "100%",
      height: 50,
      backgroundColor: "#fff",
      borderRadius: 8,
      paddingHorizontal: 16,
      marginVertical: 8,
      borderWidth: 1,
      borderColor: "#ccc",
    },
    button: {
      width: "100%",
      height: 50,
      backgroundColor: "#007bff",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 8,
      marginTop: 16,
    },
    buttonText: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "bold",
    },
    error: {
      color: "red",
      marginBottom: 16,
    },
    link: {
      color: "#007bff",
      marginTop: 16,
    },
  });
  
  export default LoginScreen;