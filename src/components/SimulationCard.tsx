import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { NavigationRouteContext, useNavigation } from "@react-navigation/native";
import PhishingSimulation from "./PhishingSimulation";
import DDoSSimulation from "./DDoSSimulation";
import MitMSimulation from "./MitMSimulation";
import RansomwareSimulation from "./RansomwareSimulation";
import MalwareSimulation from "./MalwareSimulation";
import SocialEngineeringSimulation from "./SocialEngineeringSimulation";
import SqlInjectionSimulation from "./SqlInjectionSimulation";

const SimulationCard = ({ simulation }) => {
  const navigation = useNavigation(); // Obtener la navegación

  const handlePress = () => {
    switch(simulation.type){
      case "Phishing":
        navigation.navigate("PhishingSimulation", { simulation });
        break;
      case "DDoS":
        navigation.navigate("DDoSSimulation", { simulation });
        break;
      case "Man-in-the-Middle (MitM)":
        navigation.navigate("MitMSimulation", { simulation });
        break;
      case "Ransomware":
        navigation.navigate("RansomwareSimulation", { simulation });
        break;
      case "Malware":
        navigation.navigate("MalwareSimulation", { simulation });
        break;
      case "Fuerza Bruta (Brute-Force-Attack)":
        navigation.navigate("BruteForceSimulation", { simulation });
        break;
      case "Ingeniería Social":
        navigation.navigate("SocialEngineeringSimulation", { simulation });
        break;
      case "SQL Injection":
        navigation.navigate("SqlInjectionSimulation", { simulation });
        break;
      case "Zero-Day Exploit":
        navigation.navigate("ZeroDayExploitSimulation", { simulation });
        break;
      case "Keylogger":
        navigation.navigate("KeyloggerSimulation", { simulation });
        break;
    }
  };

  return (
    <View style={styles.card}>
      <Text style={styles.type}>📌 {simulation.type}</Text>
      <Text style={styles.description}>{simulation.description}</Text>
      <Text style={styles.description}>⚠️ NIVEL DE RIESGO: {simulation.riskLevel}</Text>
      <Text style={styles.description}>🔍 MÉTODO: {simulation.method}</Text>
      <Text style={styles.description}>💥 IMPACTO: {simulation.impact}</Text>
      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Text style={styles.buttonText}>Iniciar Simulación</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  type: {
    fontSize: 18,
    fontWeight: "bold",
  },
  description: {
    fontSize: 14,
    color: "#555",
    marginVertical: 5,
  },
  button: {
    marginTop: 10,
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default SimulationCard;


