// remove last four characters from a string
export const fileExtentionChangerMp4toMp3 = (str = '') => {
  if (str) {
    return str.slice(0, -4) + '.mp3';
  }
};
