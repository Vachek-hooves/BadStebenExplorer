import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import LayoutImage from '../components/Layout/LayoutImage';

const QuizGameScreen = ({ route,navigation }) => {
  const { quiz } = route.params;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);


  const handleAnswer = (selectedAnswer) => {
    const currentQuestion = quiz.questions[currentQuestionIndex];
    if (selectedAnswer === currentQuestion.answer) {
      setScore(score + 1);
    }

    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowResult(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowResult(false);
  };

  const navigateToHome = () => {
    navigation.navigate('QuizScreen');
  };

  if (showResult) {
    return (
      <LayoutImage blur={40}>
        <View style={styles.container}>
          <Text style={styles.resultText}>Quiz Completed!</Text>
          <Text style={styles.resultText}>Your Score: {score}/{quiz.questions.length}</Text>
          <TouchableOpacity style={styles.button} onPress={restartQuiz}>
            <Text style={styles.buttonText}>Restart Quiz</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={navigateToHome}>
            <Text style={styles.buttonText}>Back to Home</Text>
          </TouchableOpacity>
        </View>
      </LayoutImage>
    );
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];

  return (
    <LayoutImage blur={40}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.topic}>{quiz.topic}</Text>
        <Text style={styles.questionText}>{currentQuestion.question}</Text>
        {currentQuestion.options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={styles.optionButton}
            onPress={() => handleAnswer(option)}
          >
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>
        ))}
        <Text style={styles.progressText}>
          Question {currentQuestionIndex + 1} of {quiz.questions.length}
        </Text>
      </ScrollView>
    </LayoutImage>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  topic: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
    textAlign: 'center',
  },
  questionText: {
    fontSize: 18,
    color: 'white',
    marginBottom: 20,
    textAlign: 'center',
  },
  optionButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  optionText: {
    fontSize: 16,
    textAlign: 'center',
  },
  progressText: {
    fontSize: 14,
    color: 'white',
    marginTop: 20,
    textAlign: 'center',
  },
  resultText: {
    fontSize: 24,
    color: 'white',
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default QuizGameScreen;
