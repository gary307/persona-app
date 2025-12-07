import { createFileRoute, useNavigate } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: App })

function App() {

  const navigate = useNavigate({to: '/Questions/'});

  return (
    <div className="height-screen flex items-center max-h-[100vh] bg-black bg-[url(/background-persona.png)] bg-no-repeat bg-cover h-screen">
      <div className="max-w-[700px] m-auto p-[20px] text-white align-middle text-[20px]">
        <h1>What AI Persona Are You?</h1>

        <h3>Take the quiz to find out!</h3>

        <button type="button" onClick={() => navigate({to: '/Questions'})}>
          Begin
        </button>
      </div>
    </div>
  )
}
