import axios from "axios";
import React, { useState } from "react";
import { Button, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

const GEMINI_API_KEY = "AIzaSyDJMNviR3YyIaF5n-Yi5XlgFzPHqozMy3E";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: "user" };
    setMessages([...messages, userMessage]);

    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
        {
          contents: [{ parts: [{ text: input }] }],
        }
      );

      const botReply = response.data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I didn't understand.";
      setMessages([...messages, userMessage, { text: botReply, sender: "bot" }]);
    } catch (error) {
      console.error("Error:", error);
      setMessages([...messages, userMessage, { text: "Error fetching response.", sender: "bot" }]);
    }

    setInput("");
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.chatBox}>
        {messages.map((msg, index) => (
          <Text key={index} style={msg.sender === "user" ? styles.userText : styles.botText}>
            {msg.text}
          </Text>
        ))}
      </ScrollView>
      <TextInput style={styles.input} value={input} onChangeText={setInput} placeholder="Type a message..." />
      <Button title="Send" onPress={sendMessage} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: "#f4f4f4" },
  chatBox: { flex: 1, marginBottom: 10 },
  userText: { alignSelf: "flex-end", backgroundColor: "#007AFF", color: "#fff", padding: 8, borderRadius: 5, marginVertical: 2 },
  botText: { alignSelf: "flex-start", backgroundColor: "#e5e5ea", color: "#000", padding: 8, borderRadius: 5, marginVertical: 2 },
  input: { height: 40, borderColor: "gray", borderWidth: 1, paddingHorizontal: 10, marginBottom: 5 },
});

export default Chat;
