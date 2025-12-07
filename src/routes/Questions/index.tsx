import { createFileRoute } from '@tanstack/react-router'
import { useForm } from '@tanstack/react-form'
import { useState } from 'react'

import questions from '../../data/questions.json'
import results from '../../data/results.json'

export const Route = createFileRoute('/Questions/')({
    component: RouteComponent,
})

function RouteComponent() {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
    const [showResults, setShowResults] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const currentQuestion = questions?.questions[currentQuestionIndex]
    const form = useForm({
        onSubmit: async () => {},
    })
    const currentFields = form.state.values

    const getAnswersByGroup = questions?.questions.map((q, index) => {
        const currentQuestion = currentFields[`question-${index}`]
        const getQuestionGroup = q.question.options.find((option) => currentQuestion === option.value)
        return getQuestionGroup?.group
    })

    const getHighestGroup = getAnswersByGroup.reduce(
        (acc, group) => {
            if (!acc[group]) {
                acc[group] = 0
            }
            acc[group]++
            return acc
        },
        {} as Record<string, number>,
    )

    const highestGroup = Object.entries(getHighestGroup)?.sort((a, b) => b[1] - a[1])[0][0]
    const result = results.results.find((r) => r.persona === highestGroup)

    const onNextStep = async () => {
        setError(null)

        const currentAnswer = await form.state.values[`question-${currentQuestionIndex}`]

        if (!currentAnswer) {
            setError('Please select an answer before proceeding.')
            return
        }

        setCurrentQuestionIndex(currentQuestionIndex + 1)
    }

    return (
        <div className="height-screen flex items-center max-h-[100vh] bg-black bg-[url(/background-persona.png)] bg-no-repeat bg-cover h-screen">
            <div className="max-w-[700px] m-auto p-[20px] border-solid text-white border-white border-2 rounded-lg align-middle bg-zinc-900">
                <form>
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
                                                    <span key={`option-${index}`} className="mb-5" onClick={() => field.handleChange(option.value)}>
                                                        <input
                                                            type="radio"
                                                            required
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

                                            {error && <em role="alert">{error}</em>}
                                        </fieldset>
                                    </div>
                                )}
                            />

                            {currentQuestionIndex !== 0 && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        setError(null)
                                        setCurrentQuestionIndex(currentQuestionIndex - 1)
                                    }}
                                >
                                    Prev
                                </button>
                            )}

                            {currentQuestionIndex === questions.questions.length - 1 ? (
                                <button type="button" onClick={() => setShowResults(true)}>
                                    Submit
                                </button>
                            ) : (
                                <button type="button" onClick={onNextStep}>
                                    Next
                                </button>
                            )}
                        </span>
                    )}

                    {showResults && (
                        <div>
                            <h3 className="">Your Results</h3>
                            <p>Based on your answers, your are an:</p>
                            <br />
                            <img className="max-w-full w-[300px] m-auto" src={result.image} alt={result.persona} />

                            <a className="my-[12px] inline-flex" href={result.image} download>Download</a>
                        </div>
                    )}
                </form>
            </div>
        </div>
    )
}
