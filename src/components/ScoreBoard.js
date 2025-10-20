import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Spacing } from '../styles';

const ScoreBoard = ({ score }) => {
  return (
    <View style={styles.scoreBoard}>
      <Text style={styles.scoreText}>{score}!!</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  scoreBoard: {
    backgroundColor: Colors.primary || '#4CAF50',
    padding: Spacing.m || 16,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: Spacing.s || 8,
  },
  scoreText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.white || '#FFFFFF',
  }
});

export default ScoreBoard