import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { supabase } from '@/services/supabase';
import FlashMessage, { showMessage } from 'react-native-flash-message';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    if (email.trim() === "" || password.trim() === "") {
      showMessage({
        message: "Erro",
        description: "Por favor, preencha todos os campos.",
        type: "danger",
      });
      return;
    }

    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithPassword({ email, password });

      if (error) {
        showMessage({
          message: "Erro",
          description: error.message,
          type: "danger",
        });
      } else {
        showMessage({
          message: "Sucesso",
          description: "Login efetuado com sucesso!",
          type: "success",
        });
        router.replace('/home');
      }
    } catch (error) {
      if (error instanceof Error) {
        showMessage({
          message: "Erro",
          description: error.message,
          type: "danger",
        });
      } else {
        showMessage({
          message: "Erro",
          description: "Ocorreu um erro desconhecido",
          type: "danger",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
        value={password}
      />
      <Button title="Login" onPress={handleLogin} disabled={loading} />
      <FlashMessage position="top" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: "#F8F9FB",
  },
  title: {
    fontSize: 24,
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 12,
  },
});
