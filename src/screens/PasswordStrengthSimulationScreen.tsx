import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Alert } from 'react-native';
import PasswordValidator from "password-validator";

const passwordSchema = new PasswordValidator();
passwordSchema
    .is().min(8) //Aquí valida de que tenga como mínimo 8 caracteres
    .is().max(20) //Aquí valida de que tenga como máximo 20 caracteres
    .has().uppercase()
    .has().lowercase()
    .has().digits()
    .has().symbols()
    .has().not().spaces();

const PasswordStrengthSimulationScreen = () => {
    const [password, setPassword] = useState("");
    const [strength, setStrength] = useState("");

    const checkPasswordStrength = () => {
        if(passwordSchema.validate(password)){
            setStrength("¡Felicitaciones! La contraseña es segura.");
            Alert.alert("¡Felicitaciones!", "La contraseña que elegiste es segura");
        } else {
            setStrength("La contraseña es débil o no es lo suficientemente fuerte, intenta agregar más caracteres, números y símbolos.");
            Alert.alert("La contraseña es débil", "Intenta agregar más caracteres, números y símbolos")
        }
    };

    return(
        <View style={styles.container}>
            <Text style={styles.title}>Contraseñas Seguras</Text>
            <Text style={styles.subtitle}>Ingresa una contraseña y verificaremos su grado de fortaleza</Text>

            <TextInput 
                style={styles.input}
                placeholder='Ingresa una contraseña...'
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />

            <TouchableOpacity style={styles.button} onPress={checkPasswordStrength}>
                <Text style={styles.buttonText}>🔑 Verificar contraseña</Text>
            </TouchableOpacity>

            {strength && <Text style={styles.strengthText}>{strength}</Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#f5f5f5",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 16,
        textAlign: "center",
    },
    subtitle: {
        fontSize: 16,
        marginBottom: 8,
        textAlign: "center",
    },
    input: {
        backgroundColor: "#fff",
        padding: 12,
        borderRadius: 8,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: "#ddd",
        fontSize: 16,
    },
    button: {
        backgroundColor: "#007bff",
        padding: 12,
        borderRadius: 8,
        alignItems: "center",
        marginBottom: 16,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
    },
    strengthText: {
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
        marginTop: 16,
    },
});

export default PasswordStrengthSimulationScreen;