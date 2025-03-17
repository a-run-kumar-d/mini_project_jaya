import axios from "axios";
import React, { useState, useRef } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const scrollViewRef = useRef();

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: "user" };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    try {
      const prompt = `You are Arnold, a fitness chatbot. You have a intresting personality, you speak like a tough guy and mock people like david goggins when they ask irrelevent question.  Only reply to fitness related questions and in slightly mocking and arrogent tone. Keep your answers crisp and short. User: ${input}`;
      const response = await axios.post(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
        {
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.7,
            topK: 1,
            topP: 1,
            maxOutputTokens: 256,
          },
          safetySettings: [
            {
              category: "HARM_CATEGORY_HARASSMENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE",
            },
            {
              category: "HARM_CATEGORY_HATE_SPEECH",
              threshold: "BLOCK_MEDIUM_AND_ABOVE",
            },
            {
              category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE",
            },
            {
              category: "HARM_CATEGORY_DANGEROUS_CONTENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE",
            },
          ],
        },
        {
          headers: {
            "Content-Type": "application/json",
            // "x-goog-api-key": "AIzaSyANgbKDZPe4GSVQwPciqTrVaLg5dLXAhic", // api key arunkumar D
            "x-goog-api-key": "AIzaSyCaWMtV45CbBh4UjRtoFq0fTDyy_aAmMjc", //api jaya
          },
        }
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

  const clearChat = () => {
    setMessages([]);
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

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.clearButton} onPress={clearChat}>
          <Text style={styles.clearButtonText}>Clear</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
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
    marginVertical: 10,
  },
  botText: {
    width: "70%",
    alignSelf: "flex-start",
    backgroundColor: "#6B7280",
    color: "#fff",
    padding: 8,
    borderRadius: 5,
    marginVertical: 2,
  },
  input: {
    height: 40,
    borderColor: "#393C43",
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 5,
    borderRadius: 8,
    color: "#fff",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  sendButton: {
    backgroundColor: "#F97316",
    borderRadius: 15,
    padding: 10,
    alignItems: "center",
    marginBottom: 25,
    flex: 1,
    marginRight: 5,
  },
  sendButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  clearButton: {
    backgroundColor: "#6B7280",
    borderRadius: 15,
    padding: 10,
    alignItems: "center",
    marginBottom: 25,
    flex: 1,
    marginLeft: 5,
  },
  clearButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default Chat;
