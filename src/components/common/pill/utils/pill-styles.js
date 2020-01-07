const outlined = (theme, color) => `
  border: 1px solid ${theme.colors[color]};
  color: ${theme.colors[color]};
  background-color: transparent;
`;

const soft = (theme, color) => `
  background: ${theme.softColors[color]};
  color: ${theme.colors[color]};
`;

const link = (theme, color) => `
  background: transparent;
  padding: 0;
  color: ${theme.colors[color]};
`;

const normal = (theme, color) => `
  background: ${theme.colors[color]};
  color: ${theme.colors.lighter};
`;

export { outlined, soft, link, normal };
