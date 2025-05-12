import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const KeyloggerSimulation = () => {
    const [password, setPassword] = useState("");
    const [loggedKeys, setLoggedKeys] = useState("");
    const [securePassword, setSecurePassword] = useState("");

    const handleKeyPress = (key) => {
        setLoggedKeys((prev) => prev + key);
    };

    const handleInfectedInput = (text) => {
        setPassword(text);
        handleKeyPress(text.slice(-1));
    };

    const handleSecureInput = (text) => {
        setSecurePassword(text);
    };

    const submitPassword = () => {
        if (password) {
            Alert.alert("❗ Alerta de Keylogger", `El atacante ha ingresado la siguiente tecla: ${loggedKeys}`);
        } else {
            Alert.alert("✅ Estás a salvo","Has ingresado tu contraseña de manera segura");
        }
    };

    return(
        <View style={styles.container}>
            <Text style={styles.title}>Simulación de Keylogger</Text>
            <Text style={styles.warning}>❗ Un keylogger ha infectado tu dispositivo</Text>
            
            <Text style={styles.label}>❌ Campo de contraseña infectado</Text>
            <TextInput 
                style={styles.inputDanger}
                value={password}
                onChangeText={handleInfectedInput}
                placeholder='Ingresa una contraseña...'
                secureTextEntry
            />

            <Text style={styles.label}>✅ Campo de contraseña seguro</Text>
            <TextInput 
                style={styles.inputSafe}
                value={securePassword}
                onChangeText={handleSecureInput}
                placeholder='Ingresa una contraseña...'
                secureTextEntry
            />

            <TouchableOpacity style={styles.button} onPress={submitPassword}>
                <Text style={styles.buttonText}>Enviar</Text>
            </TouchableOpacity>
            
            {loggedKeys.length > 0 && (
                <View style={styles.logContainer}>
                    <Text style={styles.logTitle}>📋 Keylogger capturado: </Text>
                    <Text style={styles.loggedKeys}>{loggedKeys}</Text>
                </View>    
            )};

            <Text style={styles.tipsTitle}>💡 Algunos consejos para tu seguridad:</Text>
            <Text style={styles.tip}>1️⃣ Usa la autenticación en dos factores (2FA).</Text>
            <Text style={styles.tip}>2️⃣ Evita escribir contraseñas en equipos desconocidos.</Text>
            <Text style={styles.tip}>3️⃣ Usa teclados virtuales para mayor seguridad.</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f8f9fa",
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 10,
        color: "#d9534f",
    },
    warning: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#ff0000",
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        marginTop: 10,
        marginBottom: 5,
        color: "#333",
        fontWeight: "bold",
    },
    inputDanger: {
        width: "100%",
        padding: 10,
        borderWidth: 2,
        borderColor: "#d9534f",
        borderRadius: 5,
        backgroundColor: "#fff0f0",
        marginBottom: 10,
    },
    inputSafe: {
        width: "100%",
        padding: 10,
        borderWidth: 2,
        borderColor: "#d9534f",
        borderRadius: 5,
        backgroundColor: "#f0fff0",
        marginBottom: 10,
    },
    button: {
        backgroundColor: "#0275d8",
        padding: 10,
        borderRadius: 5,
        width: "100%",
        alignItems: "center",
        marginBottom: 20,
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
    },
    logContainer: {
        marginTop: 20,
        padding: 10,
        borderRadius: 5,
        backgroundColor: "#f0ad4e",
        width: "100%",
        alignItems: "center"
    },
    logTitle: {
        fontWeight: "bold",
        color: "#fff",
    },
    loggedKeys: {
        fontSize: 16,
        color: "#fff",
    },
    tipsTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginTop: 20,
        color: "#333",
    },
    tip: {
        fontSize: 14,
        color: "#555",
        marginTop: 5,
    },
});

export default KeyloggerSimulation;