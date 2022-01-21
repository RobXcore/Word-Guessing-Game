import { React, useEffect, useState, useMemo } from 'react';
import '../stylesheets/data.css';

function Data() {
	const [sentence, setSentence] = useState('');
	const [letterScore, setLetterScore] = useState(0);
	const [sentenceId, setSentenceId] = useState(1);
	const [ score, setScore ] = useState(0);

	const getData = async () => {
		const response = await fetch(`https://api.hatchways.io/assessment/sentences/${sentenceId}`);
		const { data } = await response.json();
		setSentence(data.sentence);
	};

	useEffect(() => {
		getData();
	});

	const checkCorrect = (e) => {
		if(e.target.value === e.target.placeholder || e.target.value === ' ' ){
			e.target.style.background = 'green'
			setLetterScore(prevState => prevState + 1);
			if(letterScore === sentence.length ){
				setScore(prevState => prevState + 1)
				setSentenceId(prevState => prevState + 1)
				setLetterScore(prevState => prevState * 0)
				const inputs = Array.from(document.getElementsByTagName('input'));
				inputs[0].focus();
				inputs.forEach((input) =>{
					input.value = '';
					input.style.background = '#e1e1e1'
				})
				

			}
		}else{
			e.target.style.background = 'red'
		}
	}
	console.log(letterScore)

	const scramble = (sentence) => {
		const splitAndScramble = sentence.split(" ").map((word) => {
			const first = word.substring(-1, 1);
			const last = word.substr(-1);
			if (word.length <= 2) {
				return word;
			} else {
				return first + word.substring(1, word.length - 1).split("").sort(() => Math.random() - .5).join("") + last;
			}
		});
		const finalSentence = splitAndScramble.join(" ");
		return finalSentence;
	}
	console.log(sentence.length)
	const scramble1 = useMemo(() => scramble(sentence), [sentence])


	return (<>
		<div className='text-container'>
			<h1>{scramble1}</h1>
			<h3>Guess the sentence! Starting typing</h3>
			<h2>The yellow blocks are meant for spaces</h2>
			<p>Score : {score}</p>
			<div className='word-panel' >
			{sentence.split(" ").map((word, index) => 
				<div key={index} className='word'>
					{word.split("").map((letter, index) =>
						<input onChange={checkCorrect} maxLength={1} key={index} placeholder={letter}>
						
						</input>
					)}
					{<input onChange={checkCorrect} maxLength={1}  >
					
					
					</input>}
					
				</div>
			) }
		</div>
		</div>



	</>

	);
}

export default Data;
