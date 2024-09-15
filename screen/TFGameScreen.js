import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import LayoutImage from '../components/Layout/LayoutImage';
import {useAppContext} from '../store/context';
import {useRoute, useNavigation} from '@react-navigation/native';
import {COLOR} from '../const/customColors';
import {
  IconCorrect,
  IconReturn,
  IconTabCity,
  IconTotal,
} from '../components/icon';
import {Animated} from 'react-native';
import {useRef} from 'react';
const TFGameScreen = () => {
  const {trueFalseData, updateNextLevelStatus} = useAppContext();
  const route = useRoute();
  const navigation = useNavigation();
  const {topicId} = route.params;

  const [currentTopic, setCurrentTopic] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [lastAnsweredQuestion, setLastAnsweredQuestion] = useState(null);

  const trueButtonScale = useRef(new Animated.Value(1)).current;
  const falseButtonScale = useRef(new Animated.Value(1)).current;

  const animateButton = button => {
    Animated.sequence([
      Animated.timing(button, {
        toValue: 0.7,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.spring(button, {
        toValue: 1,
        friction: 3,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();
  };

  useEffect(() => {
    const selectedTopic = trueFalseData.find(topic => topic.id === topicId);
    setCurrentTopic(selectedTopic);
  }, [topicId, trueFalseData]);

  const handleAnswer = isTrue => {
    animateButton(isTrue ? trueButtonScale : falseButtonScale);
    const currentQuestion = currentTopic.statements[currentQuestionIndex];
    const correct = currentQuestion.isTrue === isTrue;
    setSelectedAnswer(isTrue);
    setIsCorrect(correct);

    if (correct) {
      setScore(score + 1);
      setLastAnsweredQuestion(currentQuestion);
    } else {
      setLastAnsweredQuestion(null);
    }

    setTimeout(() => {
      if (currentQuestionIndex < currentTopic.statements.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer(null);
        setIsCorrect(null);
        setLastAnsweredQuestion(null);
      } else {
        setShowResult(true);
      }
    }, 2000);
  };

  const restartLevel = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowResult(false);
    setSelectedAnswer(null);
    setIsCorrect(null);
    setLastAnsweredQuestion(null);
  };

  const goToLaunchScreen = () => {
    if (showResult) {
      updateNextLevelStatus(topicId, score, currentTopic.statements.length);
    }
    navigation.navigate('TFScreen');
  };

  if (!currentTopic) return null;

  const currentQuestion = currentTopic.statements[currentQuestionIndex];

  return (
    <LayoutImage blur={40}>
      <ScrollView style={styles.container}>
        {!showResult ? (
          <>
            <View style={styles.currentQuestionContainer}>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.progress}>
                  <IconCorrect /> {score} /{' '}
                </Text>
                <Text style={styles.progress}>
                  {currentTopic.statements.length} <IconTotal />
                </Text>
              </View>
              <Image source={{uri: currentTopic.image}} style={styles.image} />
              <Text style={styles.topic}>{currentTopic.topic}</Text>
              <Text style={styles.question}>{currentQuestion.statement}</Text>
              <View style={styles.buttonContainer}>
                <Animated.View style={{transform: [{scale: trueButtonScale}]}}>
                  <TouchableOpacity
                    style={[
                      styles.button,
                      styles.trueButton,
                      selectedAnswer !== null &&
                        (currentQuestion.isTrue
                          ? styles.correctAnswer
                          : styles.wrongAnswer),
                    ]}
                    onPress={() => handleAnswer(true)}
                    disabled={selectedAnswer !== null}>
                    <Text style={styles.buttonText}>True</Text>
                  </TouchableOpacity>
                </Animated.View>
                <Animated.View style={{transform: [{scale: falseButtonScale}]}}>
                  <TouchableOpacity
                    style={[
                      styles.button,
                      styles.falseButton,
                      selectedAnswer !== null &&
                        (!currentQuestion.isTrue
                          ? styles.correctAnswer
                          : styles.wrongAnswer),
                    ]}
                    onPress={() => handleAnswer(false)}
                    disabled={selectedAnswer !== null}>
                    <Text style={styles.buttonText}>False</Text>
                  </TouchableOpacity>
                </Animated.View>
              </View>
              <View style={styles.feedbackContainer}>
                {selectedAnswer !== null ? (
                  <Text
                    style={[
                      styles.feedbackText,
                      isCorrect ? styles.correctText : styles.incorrectText,
                    ]}>
                    {isCorrect ? 'Correct!' : 'Incorrect!'} The statement is{' '}
                    {currentQuestion.isTrue ? 'True' : 'False'}.
                  </Text>
                ) : (
                  <Text style={styles.placeholderText}>{'\u00A0'}</Text>
                )}
              </View>
            </View>
            {lastAnsweredQuestion && (
              <View style={styles.answeredQuestionsContainer}>
                <Text style={styles.answeredQuestionsTitle}>
                  Correctly Answered Question:
                </Text>
                <Text style={styles.answeredQuestion}>
                  {lastAnsweredQuestion.statement}
                </Text>
              </View>
            )}
          </>
        ) : (
          <View style={styles.resultContainer}>
            <Text style={styles.resultText}>Game Over!</Text>
            <Text style={styles.scoreText}>
              Your score: {score} / {currentTopic.statements.length}
            </Text>
            <View style={styles.endGameButtonContainer}>
              <TouchableOpacity
                style={styles.endGameButton}
                onPress={restartLevel}>
                <Text style={styles.endGameButtonText}>Restart Level</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.endGameButton}
                onPress={goToLaunchScreen}>
                <Text style={styles.endGameButtonText}>Back to Levels</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        {/* <IconReturn /> */}
      </ScrollView>
    </LayoutImage>
  );
};

export default TFGameScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  currentQuestionContainer: {
    padding: 20,
    // backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 10,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  answeredQuestionsContainer: {
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 10,
    alignItems: 'center',
  },
  answeredQuestionsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLOR.white,
    marginBottom: 10,
  },
  answeredQuestion: {
    fontSize: 16,
    color: COLOR.white,
    marginBottom: 5,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  topic: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLOR.white,
    marginBottom: 20,
    textAlign: 'center',
  },
  question: {
    fontSize: 18,
    color: COLOR.white,
    marginBottom: 30,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
  },
  button: {
    padding: 15,
    borderRadius: 10,
    width: 130,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  trueButton: {
    backgroundColor: COLOR.green,
  },
  falseButton: {
    backgroundColor: COLOR.red,
  },
  buttonText: {
    color: COLOR.white,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  progress: {
    marginVertical: 10,
    fontSize: 22,
    color: COLOR.white,
    fontWeight: '900',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultContainer: {
    alignItems: 'center',
    padding: 20,
  },
  resultText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLOR.white,
    marginBottom: 20,
  },
  scoreText: {
    fontSize: 24,
    color: COLOR.white,
  },
  correctAnswer: {
    backgroundColor: COLOR.green,
    borderColor: COLOR.white,
    borderWidth: 4,
  },
  wrongAnswer: {
    backgroundColor: COLOR.red,
    borderColor: COLOR.white,
    borderWidth: 4,
  },
  feedbackContainer: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  feedbackText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  placeholderText: {
    fontSize: 18,
    opacity: 0,
  },
  correctText: {
    color: COLOR.green,
  },
  incorrectText: {
    color: COLOR.red,
  },
  endGameButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
  },
  endGameButton: {
    backgroundColor: COLOR.blue,
    padding: 15,
    borderRadius: 10,
    width: '45%',
  },
  endGameButtonText: {
    color: COLOR.white,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
