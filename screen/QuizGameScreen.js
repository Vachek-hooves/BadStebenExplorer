import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import LayoutImage from '../components/Layout/LayoutImage';
import LinearGradient from 'react-native-linear-gradient';
import {IconReturn} from '../components/icon';
// import Icon from 'react-native-vector-icons/FontAwesome5';
import {useAppContext} from '../store/context';

const QuizGameScreen = ({route}) => {
  const {quiz} = route.params;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [feedbackOpacity] = useState(new Animated.Value(0));
  const navigation = useNavigation();
  const {unlockNextLevel} = useAppContext(); // Add this line
  const [nextLevelUnlocked, setNextLevelUnlocked] = useState(false);
  const optionAnimations = useRef(
    quiz.questions[0].options.map(() => new Animated.Value(0)),
  ).current;
  const bounceAnimations = useRef(
    quiz.questions[0].options.map(() => new Animated.Value(1)),
  ).current;
  const [resultAnimation] = useState(new Animated.Value(0));

  useEffect(() => {
    animateOptions();
  }, [currentQuestionIndex]);

  useEffect(() => {
    if (showResult) {
      unlockNextLevel(quiz.id, score).then(unlocked => {
        setNextLevelUnlocked(unlocked);
      });
      Animated.timing(resultAnimation, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    }
  }, [showResult]);

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
    navigation.navigate('QuizScreen');
  };
  const navigateToNextLevel = () => {
    // This function should navigate to the next level
    // You'll need to implement the logic to find the next quiz
    // For now, we'll just go back to the QuizLaunchScreen
    navigation.navigate('QuizScreen');
  };

  const ProgressBar = ({progress}) => {
    return (
      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBar, {width: `${progress}%`}]} />
      </View>
    );
  };

  if (showResult) {
    const scorePercentage = (score / quiz.questions.length) * 100;
    return (
      <LayoutImage blur={40}>
        <View style={styles.resultContainer}>
          <Animated.View
            style={[
              styles.resultCard,
              {
                opacity: resultAnimation,
                transform: [
                  {
                    translateY: resultAnimation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [50, 0],
                    }),
                  },
                ],
              },
            ]}>
            <LinearGradient
              colors={['rgba(76, 102, 159, 0.9)', 'rgba(25, 47, 106, 0.9)']}
              style={styles.resultGradient}>
              {/* <Icon name="trophy" size={50} color="gold" style={styles.resultIcon} /> */}
              <Text style={styles.resultTitle}>Quiz Completed!</Text>
              <Text style={styles.resultScore}>
                Your Score: {score}/{quiz.questions.length}
              </Text>
              <View style={styles.resultBar}>
                <View
                  style={[styles.resultBarFill, {width: `${scorePercentage}%`}]}
                />
              </View>
              <Text style={styles.resultPercentage}>
                {scorePercentage.toFixed(0)}%
              </Text>
              <TouchableOpacity
                style={styles.resultButton}
                onPress={restartQuiz}>
                <Text style={styles.resultButtonText}>Restart Quiz</Text>
              </TouchableOpacity>
              {/* <TouchableOpacity
                style={styles.resultButton}
                onPress={navigateToHome}>
                <Text style={styles.resultButtonText}>Back to Home</Text>
              </TouchableOpacity> */}
              {nextLevelUnlocked ? (
                <TouchableOpacity
                  style={styles.resultButton}
                  onPress={navigateToNextLevel}>
                  <Text style={styles.resultButtonText}>Unlock Next Level</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={styles.resultButton}
                  onPress={navigateToHome}>
                  <Text style={styles.resultButtonText}>Back to Home</Text>
                </TouchableOpacity>
              )}
            </LinearGradient>
          </Animated.View>
        </View>
      </LayoutImage>
    );
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / quiz.questions.length) * 100;

  return (
    <LayoutImage blur={40}>
      <ScrollView style={styles.container}>
        <ProgressBar progress={progress} />
        <View style={styles.progressTextContainer}>
          <LinearGradient
            colors={['rgba(76, 102, 159, 0.7)', 'rgba(25, 47, 106, 0.8)']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={styles.progressTextGradient}>
            <Text style={styles.progressText}>
              Question {currentQuestionIndex + 1} of {quiz.questions.length}
            </Text>
          </LinearGradient>
        </View>
        <View style={styles.questionContainer}>
          <Text style={styles.questionText}>{currentQuestion.question}</Text>
        </View>
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
        <IconReturn />
      </ScrollView>
    </LayoutImage>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    padding: 20,
    marginTop: 40,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    borderRadius: 12,
    height: '100%',
  },
  progressBarContainer: {
    height: 25,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
    marginBottom: 20,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#4c679f',
    borderRadius: 12,
  },
  progressTextContainer: {
    marginBottom: 20,
  },
  progressTextGradient: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  progressText: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
  },
  questionContainer: {
    height: 180,
    alignContent: 'center',
    alignItems: 'center',
  },
  questionText: {
    fontSize: 30,
    color: 'white',
    marginBottom: 30,
    textAlign: 'center',
  },
  optionButton: {
    marginBottom: 25,
    borderRadius: 25,
    overflow: 'hidden',
  },
  optionGradient: {
    padding: 20,
    alignItems: 'center',
  },
  optionText: {
    fontSize: 22,
    color: 'white',
    textAlign: 'center',
    fontWeight: '600',
    letterSpacing: 1,
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
  resultContainer: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    height: '100%',
  },
  resultCard: {
    width: '100%',
    maxWidth: 350,
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 5,
  },
  resultGradient: {
    padding: 30,
    alignItems: 'center',
  },
  resultIcon: {
    marginBottom: 20,
  },
  resultTitle: {
    fontSize: 28,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  resultScore: {
    fontSize: 22,
    color: 'white',
    marginBottom: 20,
    textAlign: 'center',
  },
  resultBar: {
    width: '100%',
    height: 10,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 5,
    marginBottom: 10,
  },
  resultBarFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 5,
  },
  resultPercentage: {
    fontSize: 18,
    color: 'white',
    marginBottom: 30,
  },
  resultButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginBottom: 15,
    width: '100%',
  },
  resultButtonText: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default QuizGameScreen;
