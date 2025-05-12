import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";

const ransomwareScenarios = [
  {
    id: 1,
    description: "Recibes un mensaje en tu computadora diciendo que todos tus archivos han sido cifrados y debes pagar en Bitcoin o DASH para recuperarlos. ¿Qué haces?",
    options: [
      { id: 1, text: "Pagar el rescate inmediatamente", correct: false },
      { id: 2, text: "Desconectar la computadora de la red y notificar al equipo de seguridad", correct: true },
      { id: 3, text: "Reiniciar la computadora e intentar acceder a los archivos", correct: false },
    ],
  },
  {
    id: 2,
    description: "Notas que varios archivos importantes han cambiado su extensión y no puedes abrirlos. ¿Cuál es tu siguiente paso?",
    options: [
      { id: 1, text: "Intentar renombrar los archivos y abrirlos", correct: false },
      { id: 2, text: "Restaurar los archivos desde una copia de seguridad reciente", correct: true },
      { id: 3, text: "Ignorar el problema y seguir trabajando", correct: false },
    ],
  },
  {
    id: 3,
    description: "Descubriste que un compañero de trabajo recibió un correo con un archivo sospechoso y lo abrió. ¿Qué haces?",
    options: [
      { id: 1, text: "Verificar si el archivo afecta a mi computadora antes de hacer algo", correct: false },
      { id: 2, text: "Aislar el equipo de la red y reportarlo al equipo de seguridad", correct: true },
      { id: 3, text: "Pedirle a mi compañero que elimine el archivo", correct: false },
    ],
  },
];

const RansomwareSimulation = () => {
  const [currentScenario, setCurrentScenario] = useState(0);
  const [score, setScore] = useState(0);

  const handleSelection = (option) => {
    if (option.correct) {
      setScore(score + 1);
      Alert.alert("✅ Respuesta Correcta", "¡Buena decisión! Has mitigado el impacto del ransomware.");
    } else {
      Alert.alert("❌ Respuesta Incorrecta", "Esa acción puede empeorar la situación.");
    }

    if (currentScenario < ransomwareScenarios.length - 1) {
      setCurrentScenario(currentScenario + 1);
    } else {
      Alert.alert(
        "🏆 Simulación Completa",
        `Puntuación final: ${score + 1} de ${ransomwareScenarios.length}`,
        [{ text: "Finalizar", onPress: () => console.log("Simulación Terminada") }]
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🔒 Ataque de Ransomware</Text>
      <Text style={styles.description}>{ransomwareScenarios[currentScenario].description}</Text>

      {ransomwareScenarios[currentScenario].options.map((option) => (
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
};

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

export default RansomwareSimulation;
