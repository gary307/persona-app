import { createFileRoute, Navigate, useNavigate } from '@tanstack/react-router'

import questions from '../../data/questions.json'
import results from '../../data/results.json'

import { useForm } from '@tanstack/react-form'
import { useState } from 'react'

export const Route = createFileRoute('/Questions/')({
    component: RouteComponent,
})

function RouteComponent() {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
    const [showResults, setShowResults] = useState(false)

    const currentQuestion = questions?.questions[currentQuestionIndex]
    const form = useForm({
        onSubmit: async () => {

        },
    })
    const currentFields = form.state.values;

    const getAnswersByGroup = questions?.questions.map((q, index) => {
        const currentQuestion = currentFields[`question-${index}`];
        const getQuestionGroup = q.question.options.find((option) => currentQuestion === option.value);
        return getQuestionGroup?.group;
    });

    const getHighestGroup = getAnswersByGroup.reduce((acc, group) => {
        if (!acc[group]) {
            acc[group] = 0;
        }
        acc[group]++;
        return acc;
    }, {} as Record<string, number>)

    const highestGroup = Object.entries(getHighestGroup)?.sort((a, b) => b[1] - a[1])[0][0];

const result = results.results.find(r => r.persona === highestGroup);


    return (
        <div className="max-w-[700px] m-auto mt-[100px]">
            <form
                onSubmit={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    form.handleSubmit()
                }}
            >
                {!showResults && (
                    <span>
                        <form.Field
                            name={`question-${currentQuestionIndex}`}
                            children={(field) => (
                                <div className="mb-4 flex flex-col">
                                    <h2>
                                        {currentQuestionIndex + 1} . {currentQuestion.question.title}
                                    </h2>
                                    <fieldset className="flex flex-col">
                                        {currentQuestion.question.options.map((option, index) => {
                                            return (
                                                <span key={`option-${index}`} className="mb-2">
                                                    <input
                                                        type="radio"
                                                        key={index}
                                                        name={`question-${currentQuestionIndex}`}
                                                        value={option.value}
                                                        checked={field.state.value === option.value}
                                                        onChange={() => field.handleChange(option.value)}
                                                    />
                                                    <label htmlFor={option.value}>{option.value}</label>
                                                </span>
                                            )
                                        })}
                                    </fieldset>
                                </div>
                            )}
                        />

                        {currentQuestionIndex !== 0 && (
                            <button
                                type="button"
                                onClick={() => setCurrentQuestionIndex(currentQuestionIndex - 1)}
                            >
                                Prev
                            </button>
                        )}

                        {currentQuestionIndex === questions.questions.length - 1 ? (
                            <button type="button" onClick={() => setShowResults(true)}>
                                Submit
                            </button>
                        ) : (
                            <button
                                type="button"
                                onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}
                            >
                                Next
                            </button>
                        )}
                    </span>
                )}

                {showResults && (
                    <div>
                        <h1>Your Results</h1>
                        <p>Based on your answers, your AI persona is:</p>
                        <h2>{result.title}</h2>
                        <p>
                            You have a knack for thinking outside the box and coming up with
                            creative solutions to complex problems. Your innovative mindset drives
                            you to explore new ideas and challenge the status quo.
                        </p>
                    </div>
                )}
            </form>
        </div>
    )
}
