import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Animated} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import LayoutImage from '../components/Layout/LayoutImage';
import LinearGradient from 'react-native-linear-gradient';

const QuizGameScreen = ({route}) => {
  const {quiz} = route.params;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [feedbackOpacity] = useState(new Animated.Value(0));
  const navigation = useNavigation();
  const optionAnimations = useRef(
    quiz.questions[0].options.map(() => new Animated.Value(0)),
  ).current;

  useEffect(() => {
    animateOptions();
  }, [currentQuestionIndex]);

  const animateOptions = () => {
    optionAnimations.forEach((anim, index) => {
      anim.setValue(0);
      Animated.spring(anim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
        delay: index * 200, // Stagger the animations
      }).start();
    });
  };

  const handleAnswer = selectedAnswer => {
    const currentQuestion = quiz.questions[currentQuestionIndex];
    const isCorrect = selectedAnswer === currentQuestion.answer;

    if (isCorrect) {
      setScore(score + 1);
      setFeedback('Correct!');
    } else {
      setFeedback('Wrong. The correct answer is: ' + currentQuestion.answer);
    }

    Animated.timing(feedbackOpacity, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();

    setTimeout(() => {
      Animated.timing(feedbackOpacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setFeedback(null);
        if (currentQuestionIndex < quiz.questions.length - 1) {
          setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
          setShowResult(true);
        }
      });
    }, 2000);
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowResult(false);
    setFeedback(null);
    feedbackOpacity.setValue(0);
  };

  const navigateToHome = () => {
    navigation.navigate('QuizLaunchScreen');
  };

  const ProgressBar = ({progress}) => {
    return (
      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBar, {width: `${progress}%`}]} />
      </View>
    );
  };

  if (showResult) {
    return (
      <LayoutImage blur={40}>
        <View style={styles.container}>
          <Text style={styles.resultText}>Quiz Completed!</Text>
          <Text style={styles.resultText}>
            Your Score: {score}/{quiz.questions.length}
          </Text>
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
  const progress = ((currentQuestionIndex + 1) / quiz.questions.length) * 100;

  return (
    <LayoutImage blur={40}>
      <View style={styles.container}>
        <ProgressBar progress={progress} />
        <Text style={styles.questionText}>{currentQuestion.question}</Text>
        {currentQuestion.options.map((option, index) => (
          <Animated.View
            key={index}
            style={{
              transform: [
                {
                  scale: optionAnimations[index].interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.5, 1],
                  }),
                },
              ],
              opacity: optionAnimations[index],
            }}>
            <TouchableOpacity
              style={styles.optionButton}
              onPress={() => handleAnswer(option)}
              disabled={feedback !== null}>
              <LinearGradient
                colors={['#4c669f', '#3b5998', '#192f6a']}
                style={styles.optionGradient}>
                <Text style={styles.optionText}>{option}</Text>
              </LinearGradient>
            </TouchableOpacity>
          </Animated.View>
        ))}
        <Animated.View
          style={[
            styles.feedbackContainer,
            {
              opacity: feedbackOpacity,
              backgroundColor:
                feedback && feedback.includes('Correct')
                  ? '#4CAF50'
                  : '#f44336',
            },
          ]}>
          <Text style={styles.feedbackText}>{feedback}</Text>
        </Animated.View>
        <Text style={styles.progressText}>
          Question {currentQuestionIndex + 1} of {quiz.questions.length}
        </Text>
      </View>
    </LayoutImage>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 100,
    // justifyContent: 'center',
  },
  progressBarContainer: {
    height: 10,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 5,
    marginBottom: 20,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#4c669f',
    borderRadius: 5,
  },
  questionText: {
    fontSize: 18,
    color: 'white',
    marginBottom: 20,
    textAlign: 'center',
  },
  optionButton: {
    marginBottom: 10,
    borderRadius: 25,
    overflow: 'hidden',
  },
  optionGradient: {
    padding: 15,
    alignItems: 'center',
  },
  optionText: {
    fontSize: 16,
    color: 'white',
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
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
  },
  feedbackContainer: {
    padding: 15,
    borderRadius: 8,
    marginVertical: 10,
    minHeight: 50,
    justifyContent: 'center',
  },
  feedbackText: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
  },
});

export default QuizGameScreen;
