import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { db } from '../config/firebaseConfig'; // Acá nos aseguramos de importar correctamente tu configuración de Firebase
import { collection, getDocs, addDoc, serverTimestamp } from 'firebase/firestore';
import SimulationCard from '../components/SimulationCard';

const SimulationScreen = () => {
  const [simulations, setSimulations] = useState([]);

  useEffect(() => {
    const fetchSimulations = async () => {
      try {
        console.log('🔄 Obteniendo simulaciones...');
        const querySnapshot = await getDocs(collection(db, 'simulations'));
        const simsArray = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setSimulations(simsArray);
        console.log('✅ Simulaciones obtenidas:', simsArray);
      } catch (error) {
        console.error('❌ Error al obtener simulaciones:', error);
      }
    };

    /*const addSimulation = async (type, description, riskLevel, method, impact) => {
      try {
        await addDoc(collection(db, "simulations"), {
          type,
          description,
          riskLevel, // Nivel de riesgo
          method, // Método de ataque
          impact, // Impacto del ataque
          createdAt: serverTimestamp(), // Fecha y hora automática
        });
        console.log(`✅ Simulación "${type}" añadida`);
      } catch (error) {
        console.error("❌ Error al añadir la simulación:", error);
      }
    };
    
    // Agregamos nuevas simulaciones con detalles
    addSimulation(
      "Ransomware",
      "Un ataque que cifra los archivos y exige un pago para desbloquearlos.",
      "Alto",
      "Correo electrónico, archivos adjuntos maliciosos",
      "Pérdida de datos, costos de recuperación"
    );
    
    addSimulation(
      "Malware",
      "Software diseñado para dañar, interrumpir o robar información.",
      "Medio",
      "Descargas no seguras, sitios web infectados",
      "Compromiso del sistema, robo de información"
    );
    
    addSimulation(
      "DDoS",
      "Un ataque que sobrecarga un servidor con tráfico falso.",
      "Alto",
      "Red de bots, múltiples solicitudes",
      "Interrupción del servicio, pérdidas económicas"
    );

    addSimulation(
      "Ingeniería Social",
      "Manipulación psicológica para obtener información confidencial.",
      "Medio",
      "Llamadas telefónicas, mensajes personalizados",
      "Acceso no autorizado, robo de identidad"
    );
    
    addSimulation(
      "Keylogger",
      "Software malicioso que registra cada pulsación de teclado.",
      "Alto",
      "Instalación de malware, accesos no seguros",
      "Robo de contraseñas, acceso a cuentas bancarias"
    );
    
    addSimulation(
      "SQL Injection",
      "Ataque que inyecta código SQL en una base de datos vulnerable.",
      "Alto",
      "Campos de formularios, URLs no protegidas",
      "Filtración de datos, alteración de registros"
    );
    
    addSimulation(
      "Zero-Day Exploit",
      "Explotación de vulnerabilidades no descubiertas por los desarrolladores.",
      "Crítico",
      "Software desactualizado, falta de parches",
      "Compromiso total del sistema, acceso no autorizado"
    );
    
    addSimulation(
      "Man-in-the-Middle (MitM)",
      "Intercepción de la comunicación entre dos partes sin que lo sepan.",
      "Alto",
      "Redes WiFi públicas, ataques en la transmisión de datos",
      "Intercepción de credenciales, robo de datos"
    );
    
    addSimulation(
      "Fuerza Bruta (Brute-Force-Attack)",
      "Intentos repetidos de contraseñas hasta encontrar la correcta.",
      "Alto",
      "Acceso a cuentas sin protección, contraseñas débiles",
      "Acceso no autorizado, robo de datos personales"
    );*/
    

    fetchSimulations();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView 
        contentContainerStyle={{ flexGrow: 1 }} 
        showsVerticalScrollIndicator={true}
      >
      {simulations.length === 0 ? (
        <Text style={styles.noSimulations}>No hay simulaciones disponibles</Text>
      ) : (
        <FlatList
           data={simulations}
           keyExtractor={(item) => item.id}
           renderItem={({ item }) => {
           console.log('📌 Renderizando simulación:', item); // <--- Agrega este log
           return <SimulationCard simulation={item} />;
           }}
           showsVerticalScrollIndicator={true}
        />

      )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: '#f5f5f5',
    overflow: 'scroll',
  },
  noSimulations: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#777',
  },
});

export default SimulationScreen;
