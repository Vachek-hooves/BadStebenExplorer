import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import LayoutImage from '../components/Layout/LayoutImage';
import {useAppContext} from '../store/context';
import {useRoute, useNavigation} from '@react-navigation/native';
import {COLOR} from '../const/customColors';

const {height} = Dimensions.get('screen');

const TFGameScreen = () => {
  const {trueFalseData} = useAppContext();
  const route = useRoute();
  const navigation = useNavigation();
  const {topicId} = route.params;

  const [currentTopic, setCurrentTopic] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);

  useEffect(() => {
    const selectedTopic = trueFalseData.find(topic => topic.id === topicId);
    setCurrentTopic(selectedTopic);
  }, [topicId, trueFalseData]);

  const handleAnswer = isTrue => {
    const currentQuestion = currentTopic.statements[currentQuestionIndex];
    const correct = currentQuestion.isTrue === isTrue;
    setSelectedAnswer(isTrue);
    setIsCorrect(correct);

    if (correct) {
      setScore(score + 1);
      setAnsweredQuestions([...answeredQuestions, currentQuestion]);
    }

    setTimeout(() => {
      if (currentQuestionIndex < currentTopic.statements.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer(null);
        setIsCorrect(null);
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
    setAnsweredQuestions([]);
  };

  const goToLaunchScreen = () => {
    navigation.navigate('TFLaunchScreen');
  };

  if (!currentTopic) return null;

  const currentQuestion = currentTopic.statements[currentQuestionIndex];

  return (
    <LayoutImage blur={40}>
      <ScrollView style={styles.container}>
        {!showResult ? (
          <>
            <View style={styles.currentQuestionContainer}>
              <Image source={{uri: currentTopic.image}} style={styles.image} />
              <Text style={styles.topic}>{currentTopic.topic}</Text>
              <Text style={styles.question}>{currentQuestion.statement}</Text>
              <View style={styles.buttonContainer}>
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
              <Text style={styles.progress}>
                {currentQuestionIndex + 1} / {currentTopic.statements.length}
              </Text>
            </View>
            {answeredQuestions.length > 0 && (
              <View style={styles.answeredQuestionsContainer}>
                <Text style={styles.answeredQuestionsTitle}>
                  Correctly Answered Questions:
                </Text>
                {answeredQuestions.map((question, index) => (
                  <Text key={index} style={styles.answeredQuestion}>
                    {question.statement}
                  </Text>
                ))}
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
      </ScrollView>
    </LayoutImage>
  );
};

export default TFGameScreen;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    borderRadius: 16,
    // height: height,
  },
  currentQuestionContainer: {
    padding: 20,
    // backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 10,
    marginBottom: 20,
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
    justifyContent: 'space-around',
    width: '100%',
  },
  button: {
    padding: 15,
    borderRadius: 10,
    width: '40%',
    borderWidth: 2,
    borderColor: COLOR.white,
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
    marginTop: 10,
    fontSize: 16,
    color: COLOR.white,
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
