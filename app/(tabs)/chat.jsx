import axios from "axios";
import React, { useState, useRef } from "react";
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";

import Constants from "expo-constants"; // For environment variables

// const GEMINI_API_KEY = AIzaSyBCK2iqZr5GWlg_pPdnmBOvdFKC0T4eQz4;

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const scrollViewRef = useRef();

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: "user" };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${AIzaSyBCK2iqZr5GWlg_pPdnmBOvdFKC0T4eQz4}`,
        { prompt: { text: input } }
      );

      const botReply =
        response.data.candidates?.[0]?.content?.parts?.[0]?.text ||
        "Sorry, I didn't understand.";

      setMessages((prevMessages) => [
        ...prevMessages,
        { text: botReply, sender: "bot" },
      ]);
    } catch (error) {
      console.error("Error:", error);
      const errorMessage =
        error.response?.data?.error?.message || "Error fetching response.";
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: errorMessage, sender: "bot" },
      ]);
    }

    setInput("");
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        onContentSizeChange={() =>
          scrollViewRef.current.scrollToEnd({ animated: true })
        }
        style={styles.chatBox}
      >
        {messages.map((msg, index) => (
          <Text
            key={index}
            style={msg.sender === "user" ? styles.userText : styles.botText}
          >
            {msg.text}
          </Text>
        ))}
      </ScrollView>

      <TextInput
        style={styles.input}
        value={input}
        onChangeText={setInput}
        placeholder="Type a message..."
        placeholderTextColor={"#fff"}
      />

      <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
        <Text style={styles.sendButtonText}>Send</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: "#111214" },
  chatBox: { flex: 1, marginBottom: 10 },
  userText: {
    alignSelf: "flex-end",
    backgroundColor: "#fff",
    color: "#111214",
    padding: 8,
    borderRadius: 5,
    marginVertical: 2,
  },
  botText: {
    alignSelf: "flex-start",
    backgroundColor: "#e5e5ea",
    color: "#111214",
    padding: 8,
    borderRadius: 5,
    marginVertical: 2,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 5,
    borderRadius: 8,
  },
  sendButton: {
    backgroundColor: "#F97316",
    borderRadius: 15,
    padding: 10,
    alignItems: "center",
    marginBottom: 25,
  },
  sendButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default Chat;
