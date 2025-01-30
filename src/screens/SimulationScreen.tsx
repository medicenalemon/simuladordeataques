import React, { useState } from 'react';
import { doc, getDoc, setDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { auth, firestore } from '../config/firebaseConfig'
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const SimulationScreen = ({ route, navigation }: any) => {
    const { simulationId } = route.params;
    const [emailExample, setEmailExample] = useState({
        subject: "Actualización importante de tu banco",
        sender: "seguridad@bancofalso.com",
        body: "Estimado cliente, necesitamos que actualice su contraseña haciendo clic en el siguiente enlace: [Actualizar Contraseña]",
    });

    const handleAction = async (action: string) => {
        const userId = auth.currentUser?.uid;
        if (action === "report") {
            Alert.alert("¡Bien hecho!", "¡Has identificado correctamente el correo malicioso!");
            if (userId) {
              try {
                const userDocRef = doc(firestore, "users", userId);
                const userDocSnap = await getDoc(userDocRef);
                if(userDocSnap.exists()){
                  await updateDoc(userDocRef, {
                    simulationsCompleted: arrayUnion(simulationId),
                  });
                } else {
                  await setDoc(userDocRef, {
                    simulationsCompleted: [simulationId],
                  })
                };
                console.log("Simulación registrada exitosamente en Firestore");
              } catch (error) {
                console.error("Error al actualizar Firestore: ", error);
                Alert.alert("Error", "No se pudo actualizar tu progreso. Intenta nuevamente.");
              }
        } else {
            Alert.alert("¡Cuidado!", "El enlace que seguiste era malicioso. Revisa siempre el remitente del correo y la URL");
        }
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Simulación de Phishing</Text>
            <View style={styles.email}>
                <Text style={styles.emailSubject}>Asunto: {emailExample.subject}</Text>
                <Text style={styles.emailSender}>De: {emailExample.sender}</Text>
                <Text style={styles.emailBody}>{emailExample.body}</Text>
            </View>
            <TouchableOpacity style={styles.button} onPress={() => handleAction("click")}>
                <Text style={styles.buttonText}>Hacer clic en el enlace</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.reportButton]} onPress={() => handleAction("report")}>
                <Text style={styles.buttonText}>Reportar como malicioso</Text>
            </TouchableOpacity>
        </View>
    );
  }
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
    email: {
      backgroundColor: "#fff",
      padding: 16,
      borderRadius: 8,
      marginBottom: 24,
    },
    emailSubject: {
      fontSize: 16,
      fontWeight: "bold",
      marginBottom: 8,
    },
    emailSender: {
      fontSize: 14,
      color: "#555",
      marginBottom: 8,
    },
    emailBody: {
      fontSize: 14,
    },
    button: {
      backgroundColor: "#007bff",
      padding: 12,
      borderRadius: 8,
      marginBottom: 12,
      alignItems: "center",
    },
    reportButton: {
      backgroundColor: "#28a745",
    },
    buttonText: {
      color: "#fff",
      fontSize: 16,
    },
  });

export default SimulationScreen;