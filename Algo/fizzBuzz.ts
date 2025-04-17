/**
 * Interface to define a FizzBuzz rule
 */
interface FizzBuzzRule {
  divisor: number;
  output: string;
}

/**
 * FizzBuzz algorithm configuration
 * Allows easy addition of new rules
 */
const DEFAULT_RULES: FizzBuzzRule[] = [
  { divisor: 3, output: 'Fizz' },
  { divisor: 5, output: 'Buzz' }
];

/**
 * Generates the FizzBuzz sequence from 1 to n
 * @param n - Upper limit of the sequence
 * @param rules - Rules to apply (optional)
 * @returns Results of the FizzBuzz sequence
 */
const generateFizzBuzz = (n: number, rules: FizzBuzzRule[] = DEFAULT_RULES): (string | number)[] => {
  if (!Number.isInteger(n) || n <= 0) {
    throw new Error('Parameter n must be a positive integer');
  }

  return Array.from({ length: n }, (_, index) => {
    const number = index + 1;
    
    const result = rules
      .filter(rule => number % rule.divisor === 0)
      .map(rule => rule.output)
      .join('');
    
    return result || number;
  });
};

/**
 * Displays the FizzBuzz sequence
 * @param n - Upper limit of the sequence
 */
const displayFizzBuzz = (n: number): void => {
  const results = generateFizzBuzz(n);
  results.forEach(result => console.log(result));
};

// Example usage with n = 100
displayFizzBuzz(100);

// Export for use in other modules
export { generateFizzBuzz, displayFizzBuzz, FizzBuzzRule };