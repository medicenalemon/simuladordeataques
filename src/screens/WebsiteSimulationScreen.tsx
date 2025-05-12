import React from 'react';
import { View, Text, Image, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { db, auth } from "../config/firebaseConfig";
import { doc, setDoc, updateDoc, arrayUnion } from "firebase/firestore";

const WebsiteSimulationScreen = ({ navigation }: any) => {
    const userId = auth.currentUser?.uid;
    const simulationId = "3";

    const markAsCompleted = async () => {
        if (userId) {
          const userDocRef = doc(db, "users", userId);
          await setDoc(
            userDocRef,
            {
              simulationsCompleted: arrayUnion(simulationId),
            },
            { merge: true }
          );
        }
    };

    const handleAnswer = async(isSafe: boolean) => {
      if(!isSafe){
        Alert.alert("✅ ¡Buen trabajo!","Este sitio web era malicioso. ¡Bien hecho!");
        await markAsCompleted();
      } else {
        Alert.alert("❌ Respuesta incorrecta","Este sitio web era sospechoso o faltaban elementos de seguridad");
      }
      navigation.goBack();
    }

    return(
      <View style={styles.container}>
        <Text style={styles.title}>Simulación de Sitios Web Maliciosos</Text>

        <Image
          source={require("../../assets/fake_site.png")}
          style={styles.image}
          resizeMode="contain"
        />

        <Text style={styles.description}>Estás ingresando a un sitio web que aparenta ser el login de tu banco. Observa bien la URL y los elementos de seguridad.</Text>

        <TouchableOpacity style={styles.button} onPress={() => handleAnswer(true)}>
          <Text style={styles.buttonText}>Es seguro</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.malicious]} onPress={() => handleAnswer(false)}>
          <Text style={styles.buttonText}>Es malicioso</Text>
        </TouchableOpacity>
      </View>
    );
};

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
  image: {
    width: "100%",
    height: 200,
    marginBottom: 16,
    backgroundColor: "#eee",
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#007bff",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 12,
  },
  malicious: {
    backgroundColor: "#dc3545",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default WebsiteSimulationScreen;


