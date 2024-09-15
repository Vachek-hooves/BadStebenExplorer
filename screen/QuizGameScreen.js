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
  const bounceAnimations = useRef(
    quiz.questions[0].options.map(() => new Animated.Value(1)),
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
        delay: index * 100,
      }).start();
    });
  };

  const handleAnswer = (selectedAnswer, index) => {
    if (feedback !== null) return;

    // Bounce animation for the selected option
    Animated.sequence([
      Animated.timing(bounceAnimations[index], {
        toValue: 0.8,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.spring(bounceAnimations[index], {
        toValue: 1,
        friction: 3,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();

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
    bounceAnimations.forEach(anim => anim.setValue(1));
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
        <View style={styles.progressTextContainer}>
          <LinearGradient
            colors={['rgba(76, 102, 159, 0.7)', 'rgba(25, 47, 106, 0.7)']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={styles.progressTextGradient}>
            <Text style={styles.progressText}>
              Question {currentQuestionIndex + 1} of {quiz.questions.length}
            </Text>
          </LinearGradient>
        </View>
        <Text style={styles.questionText}>{currentQuestion.question}</Text>
        {currentQuestion.options.map((option, index) => (
          <Animated.View
            key={index}
            style={{
              transform: [
                {
                  scale: Animated.multiply(
                    optionAnimations[index],
                    bounceAnimations[index],
                  ),
                },
              ],
              opacity: optionAnimations[index],
            }}>
            <TouchableOpacity
              style={styles.optionButton}
              onPress={() => handleAnswer(option, index)}
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
      </View>
    </LayoutImage>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 40, // Adjusted to accommodate the progress text at the top
  },
  progressBarContainer: {
    height: 10,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 5,
    marginBottom: 10, // Reduced margin to bring progress text closer
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#4c669f',
    borderRadius: 5,
  },
  progressTextContainer: {
    marginBottom: 20, // Added margin to separate from the question
  },
  progressTextGradient: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  progressText: {
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
  },
  questionText: {
    fontSize: 30,
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
    fontSize: 22,
    color: 'white',
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
