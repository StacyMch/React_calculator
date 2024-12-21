import React from 'react';
import styles from './app.module.css';
import { useState } from 'react';

export const App = () => {
	const [operand1, setOperand1] = useState('');

	const [operator, setOperator] = useState('');

	const [operand2, setOperand2] = useState('');

	const [result, setResult] = useState('');

	const clickOnNumber = (num) => {
		console.log(result);

		if (operator) {
			setOperand2((prev) => prev + num);
		} else {
			setOperand1((prev) => prev + num);
		}
	};

	const plus = () => {
		setOperator('+');
		setResult(''); //для возвращения к обычному цвету
	};

	const minus = () => {
		setOperator('-');
		setResult(''); //для возвращения к обычному цвету
	};

	const equals = () => {
		if (operator === '+') {
			let updatedResult = +operand1 + (+operand2 > 0 ? +operand2 : '');
			setResult(updatedResult);
			setOperand1(updatedResult); //обновляем операнд1, чтобы можно было продолжить вычисления
		} else if (operator === '-') {
			let updatedResult = +operand1 - (+operand2 > 0 ? +operand2 : '');
			setResult(updatedResult);
			setOperand1(updatedResult); //обновляем операнд1, чтобы можно было продолжить вычисления
		}
		setOperator('');
		setOperand2('');
	};

	const erase = () => {
		setOperand1('');
		setOperator('');
		setOperand2('');
		setResult('');
	};

	const data = {
		nums: [
			{ number: 0, key: 0 },
			{ number: 1, key: 1 },
			{ number: 2, key: 2 },
			{ number: 3, key: 3 },
			{ number: 4, key: 4 },
			{ number: 5, key: 5 },
			{ number: 6, key: 6 },
			{ number: 7, key: 7 },
			{ number: 8, key: 8 },
			{ number: 9, key: 9 },
		],
		operators: [
			{ operator: '+', key: 10, func: plus },
			{ operator: '-', key: 11, func: minus },
			{ operator: '=', key: 12, func: equals },
			{ operator: 'C', key: 13, func: erase },
		],
	};

	return (
		<div className={styles.app}>
			<div className={styles.container}>
				<h1 className={styles.title}>Калькулятор</h1>
				<input
					type="text"
					className={`${styles.input} ${result !== '' ? styles.result : ''}`}
					value={
						((result !== 0 ? result : '') || operand1) +
						`${operator}${operand2}`
					}
					readOnly
				/>
				<div className={styles.numbers}>
					{data.nums.map(({ key, number }) => (
						<button
							key={key}
							className={styles.number}
							onClick={() => clickOnNumber(number.toString())}
						>
							{number}
						</button>
					))}
				</div>

				<div className={styles['d-flex']}>
					{data.operators.map(({ key, operator, func }) => (
						<button
							key={key}
							className={styles.buttonOperator}
							onClick={func}
						>
							{operator}
						</button>
					))}
				</div>
			</div>
		</div>
	);
};
