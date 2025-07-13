import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../App";

type TermsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Terms"
>;

const TermsScreen: React.FC = () => {
  const navigation = useNavigation<TermsScreenNavigationProp>();

  const handleAccept = () => {
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
      >
        <Text style={styles.title}>Terms & Conditions</Text>
        <Text style={styles.text}>
          Welcome to Seraphine Hybrid V1. By using this application, you agree
          to the following terms...
        </Text>
        <Text style={styles.text}>
          This is a placeholder for the actual terms and conditions content.
        </Text>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.acceptButton} onPress={handleAccept}>
          <Text style={styles.buttonText}>Accept & Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111827",
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#22d3ee",
    marginBottom: 20,
    textAlign: "center",
  },
  text: {
    fontSize: 16,
    color: "#d1d5db",
    lineHeight: 24,
    marginBottom: 16,
  },
  buttonContainer: {
    padding: 20,
  },
  acceptButton: {
    backgroundColor: "#22d3ee",
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#111827",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default TermsScreen;
