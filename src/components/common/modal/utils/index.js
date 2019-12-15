const getWidth = size => {
  switch (size) {
    case 'small':
      return '400px';
    case 'large':
      return '600px';
    default:
      return '500px';
  }
};

export default getWidth;
