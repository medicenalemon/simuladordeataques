import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";

const ddosScenarios = [
  {
    id: 1,
    description: "Un tráfico inusual está saturando el servidor. ¿Qué debe hacerse en ese caso?",
    options: [
      { id: 1, text: "Reiniciar el servidor", correct: false },
      { id: 2, text: "Habilitar un firewall avanzado", correct: true },
      { id: 3, text: "Ignorar el problema", correct: false },
    ],
  },
  {
    id: 2,
    description: "Los usuarios legítimos no pueden acceder a la página. ¿Cómo reaccionas?",
    options: [
      { id: 1, text: "Cerrar temporalmente el sitio", correct: false },
      { id: 2, text: "Activar mitigación anti-DDoS", correct: true },
      { id: 3, text: "Desactivar el firewall", correct: false },
    ],
  },
  {
    id: 3,
    description: "El tráfico malicioso proviene de múltiples direcciones IP. ¿Qué haces?",
    options: [
      { id: 1, text: "Bloquear direcciones IP manualmente", correct: false },
      { id: 2, text: "Solicitar a los usuarios que esperen", correct: false },
      { id: 3, text: "Configurar un sistema de detección de tráfico anómalo", correct: true }
    ],
  },
];

const DDoSSimulation = () => {
  const [currentScenario, setCurrentScenario] = useState(0);
  const [score, setScore] = useState(0);

  const handleSelection = (option) => {
    if (option.correct) {
      setScore(score + 1);
      Alert.alert("✅ Respuesta Correcta", "¡Buena elección! Has mitigado el ataque.");
    } else {
      Alert.alert("❌ Respuesta Incorrecta", "Esa estrategia no es efectiva contra DDoS.");
    }

    if (currentScenario < ddosScenarios.length - 1) {
      setCurrentScenario(currentScenario + 1);
    } else {
      Alert.alert(
        "🏆 Simulación Completa",
        `Puntuación final: ${score + 1} de ${ddosScenarios.length}`,
        [{ text: "Finalizar", onPress: () => console.log("Simulación Terminada") }]
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🛑 Ataque DDoS en Curso</Text>
      <Text style={styles.description}>{ddosScenarios[currentScenario].description}</Text>

      {ddosScenarios[currentScenario].options.map((option) => (
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

export default DDoSSimulation;
