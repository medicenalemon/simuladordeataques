import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Linking } from 'react-native';

const AboutScreen = () => {
    return(
        <View style={styles.container}>
            <Text style={styles.title}>Acerca de CyberSim</Text>
            <Text style={styles.text}>
                <Text style={styles.bold}>CyberSim</Text> es una aplicación que fue desarrollada para
                fines educativos, con el propósito de concientizar a las personas sobre cómo actuar ante amenazas de ataques informáticos y cómo evitarlos a través de simulaciones interactivas.
            </Text>

            <Text style={styles.subtitle}>Desarrollado por:</Text>
            <Text style={styles.text}>A.U.S. Mauricio Alejandro Montero - Full Stack Developer</Text>

            <Text style={styles.subtitle}>Correo electrónico de contacto</Text>
            <TouchableOpacity onPress={() => Linking.openURL("mailto:mauricioalemon1992@gmail.com")}>
                <Text style={styles.text}><Text style={styles.link}>mauricioalemon1992@gmail.com</Text></Text>
            </TouchableOpacity>

            <Text style={styles.subtitle}>LinkedIn</Text>
            <TouchableOpacity onPress={() => Linking.openURL("https://www.linkedin.com/in/mauricioalemon")}>
                <Text style={styles.text}><Text style={styles.link}>@mauricioalemon</Text></Text>
            </TouchableOpacity>

            <Text style={styles.subtitle}>GitHub</Text>
            <TouchableOpacity onPress={() => Linking.openURL("https://github.com/medicenalemon")}>
                <Text style={styles.link}>@medicenalemon</Text>
            </TouchableOpacity>

            <Text style={styles.footer}>Simulador de ataques informáticos CyberSim - Versión 1.0.0</Text>
            <Text style={styles.footer}>(C) Mauricio Montero, 2025. Todos los derechos reservados.</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#f5f5f5",
    },
    title: {
        fontSize: 26,
        fontWeight: "bold",
        marginBottom: 16,
        textAlign: "center",
    },
    subtitle: {
        fontSize: 18,
        fontWeight: "600",
        marginTop: 20,
        marginBottom: 6,
    },
    text: {
        fontSize: 16,
        marginBottom: 10,
    },
    bold: {
        fontWeight: "bold",
    },
    link: {
        fontSize: 16,
        color: "#007bff",
    },
    footer: {
        marginTop: 40,
        fontSize: 14,
        color: "#888",
        textAlign: "center",
    },
});

export default AboutScreen;