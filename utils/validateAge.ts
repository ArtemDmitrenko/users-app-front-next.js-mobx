const validateAge = (age: string): boolean => parseInt(age) >= 18 && parseInt(age) <= 100;

export { validateAge };
