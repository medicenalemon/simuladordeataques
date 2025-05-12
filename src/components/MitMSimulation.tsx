import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const mitmScenarios = [
    {
        id: 1,
        description: "Te conectas a una red Wi-Fi en un café sin contraseña. De repente, ves un mensaje de alerta en tu navegador sobre un posible sitio no seguro. ¿Qué haces en ese caso?",
        options: [
            { id: 1, text: "Ignorar la alerta y continuar navegando", correct: false },
            { id: 2, text: "Desconectarme de la red y utilizar una VPN", correct: true },
            { id: 3, text: "Seguir navegando pero evitar utilizar contraseñas", correct: false },
        ],
    },
    {
        id: 2,
        description: "Recibes un correo de tu banco pidiéndote que inicies sesión en un enlace. Al hacer clic, notas que la URL parece extraña. ¿Qué deberías hacer en ese caso?",
        options: [
            { id: 1, text: "Llamar al banco para comprobar si el correo es legítimo", correct: true },
            { id: 2, text: "Ingresar mis credenciales para comprobar si funciona", correct: false },
            { id: 3, text: "Ignorar la sospecha y proceder si todo parece normal", correct: false },
        ],
    },
    {
        id: 3,
        description: "Un compañero de trabajo te dice que recibió un mensaje de WhatsApp de tu jefe pidiéndole información confidencial. ¿Cómo respondes?",
        options: [
          { id: 1, text: "Decirle que envíe la información si parece importante", correct: false },
          { id: 2, text: "Responder al mensaje preguntando más detalles", correct: false },
          { id: 3, text: "Verificar con el jefe a través de otro canal oficial", correct: true },
        ],
      },
];

const MitMSimulation = () => {
    const [currentScenario, setCurrentScenario] = useState(0);
    const [score, setScore] = useState(0);

    const handleSelection = (option) => {
        if(option.correct) {
            setScore(score + 1);
            Alert.alert("✅ Respuesta correcta", "Has tomado una decisión segura.");
        } else {
            Alert.alert("❌ Respuesta incorrecta", "Esta acción podría ponerte en riesgo.");
        }

        if (currentScenario < mitmScenarios.length - 1) {
            setCurrentScenario(currentScenario + 1);
        } else {
            Alert.alert("🏆 Simulación completa!", 
                `Puntuación final: ${score + 1} de ${mitmScenarios.length}`,
                [{ text: "Finalizar", onPress: () => console.log("Simulación terminada") }]
            );
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Ataque Man-in-the-Middle (MitM)</Text>
            <Text style={styles.description}>{mitmScenarios[currentScenario].description}</Text>
            
            {mitmScenarios[currentScenario].options.map((option) => (
                <TouchableOpacity
                    key={option.id}
                    style={styles.optionButton}
                    onPress={() => handleSelection(option)}
                >
                    <Text style={styles.optionText}>{option.text}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#f8f9fa",
        justifyContent: "center",
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
        color: "#333",
    },
    optionButton: {
        backgroundColor: "#007bff",
        padding: 12,
        borderRadius: 5,
        marginVertical: 5,
        alignItems: "center",
    },
    optionText: {
        color: "#fff",
        fontWeight: "bold",
    },
});

export default MitMSimulation;
