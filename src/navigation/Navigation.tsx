import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from "../screens/LoginScreen";
import DashboardScreen from "../screens/DashboardScreen";
import SimulationScreen from "../screens/SimulationScreen";
import RegisterScreen from '../screens/RegisterScreen';
import PhishingSimulation from '../components/PhishingSimulation';
import DDoSSimulation from '../components/DDoSSimulation';
import MalwareSimulation from '../components/MalwareSimulation';
import MitMSimulation from '../components/MitMSimulation';
import RansomwareSimulation from '../components/RansomwareSimulation';
import BruteForceSimulation from '../components/BruteForceSimulation';
import SocialEngineeringSimulation from '../components/SocialEngineeringSimulation';
import SqlInjectionSimulation from '../components/SqlInjectionSimulation';
import ZeroDayExploitSimulation from '../components/ZeroDayExploitSimulation';
import KeyloggerSimulation from '../components/KeyloggerSimulation';
import PasswordStrengthSimulationScreen from "../screens/PasswordStrengthSimulationScreen";
import WebsiteSimulationScreen from '../screens/WebsiteSimulationScreen';
import AboutScreen from '../screens/AboutScreen';

const Stack = createStackNavigator();

export default function Navigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Dashboard" component={DashboardScreen} />
                <Stack.Screen name="Simulation" component={SimulationScreen} />
                <Stack.Screen name="Register" component={RegisterScreen} />
                <Stack.Screen name="PhishingSimulation" component={PhishingSimulation} options={{ title: "CyberSim" }} />
                <Stack.Screen name="DDoSSimulation" component={DDoSSimulation} options={{ title: "CyberSim" }} />
                <Stack.Screen name="MitMSimulation" component={MitMSimulation} options={{ title: "CyberSim" }} />
                <Stack.Screen name="MalwareSimulation" component={MalwareSimulation} options={{ title: "CyberSim" }} />
                <Stack.Screen name="RansomwareSimulation" component={RansomwareSimulation} options={{ title: "CyberSim" }} />
                <Stack.Screen name="BruteForceSimulation" component={BruteForceSimulation} options={{ title: "CyberSim" }} />
                <Stack.Screen name="SocialEngineeringSimulation" component={SocialEngineeringSimulation} options={{ title: "CyberSim" }} />
                <Stack.Screen name="SqlInjectionSimulation" component={SqlInjectionSimulation} options={{ title: "CyberSim" }} />
                <Stack.Screen name="ZeroDayExploitSimulation" component={ZeroDayExploitSimulation} options={{ title: "CyberSim" }} />
                <Stack.Screen name="KeyloggerSimulation" component={KeyloggerSimulation} options={{ title: "CyberSim" }} />
                <Stack.Screen name="PasswordStrengthSimulationScreen" component={PasswordStrengthSimulationScreen} options={{ title: "CyberSim" }} />
                <Stack.Screen name="WebsiteSimulationScreen" component={WebsiteSimulationScreen} options={{ title: "CyberSim" }} />
                <Stack.Screen name="AboutScreen" component={AboutScreen} options={{ title: "CyberSim" }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}