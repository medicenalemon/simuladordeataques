import React from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";

const simulations = [
    { id: "1", title: "Simulaciones", description: "Descubre todas las simulaciones disponibles." },
    { id: "2", title: "Contraseñas Seguras", description: "Evalúa la fortaleza de tus contraseñas."},
    { id: "3", title: "Sitios web maliciosos", description: "Aprende a identificar páginas inseguras."},
    { id: "4", title: "Acerca del producto", description: "Más información sobre el producto" }
];

const DashboardScreen = ({ navigation }: any) => {
    const renderSimulation = ({ item }: any) => (
        <TouchableOpacity
            style={styles.card}
            onPress={() => {
              switch(item.id){
                case "1":
                  navigation.navigate("Simulation", { simulationId: item.id });
                  break;
                case "2":
                  navigation.navigate("PasswordStrengthSimulationScreen");
                  break;
                case "3":
                  navigation.navigate("WebsiteSimulationScreen");
                  break;
                case "4":
                  navigation.navigate("AboutScreen");
                  break;
              }
            }}
            //onPress={() => navigation.navigate("Simulation", { simulationId: item.id })}
        >
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardDescription}>{item.description}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Simulaciones disponibles</Text>
            <FlatList 
                data={simulations}
                renderItem={renderSimulation}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.list}
            />
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
    list: {
      paddingBottom: 16,
    },
    card: {
      backgroundColor: "#fff",
      padding: 16,
      borderRadius: 8,
      marginBottom: 12,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    cardTitle: {
      fontSize: 18,
      fontWeight: "bold",
    },
    cardDescription: {
      fontSize: 14,
      color: "#555",
      marginTop: 4,
    },
  });

export default DashboardScreen