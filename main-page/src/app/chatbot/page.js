"use client"
import React, { useState } from 'react';
import './styles.css';
export default function Page() {
  const [inputText, setInputText] = useState('');
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [clicked, setClicked] = useState(false);

  const handleClkImage = async () => {
    setClicked(true);
  
    try {
      const data = await llmFetch(inputText);
      console.log(data);
  
      if (data.code === 200) {
        setQuestions(prevQuestions => [...prevQuestions, inputText]);
        setAnswers(prevAnswers => [...prevAnswers, data.response]);
      } else {
        console.error('Error:', data.response);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  
    setInputText(''); // Clear the input text
  };

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const llmFetch = async (inputText) => {
    const url = 'https://api.together.xyz/v1/chat/completions';
    const apiKey = "97af5f978e78cc61b035c27ffc04c8985666fb17049b66577b42c8f11c91c7b6";

    try {
      const data = {
        model: 'openchat/openchat-3.5-1210',
        max_tokens: 512,
        top: ['</s>', '[/INST]'],
        temperature: 0.7,
        top_p: 0.7,
        top_k: 50,
        repetition_penalty: 1,
        n: 1,
        messages: [
          {
            role: 'user',
            content: `${inputText}. Give ans in 200 words or less.`,
          },
        ],
      };

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      return {
        response: result.choices[0].message.content,
        code: response.status,
      };
    } catch (error) {
      console.error('Error:', error);
      return {
        response: error.message || 'Internal Server Error',
        code: 500,
      };
    }
  };

  return (
    <>
      <div className="page-main flex flex-col justify-top items-center h-screen">
        <h2 className="page-heading text-4xl font-bold tracking-tight text-white sm:text-6xl">
          Chat Bot
        </h2>
        <div className=" " style={{ margin: '1vh 0px' }}>
          <div className="input-prompt-area">
            <input
              type="text"
              className="dark:bg-gray-800  dark:text-white text-black rounded-md py-2 px-4 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter Text Here..."
              value={inputText}
              onChange={handleInputChange}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleClkImage();
              }}
            />
            <button onClick={handleClkImage}>Generate</button>
          </div>
        </div>

        <div
          className="wrapper mx-10vw white-text overflow-y-scroll"
          style={{
            maxHeight: '60vh',
            margin: '0px 10vw',
          }}
        >
          {clicked && (
            <div>
              {questions.map((question, index) => (
                <div key={index} className="answer-box">
                  <p className="question">{question}</p>
                  <p>{answers[index]}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
