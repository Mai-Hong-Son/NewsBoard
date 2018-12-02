import { Dimensions } from 'react-native';

const IPHONE_8_DEVICE_WIDTH = 414;

export default class Scale {
  static getSize(size) {
    if (typeof size !== 'number') {
      throw new Error("Error: Scale.getSize can't parse a non number value");
    }
    
    let fontSize = Dimensions.get('window').width;

    if (Dimensions.get('window').width > Dimensions.get('window').height) {
      fontSize = Dimensions.get('window').height;
    }

    // return (size * fontSize) / IPHONE_8_DEVICE_WIDTH;
    return size;
  }
}
