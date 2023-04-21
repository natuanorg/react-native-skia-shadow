/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {Canvas, Group, Shadow, Text, useFont} from '@shopify/react-native-skia';
import React, {useCallback, useState} from 'react';
import {
  Button,
  SafeAreaView,
  StyleSheet,
  View,
  useWindowDimensions,
} from 'react-native';
import shuffle from 'lodash/shuffle';

const DATA = [
  {
    id: 'moontime',
    source: require('./fonts/MoonTime.otf'),
    color: 'rgb(255,251,230)',
    filter: [
      {
        dx: 0,
        dy: 0,
        blur: 1,
        color: 'rgba(255, 217, 5, 0.95)',
      },
      {
        dx: 0,
        dy: 0,
        blur: 5,
        color: 'rgba(255, 222, 34, 0.75)',
      },
      {
        dx: 0,
        dy: 0,
        blur: 10,
        color: 'rgba(255, 222, 34, 0.44)',
      },
    ],
  },
  {
    id: 'nickainley_normal',
    source: require('./fonts/Nickainley-Normal.otf'),
    color: 'rgb(255,176,239)',
    filter: [
      {
        dx: 0,
        dy: 0,
        blur: 3,
        color: 'rgba(255, 0, 202, 0.95)',
      },
      {
        dx: 0,
        dy: 0,
        blur: 6,
        color: 'rgba(255, 20, 206, 0.75)',
      },
      {
        dx: 0,
        dy: 0,
        blur: 18,
        color: 'rgba(255, 20, 206, 0.44)',
      },
    ],
  },
];

const FONT_SIZE = 30;

const TextShadow = ({textFont, label, index}) => {
  const {width: screenWidth} = useWindowDimensions();
  const font = useFont(textFont.source, FONT_SIZE);
  const textWidth = font?.getTextWidth(label) || 0;

  if (!font) {
    return null;
  }

  return (
    <Group
      transform={[
        {
          translateY: index * FONT_SIZE,
          translateX: (screenWidth - textWidth * 1.3) / 2,
        },
      ]}>
      <Text text={label} font={font} color={textFont.color} x={0} y={FONT_SIZE}>
        {textFont.filter?.map((item, index) => {
          return (
            <Shadow
              key={`shadow-${item.id}-${index}`}
              dx={item.dx}
              dy={item.dx}
              blur={item.blur}
              color={item.color}
            />
          );
        })}
      </Text>
    </Group>
  );
};

function App(): JSX.Element {
  const [textFonts, setTextFonts] = useState(DATA);

  const onShuffle = useCallback(() => {
    const result = shuffle(DATA);
    console.log(result.map(({id}) => id));
    setTextFonts(result);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={{flexGrow: 1}}>
        <Canvas style={{flex: 1}}>
          {textFonts.map((textFont, index) => {
            return (
              <TextShadow
                key={`text-shadow-${textFont.id}`}
                textFont={textFont}
                label={'React Native Skia'}
                index={index}
              />
            );
          })}
        </Canvas>
      </View>
      <View style={{paddingVertical: 24}}>
        <Button title="Shuffle" onPress={onShuffle} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
});

export default App;
