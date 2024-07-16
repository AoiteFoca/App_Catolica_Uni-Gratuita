import React from 'react';
import { TouchableOpacity, StyleSheet, Text, ViewStyle } from 'react-native';

interface BooleanButtonProps {
  value: boolean;
  onPress: (value: boolean) => void;
  style?: ViewStyle;
}

const BooleanButton: React.FC<BooleanButtonProps> = ({ value, onPress, style }) => {
  return (
    <TouchableOpacity style={[styles.container, style]}>
      <TouchableOpacity
        style={[styles.button, value ? styles.selected : {}]}
        onPress={() => onPress(true)}
      >
        <Text style={[styles.buttonText, value ? styles.selectedText : {}]}>Sim</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, !value ? styles.selected : {}]}
        onPress={() => onPress(false)}
      >
        <Text style={[styles.buttonText, !value ? styles.selectedText : {}]}>Não</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  selected: {
    backgroundColor: '#800000',
  },
  buttonText: {
    fontSize: 16,
    color: '#000',
  },
  selectedText: {
    color: '#fff',
  },
});

export default BooleanButton;
