import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import CustomSafeAreaView from '../../components/Layouts/CustomSafeAreaView';
import { MainButton, ScoreBoard } from '../../components';
import { Colors, Spacing } from '../../styles';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../app/App';

// 이미지 imports - src/assets 폴더 사용
const blueCandy = require('../../assets/images/blue-candy.png');
const greenCandy = require('../../assets/images/green-candy.png');
const orangeCandy = require('../../assets/images/orange-candy.png');
const purpleCandy = require('../../assets/images/purple-candy.png');
const redCandy = require('../../assets/images/red-candy.png');
const yellowCandy = require('../../assets/images/yellow-candy.png');
const blank = require('../../assets/images/blank.png');

const width = 8;
const candyColors = [
    blueCandy,
    orangeCandy,
    purpleCandy,
    redCandy,
    yellowCandy,
    greenCandy
];

type TestPageProps = NativeStackScreenProps<RootStackParamList, 'TestPage'>;

export const TestPage = ({ navigation }: TestPageProps) => {
    const [currentColorArrangement, setCurrentColorArrangement] = useState<any[]>([]);
    const [selectedSquare, setSelectedSquare] = useState<number | null>(null);
    const [scoreDisplay, setScoreDisplay] = useState(0);

    const checkForColumnOfFour = () => {
        for (let i = 0; i <= 39; i++) {
            const columnOfFour = [i, i + width, i + width * 2, i + width * 3];
            const decidedColor = currentColorArrangement[i];
            const isBlank = currentColorArrangement[i] === blank;

            if (columnOfFour.every(square => currentColorArrangement[square] === decidedColor && !isBlank)) {
                setScoreDisplay((score) => score + 4);
                columnOfFour.forEach(square => currentColorArrangement[square] = blank);
                return true;
            }
        }
        return false;
    };

    const checkForRowOfFour = () => {
        for (let i = 0; i < 64; i++) {
            const rowOfFour = [i, i + 1, i + 2, i + 3];
            const decidedColor = currentColorArrangement[i];
            const notValid = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55, 62, 63, 64];
            const isBlank = currentColorArrangement[i] === blank;

            if (notValid.includes(i)) continue;

            if (rowOfFour.every(square => currentColorArrangement[square] === decidedColor && !isBlank)) {
                setScoreDisplay((score) => score + 4);
                rowOfFour.forEach(square => currentColorArrangement[square] = blank);
                return true;
            }
        }
        return false;
    };

    const checkForColumnOfThree = () => {
        for (let i = 0; i <= 47; i++) {
            const columnOfThree = [i, i + width, i + width * 2];
            const decidedColor = currentColorArrangement[i];
            const isBlank = currentColorArrangement[i] === blank;

            if (columnOfThree.every(square => currentColorArrangement[square] === decidedColor && !isBlank)) {
                setScoreDisplay((score) => score + 3);
                columnOfThree.forEach(square => currentColorArrangement[square] = blank);
                return true;
            }
        }
        return false;
    };

    const checkForRowOfThree = () => {
        for (let i = 0; i < 64; i++) {
            const rowOfThree = [i, i + 1, i + 2];
            const decidedColor = currentColorArrangement[i];
            const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 63, 64];
            const isBlank = currentColorArrangement[i] === blank;

            if (notValid.includes(i)) continue;

            if (rowOfThree.every(square => currentColorArrangement[square] === decidedColor && !isBlank)) {
                setScoreDisplay((score) => score + 3);
                rowOfThree.forEach(square => currentColorArrangement[square] = blank);
                return true;
            }
        }
        return false;
    };

    const moveIntoSquareBelow = () => {
        for (let i = 0; i <= 55; i++) {
            const firstRow = [0, 1, 2, 3, 4, 5, 6, 7];
            const isFirstRow = firstRow.includes(i);

            if (isFirstRow && currentColorArrangement[i] === blank) {
                let randomNumber = Math.floor(Math.random() * candyColors.length);
                currentColorArrangement[i] = candyColors[randomNumber];
            }

            if ((currentColorArrangement[i + width]) === blank) {
                currentColorArrangement[i + width] = currentColorArrangement[i];
                currentColorArrangement[i] = blank;
            }
        }
    };

    const handleSquarePress = (index: number) => {
        if (selectedSquare === null) {
            setSelectedSquare(index);
        } else {
            const validMoves = [
                selectedSquare - 1,
                selectedSquare - width,
                selectedSquare + 1,
                selectedSquare + width
            ];

            const validMove = validMoves.includes(index);

            if (validMove) {
                // Swap candies
                const newArrangement = [...currentColorArrangement];
                const temp = newArrangement[selectedSquare];
                newArrangement[selectedSquare] = newArrangement[index];
                newArrangement[index] = temp;
                setCurrentColorArrangement(newArrangement);

                // Check for matches
                setTimeout(() => {
                    const isAColumnOfFour = checkForColumnOfFour();
                    const isARowOfFour = checkForRowOfFour();
                    const isAColumnOfThree = checkForColumnOfThree();
                    const isARowOfThree = checkForRowOfThree();

                    if (!(isARowOfThree || isARowOfFour || isAColumnOfFour || isAColumnOfThree)) {
                        // Revert swap if no match
                        const revertArrangement = [...currentColorArrangement];
                        const tempRevert = revertArrangement[selectedSquare];
                        revertArrangement[selectedSquare] = revertArrangement[index];
                        revertArrangement[index] = tempRevert;
                        setCurrentColorArrangement(revertArrangement);
                    }
                }, 100);
            }
            setSelectedSquare(null);
        }
    };

    const createBoard = () => {
        const randomColorArrangement = [];
        for (let i = 0; i < width * width; i++) {
            const randomColor = candyColors[Math.floor(Math.random() * candyColors.length)];
            randomColorArrangement.push(randomColor);
        }
        setCurrentColorArrangement(randomColorArrangement);
    };

    useEffect(() => {
        createBoard();
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            checkForColumnOfFour();
            checkForRowOfFour();
            checkForColumnOfThree();
            checkForRowOfThree();
            moveIntoSquareBelow();
            setCurrentColorArrangement([...currentColorArrangement]);
        }, 100);
        return () => clearInterval(timer);
    }, [currentColorArrangement]);

  return (
    <CustomSafeAreaView>
      <View style={styles.container}>
                <Text style={styles.title}>캔디 크러쉬</Text>
                <ScoreBoard score={scoreDisplay} />
                <View style={styles.gameBoard}>
                    {currentColorArrangement.map((candyColor, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[
                                styles.candySquare,
                                selectedSquare === index && styles.selectedSquare
                            ]}
                            onPress={() => handleSquarePress(index)}
                        >
                            <Image
                                source={candyColor}
                                style={styles.candyImage}
                                resizeMode="contain"
                            />
                        </TouchableOpacity>
                    ))}
                </View>
        <MainButton
          label="뒤로 가기"
          callback={() => navigation.goBack()}
        />
      </View>
    </CustomSafeAreaView>
  );
};

const { width: screenWidth } = Dimensions.get('window');
const boardSize = screenWidth - 40; // 좌우 마진 20씩
const squareSize = boardSize / 8;

const styles = StyleSheet.create({
  container: {
    flex: 1,
        padding: Spacing.m || 20,
        alignItems: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: Colors.primary || '#FF6B6B',
        marginBottom: Spacing.m || 16,
        textAlign: 'center',
    },
    gameBoard: {
        width: boardSize,
        height: boardSize,
        flexDirection: 'row',
        flexWrap: 'wrap',
        backgroundColor: '#F0F0F0',
        borderRadius: 10,
        padding: 2,
        marginVertical: Spacing.m || 16,
    },
    candySquare: {
        width: squareSize - 2,
        height: squareSize - 2,
        margin: 1,
        backgroundColor: 'white',
        borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
    },
    selectedSquare: {
        backgroundColor: '#FFE066',
        borderWidth: 2,
        borderColor: '#FFD700',
    },
    candyImage: {
        width: squareSize - 8,
        height: squareSize - 8,
    },
});

