import { outlined, soft, link, normal } from './pill-styles';

const getStyle = ({ variant, theme, color }) => {
  switch (variant) {
    case 'outlined':
      return outlined(theme, color);
    case 'soft':
      return soft(theme, color);
    case 'link':
      return link(theme, color);
    default:
      return normal(theme, color);
  }
};

const getPadding = size => {
  switch (size) {
    case 'small':
      return '3.5px 5.5px';
    case 'large':
      return '12px 16px';
    default:
      return '8px 10px';
  }
};

const getFontSize = size => {
  switch (size) {
    case 'small':
      return '0.7rem';
    case 'large':
      return '1rem';
    default:
      return '0.85rem';
  }
};

export { getStyle, getPadding, getFontSize };
