let idCounter = 0;

export const generateId = (prefix: string = 'dyn-id'): string => {
  idCounter += 1;
  return `${prefix}-${idCounter}`;
};
