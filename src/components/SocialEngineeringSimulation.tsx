import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';

const scenarios = [
    {
        question: 'Recibes una llamada de alguien que dice ser del banco y te pide tu contraseña para "verificar tu identidad". ¿Qué acción tomas en ese caso?',
        image: require("../../assets/phone_call.png"),
        options: [
            { id: 1, text: "Se la doy, parece confiable", correct: false },
            { id: 2, text: "Pregunto si puede enviarme un correo", correct: false },
            { id: 3, text: "Le digo de que llamaré directamente al banco", correct: true }
        ],
        hint: "Los bancos nunca pedirán contraseñas por teléfono debido a la normativa de seguridad vigente.",
    },
    {
        question: "Recibiste un correo donde te avisan que tu cuenta será suspendida en un lapso de 48 horas si no haces clic en un enlace. ¿Qué debes hacer en ese caso?",
        image: require("../../assets/phishing_email.png"),
        options: [
            { id: 1, text: "Verifico la dirección del remitente y contacto a soporte técnico oficial", correct: true },
            { id: 2, text: "Hago clic y proporciono mis datos", correct: false },
            { id: 3, text: "Reenvío el correo a mis contactos para advertirles", correct: false }
        ],
        hint: "Verifica siempre el remitente y no hagas clic en enlaces sospechosos.",
    },
    {
        question: 'Un nuevo compañero de trabajo te pide tu usuario y contraseña para "configurar el sistema". ¿Qué haces en esa situación?',
        image: require("../../assets/social_engineering.png"),
        options: [
            { id: 1, text: "Le paso los datos, seguramente los necesita", correct: false },
            { id: 2, text: "Le digo que consulte con el equipo de IT o con el jefe de dicha área", correct: true },
            { id: 3, text: "Le pido que me ayude en persona y luego le dicto la contraseña", correct: false }
        ],
        hint: "No debes compartir credenciales, siempre consulta con el equipo de IT de tu empresa.",
    },
];

const SocialEngineeringSimulation = () => {
    const [currentScenario, setCurrentScenario] = useState(0);
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(10);
    const [showHint, setShowHint] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
        }, 1000);
        return () => clearInterval(timer);
    }, [currentScenario]);

    useEffect(() => {
        if (timeLeft === 0){
            handlePress(false);
        }
    }, [timeLeft]);

    const handlePress = (isCorrect: boolean) => {
        if(isCorrect){
            setScore(score + 1);
            Alert.alert("✅ Respuesta correcta", "¡Bien hecho!");
        } else {
            Alert.alert("❌ Respuesta incorrecta", "Recuerda no compartir información confidencial.");
        }

        if(currentScenario < scenarios.length - 1){
            setCurrentScenario(currentScenario + 1);
            setTimeLeft(10);
            setShowHint(false);
        } else {
            Alert.alert("🏁 Simulación completada", `Puntaje final: ${score + (isCorrect? 1 : 0)} / ${scenarios.length}`);
            setCurrentScenario(0);
            setScore(0);
            setTimeLeft(10);
        }
    };

    return(
        <View style={styles.container}>
            <Text style={styles.title}>Simulación de Ingeniería Social</Text>
            <Text style={styles.timer}>Tiempo restante: {timeLeft}seg</Text>

            <Image source={scenarios[currentScenario].image} style={styles.image}/>
            <Text style={styles.question}>{scenarios[currentScenario].question}</Text>

            {scenarios[currentScenario].options.map((option, index) => (
                <TouchableOpacity
                    key={index}
                    style={[styles.button, option.correct ? styles.correctOption : styles.wrongOption]}
                    onPress={() => handlePress(option.correct)}
                >
                    <Text style={styles.buttonText}>{option.text}</Text>
                </TouchableOpacity>
            ))}

            <TouchableOpacity style={styles.hintButton} onPress={() => setShowHint(!showHint)}>
                <Text style={styles.hintButtonText}>💡 Mostrar pista</Text>
            </TouchableOpacity>

            {showHint && <Text style={styles.hintText}>🔍 {scenarios[currentScenario].hint}</Text>}

            <Text style={styles.score}>Puntaje: {score} / {scenarios.length}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#f8f9fa",
        justifyContent: "center",
        alignItems: "center",
      },
      title: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 10,
        color: "#ff9800",
      },
      timer: {
        fontSize: 18,
        color: "#d9534f",
        marginBottom: 10,
      },
      image: {
        width: 200,
        height: 150,
        marginBottom: 10,
      },
      question: {
        fontSize: 16,
        marginBottom: 20,
        textAlign: "center",
        color: "#333",
      },
      button: {
        padding: 12,
        borderRadius: 5,
        alignItems: "center",
        width: "80%",
        marginVertical: 5,
      },
      correctOption: {
        backgroundColor: "#28a745",
      },
      wrongOption: {
        backgroundColor: "#dc3545",
      },
      buttonText: {
        color: "#fff",
        fontWeight: "bold",
      },
      hintButton: {
        marginTop: 10,
        padding: 10,
        backgroundColor: "#007bff",
        borderRadius: 5,
      },
      hintButtonText: {
        color: "#fff",
        fontWeight: "bold",
      },
      hintText: {
        marginTop: 10,
        fontSize: 14,
        color: "#555",
        fontStyle: "italic",
      },
      score: {
        marginTop: 20,
        fontSize: 16,
        color: "#555",
      },
});

export default SocialEngineeringSimulation;
