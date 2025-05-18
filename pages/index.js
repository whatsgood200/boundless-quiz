/* FILE STRUCTURE:
- /pages/index.js (this file)
- /data/boundless_quiz.json (quiz questions)
- /public/boundless.jpg (logo image)
- /styles/globals.css (Tailwind CSS imports)
*/

import { useState } from 'react';
import Image from 'next/image';
import quizData from '../data/boundless_quiz.json';

export default function Home() {
  const [responses, setResponses] = useState(Array(quizData.length).fill(null));
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const handleChange = (index, value) => {
    const updated = [...responses];
    updated[index] = value;
    setResponses(updated);
  };

  const handleSubmit = () => {
    let s = 0;
    quizData.forEach((q, i) => {
      const correct = q.options.find(opt => opt.toLowerCase().startsWith(q.answer.toLowerCase()));
      if (responses[i] === correct) s++;
    });
    setScore(s);
    setSubmitted(true);
  };

  const handleReset = () => {
    setResponses(Array(quizData.length).fill(null));
    setSubmitted(false);
    setScore(0);
  };

  return (
    <div className="bg-white text-black min-h-screen p-4">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-4">
            <Image src="/boundless.jpg" alt="Boundless Logo" width={50} height={50} />
            <h1 className="text-2xl font-bold">Boundless Protocol Quiz🍓</h1>
          </div>
        </div>

        {quizData.map((q, i) => (
          <div key={i} className="mb-6">
            <h3 className="font-semibold">{i + 1}. {q.question}</h3>
            <div className="mt-2 space-y-2">
              {q.options.map((opt, j) => (
                <label key={j} className="block">
                  <input
                    type="radio"
                    name={`question-${i}`}
                    value={opt}
                    disabled={submitted}
                    checked={responses[i] === opt}
                    onChange={() => handleChange(i, opt)}
                    className="mr-2"
                  />
                  {opt}
                </label>
              ))}
            </div>
          </div>
        ))}

        {!submitted ? (
          <button
            onClick={handleSubmit}
            disabled={responses.includes(null)}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            Submit Quiz
          </button>
        ) : (
          <div className="mt-6 space-y-4">
            <h2 className="text-xl font-bold">You scored {score} out of {quizData.length}!</h2>
            <button
              onClick={handleReset}
              className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
            >
              Retake Quiz
            </button>

            <details className="mt-4">
              <summary className="cursor-pointer font-semibold">See Correct Answers</summary>
              <ul className="mt-2 space-y-2 list-disc list-inside">
                {quizData.map((q, i) => {
                  const correct = q.options.find(opt => opt.toLowerCase().startsWith(q.answer.toLowerCase()));
                  return <li key={i}><strong>Q{i + 1}:</strong> {q.question} - <em>{correct}</em></li>;
                })}
              </ul>
            </details>
          </div>
        )}
      </div>
    </div>
  );
}
