const getWidth = size => {
  switch (size) {
    case 'small':
      return '400px';
    case 'large':
      return '800px';
    default:
      return '600px';
  }
};

export default getWidth;
