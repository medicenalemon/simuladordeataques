import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Alert, TextInput } from 'react-native';

const SqlInjectionSimulation = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [challengeCompleted, setChallengeCompleted] = useState(false);
    const [attempts, setAttempts] = useState(0);
    const [message, setMessage] = useState("");
    const [hint, setHint] = useState("");

    const sqlInjectionPatterns = {
        classic: ["' OR '1'='1", "' OR 1=1 --", "' OR 'a'='a"],
        union: ["' UNION SELECT username, password FROM users --"],
        booleanBlind: ["' AND 1=1 --", "' AND 1=0 --"],
        timeBased: ["'; WAITFOR DELAY '00:00:05' --"]
    };

    const hintsList = {
        classic: [
            "💡 Pista 1: ¿Qué pasa si la consulta siempre es verdadera?",
            "💡 Pista 2: Intenta usar 1=1 en algún lugar",
            "💡 Pista 3: Agrega `' OR '1'='1` en usuario y/o contraseña"
        ],
        union: [
            "💡 Pista 1: A veces puedes combinar consultas",
            "💡 Pista 2: Usa `UNION SELECT` para ver más datos.",
            "💡 Pista 3: Prueba `' UNION SELECT username, password FROM users --`."
        ],
        booleanBlind: [
            "💡 Pista 1: Prueba `AND 1=1` o `AND 1=0`...",
            "💡 Pista 2: Observa si la respuesta cambia",
            "💡 Pista 3: `AND 1=1` devuelve datos, `AND 1=0` no."
        ],
        timeBased: [
            "💡 Pista 1: ¿Puedes hacer que el servidor se demore?",
            "💡 Pista 2: Usa `WAITFOR DELAY '00:00:05'`...",
            "💡 Pista 3: Prueba `'; WAITFOR DELAY '00:00:05' --`."
        ],
    };

    const getNextHint = (type) => {
        const currentHints = hintsList[type] || [];
        const index = Math.min(attempts, currentHints.length - 1);
        return currentHints[index] || "🤷‍♂️ No hay más pistas disponibles";
    };

    const checkLogin = () => {
        if(username === "" || password === ""){
            Alert.alert("⚠️ Error", "Los campos de usuario y contraseña son obligatorios para llevar a cabo la simulación.");
            return;
        }

        setAttempts(attempts + 1);
        console.log("📝 Se generó la siguiente consulta: ", `SELECT * FROM users WHERE username='${username}' AND password='${password}'`);

        let detectedAttack = null;

        if(sqlInjectionPatterns.classic.includes(username) || sqlInjectionPatterns.classic.includes(password)){
            detectedAttack = "classic";
            setChallengeCompleted(true);
            setMessage("✅ ¡Acceso concedido! Se ha detectado un Classic SQL Injection");
        } else if(sqlInjectionPatterns.union.includes(username) || sqlInjectionPatterns.union.includes(password)){
            detectedAttack = "union";
            setChallengeCompleted(true);
            setMessage("✅ ¡Los datos quedaron expuestos! Se detectó un Union-Based SQL Injection");
        } else if(sqlInjectionPatterns.booleanBlind.includes(username) || sqlInjectionPatterns.booleanBlind.includes(password)){
            detectedAttack = "booleanBlind";
            setChallengeCompleted(true);
            setMessage("✅ ¡La respuesta ha sido manipulada! Se detectó un Boolean-Blind SQL Injection");
        } else if (sqlInjectionPatterns.timeBased.includes(username) || sqlInjectionPatterns.timeBased.includes(password)){
            detectedAttack = "timeBased";
            setChallengeCompleted(true);
            setMessage("✅ ¡Provocaste un retardo en la respuesta! Se detectó un Time-Based SQL Injection");
        } else {
            setMessage("❌ Acceso denegado o intento de inyección inválido");
        }

        if(!detectedAttack){
            const possibleHints = ["classic", "union", "booleanBlind", "timeBased"];
            const hintType = possibleHints[attempts % possibleHints.length]; // Rotamos entre tipos
            setHint(getNextHint(hintType));
        } else {
            setHint("");
        }
    };

    return(
        <View style={styles.container}>
            <Text style={styles.title}>Simulación de SQL Injection</Text>
            <Text style={styles.label}>👤 Ingresar usuario:</Text>
            <TextInput 
                style={styles.input}
                placeholder="Escribe aquí el usuario"
                value={username}
                onChangeText={setUsername}
            />

            <Text style={styles.label}>🔑 Ingresar contraseña:</Text>
            <TextInput 
                style={styles.input}
                placeholder="Escribe aquí la contraseña"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />

            <TouchableOpacity style={styles.button} onPress={checkLogin}>
                <Text style={styles.buttonText}>🔓 Ingresar</Text>
            </TouchableOpacity>

            {message !== "" && <Text style={styles.result}>{message}</Text>}

            {hint !== "" && <Text style={styles.hint}>{hint}</Text>}

            <Text style={styles.attempts}>Intentos realizados: {attempts}</Text>
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
        marginBottom: 20,
        color: "#d9534f",
    },
    label: {
        alignSelf: "flex-start",
        fontSize: 16,
        marginBottom: 5,
        color: "#333",
    },
    input: {
        width: "100%",
        padding: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        marginBottom: 15,
        backgroundColor: "#fff",
    },
    button: {
        backgroundColor: "#0275d8",
        padding: 10,
        borderRadius: 5,
        width: "100%",
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
    },
    result: {
        marginTop: 15,
        fontSize: 16,
        fontWeight: "bold",
        color: "#28a745",
    },
    hint: {
        marginTop: 10,
        fontSize: 14,
        fontStyle: "italic",
        color: "#f0ad4e",
    },
    attempts: {
        marginTop: 10,
        fontSize: 14,
        color: "#555",
    },
});

export default SqlInjectionSimulation;