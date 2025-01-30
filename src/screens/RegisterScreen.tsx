import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebaseConfig';

const RegisterScreen = ({ navigation }: any) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);
    
    const isEmailValid = (email: string) => /\S+@\S+\.\S+/.test(email);
    const isPasswordSecure = (password: string) => password.length >= 8 && /[A-Z]/.test(password) && /[0-9]/.test(password);

    const handleRegister = async() => {
        if(!isEmailValid(email)){
            setErrorMessage("Por favor, ingresa un correo electrónico válido");
            return;
        }

        if(!isPasswordSecure(password)){
            setErrorMessage("La contraseña debe tener al menos 8 caracteres, incluir letras mayúsculas, minúsculas y números");
            return;
        }

        if(password !== confirmPassword){
            setErrorMessage("Las contraseñas no coinciden");
            return;
        }

        setLoading(true);
        setErrorMessage("");
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            navigation.replace("Dashboard");
        } catch (error: any) {
            setErrorMessage("Error al registrarse: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    return(
        <View style={styles.container}>
            <Text style={styles.title}>Registro de Usuario</Text>
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
            <TextInput 
                style={styles.input}
                placeholder='Confirmar contraseña'
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
            />
            <TouchableOpacity
                style={[styles.button, loading ? styles.buttonDisabled : {}]}
                onPress={handleRegister}
                disabled={loading}
            >
                {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Registrarse</Text>}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text style={styles.link}>¿Ya tienes cuenta? Inicia sesión aquí</Text>
            </TouchableOpacity>
        </View>
    );
}

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
    buttonDisabled: {
      backgroundColor: "#cccccc",
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

export default RegisterScreen
  