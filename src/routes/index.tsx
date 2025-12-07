import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: App })

function App() {

  return (
    <div className="min-h-screen via-slate-800 to-slate-900">

      <section className="relative py-20 px-6 text-center overflow-hidden">

        <h1>Welcome to the AI Persona App</h1>

        <h3>Click begin to start the quiz</h3>

        <a href="/Questions/">Begin</a>
       
      </section>
  
    </div>
  )
}
