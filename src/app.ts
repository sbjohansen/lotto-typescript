import inquirer from 'inquirer';

const chosenNumbers: number[] = [];
const randomNumbers: number[] = [];

const startApp = async (): Promise<void> => {
    do {
        const result = await inquirer.prompt([{
            name: 'number',
            type: 'input',
            message: 'Enter number between 1 and 49',
        }]);
    
        if (validateInput(result.number)) {
            chosenNumbers.push(parseInt(result.number));
        }
    } while (chosenNumbers.length < 6);

    do {
        const number: number = randomNewNumber();
        if (validateRandomNumber(number)) {
            randomNumbers.push(number);
        }
    } while (randomNumbers.length < 6);

    printResult();
};

const validateInput = (input: string): boolean => {
    const number = parseInt(input);
    if (isNaN(number)) {
        console.log('Please enter a number');
        return false;
    }
    if (number < 1 || number > 49) {
        console.log('Please enter a number between 1 and 49');
        return false;
    }
    if (chosenNumbers.includes(number)) {
        console.log('You have already chosen this number');
        return false;
    }
    return true;
};

const randomNewNumber = (): number => {
    return Math.floor(Math.random() * 49) + 1;
};

const validateRandomNumber = (number: number): boolean => {
    if (randomNumbers.includes(number)) {
        return false;
    }
    return true;
};

const countSameNumbers = (): number => {
    let count = 0;
    for (let i = 0; i < randomNumbers.length; i++) {
        if (chosenNumbers.includes(randomNumbers[i])) {
            count++;
        }
    }
    return count;
};

const printResult = (): void => {
    console.log(`You have ${countSameNumbers()} correct numbers`);
};

startApp();