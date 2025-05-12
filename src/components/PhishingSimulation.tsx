import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";

const phishingTests = [
  {
    id: 1,
    sender: "seguridad@bancofalso.com",
    body: "Estimado usuario, su cuenta ha sido bloqueada por razones de seguridad. Haga clic en el siguiente enlace para verificar su información: https://bancoseguro-verificacion.com",
    correctAnswer: 2,
  },
  {
    id: 2,
    sender: "contacto@amazon-support.com",
    body: "Hemos detectado actividad sospechosa en su cuenta de Amazon. Para evitar el cierre de su cuenta, inicie sesión aquí: http://amazon.verify-account.com",
    correctAnswer: 2,
  },
  {
    id: 3,
    sender: "info@premios-anuales.com",
    body: "¡Felicidades! Ha ganado un iPhone 15. Haga clic en el siguiente enlace para reclamar su premio: http://premios-gratis.com",
    correctAnswer: 2,
  },
  {
    id: 4,
    sender: "helpdesk@empresa.com",
    body: "Hola, necesitamos verificar tu información de acceso. Por favor responde a este correo con tu usuario y contraseña.",
    correctAnswer: 2,
  },
  {
    id: 5,
    sender: "seguridad@bancoseguro.com",
    body: "Hemos detectado un inicio de sesión en su cuenta. Si no reconoce esta actividad, contáctenos a través de nuestro sitio oficial.",
    correctAnswer: 1,
  },
  {
    id: 6,
    sender: "no-reply@amazon.com",
    body: "Estimado cliente, su pedido #1234567 ha sido enviado. Puede rastrearlo en su cuenta de Amazon.",
    correctAnswer: 1,
  },
  {
    id: 7,
    sender: "soporte@empresa.com",
    body: "Ha solicitado actualizar su información de contacto. Si no hizo esta solicitud, visite nuestro centro de seguridad.",
    correctAnswer: 1,
  },
];

const PhishingSimulation = () => {
  const [currentTest, setCurrentTest] = useState(0);
  const [score, setScore] = useState(0);

  const options = [
    { id: 1, text: "Es un correo legítimo" },
    { id: 2, text: "Es un intento de phishing" },
  ];

  const handleSelection = (option) => {
    if (option.id === phishingTests[currentTest].correctAnswer) {
      setScore(score + 1);
      Alert.alert("✅ Respuesta Correcta", "¡Bien hecho! Este es un intento de Phishing.");
    } else {
      Alert.alert("❌ Respuesta Incorrecta", "Este correo no es seguro, fíjate en la dirección del remitente y el enlace.");
    }

    if (currentTest < phishingTests.length - 1) {
      setCurrentTest(currentTest + 1);
    } else {
      Alert.alert(
        "🏆 Simulación Completa",
        `Has identificado ${score + 1} de ${phishingTests.length} correos correctamente.`,
        [{ text: "Finalizar", onPress: () => console.log("Simulación Terminada") }]
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Simulación de Phishing</Text>
      <Text style={styles.subtitle}>Correo {currentTest + 1} de {phishingTests.length}</Text>

      <View style={styles.emailBox}>
        <Text style={styles.emailHeader}>📩 De: {phishingTests[currentTest].sender}</Text>
        <Text style={styles.emailBody}>{phishingTests[currentTest].body}</Text>
      </View>

      {options.map((option) => (
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
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 10,
    color: "#555",
  },
  emailBox: {
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  emailHeader: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#d9534f",
    marginBottom: 5,
  },
  emailBody: {
    fontSize: 14,
    color: "#555",
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

export default PhishingSimulation;
