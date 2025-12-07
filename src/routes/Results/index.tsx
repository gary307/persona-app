import { createFileRoute } from '@tanstack/react-router'

import questions from '../../data/questions.json';
import { use } from 'react';
import { useForm } from '@tanstack/react-form';


export const Route = createFileRoute('/Results/')({
    component: RouteComponent,
})

function RouteComponent() {

    // const { search } = window.location;
    // const params = new URLSearchParams(search);
    // const answersParam = params.get('answers');
    // const answers = answersParam ? JSON.parse(answersParam) : {};

   const form = useForm();

   console.log('Answers:', form.state.values);
  

    return (
        <div className='max-w-[700px] m-auto mt-[100px]'>
            <h1>Your Results</h1>
            <p>Based on your answers, your AI persona is:</p>
            <h2>Innovative Thinker</h2>
            <p>
                You have a knack for thinking outside the box and coming up with creative solutions to complex problems. Your innovative mindset drives you to explore new ideas and challenge the status quo.
            </p>
        </div>
    )
}
