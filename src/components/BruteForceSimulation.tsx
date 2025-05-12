import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

const correctPassword = "P@ssw0rd123";

const BruteForceSimulation = () => {
    const [attempt, setAttempt] = useState("");
    const [attemptsCount, setAttemptsCount] = useState(0);
    const [isLocked, setIsLocked] = useState(false);

    const handleAttempt = () => {
        if(isLocked){
            Alert.alert("🚫 Cuenta bloqueada","Se ha bloqueado la cuenta por razones de seguridad. Demasiados intentos fallidos.");
            return;
        }
        setAttemptsCount(attemptsCount + 1);
        if(attempt === correctPassword) {
            Alert.alert("✅ Acceso concedido", "Has adivinado la contraseña exitosamente");
        } else {
            if(attemptsCount >= 6){
                setIsLocked(true);
                Alert.alert("🔒 Se bloqueó la cuenta", "Demasiados intentos fallidos");
            } else {
                Alert.alert("❌ Contraseña incorrecta", "Inténtalo de nuevo.");
            }
        }
    }

    return(
        <View style={styles.container}>
            <Text style={styles.title}>🔓 Simulación de Ataques de Fuerza Bruta (Brute-Force-Attack)</Text>
            <Text style={styles.description}>
                Intenta adivinar la contraseña, pero ¡cuidado! Si después de cinco intentos no logras adivinar la misma, la cuenta se bloqueará.
            </Text>

            <TextInput
                style={styles.input}
                placeholder='Ingresa la contraseña...'
                secureTextEntry
                value={attempt}
                onChangeText={setAttempt}
                editable={!isLocked}
            />

            <TouchableOpacity style={styles.button} onPress={handleAttempt} disabled={isLocked}>
                <Text style={styles.buttonText}>Intentar</Text>
            </TouchableOpacity>

            <Text style={styles.attemptsText}> Intentos realizados: {attemptsCount} / 7</Text>

            {isLocked && <Text style={styles.lockedText}>🚫 CUENTA BLOQUEADA</Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#f8f9fa",
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 10,
        color: "#d9534f",
    },
    description: {
        fontSize: 16,
        marginBottom: 20,
        textAlign: "center",
        color: "#333",
    },
    input: {
        width: "80%",
        padding: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        marginBottom: 10,
        textAlign: "center",
    },
    button: {
        backgroundColor: "#007bff",
        padding: 12,
        borderRadius: 5,
        alignItems: "center",
        width: "80%",
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
    },
    attemptsText: {
        marginTop: 10,
        fontSize: 16,
        color: "#555",
    },
    lockedText: {
        marginTop: 10,
        fontSize: 18,
        color: "#d9534f",
        fontWeight: "bold",
    },
});

export default BruteForceSimulation;

