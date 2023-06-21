import { useRef, useState } from "react"

interface Todo {
  id: number,
  title: string,
  checked: boolean
}

function App() {

  const inputRef = useRef<HTMLInputElement>(null)
  const [status, setStatus] = useState('All')
  const [todos, setTodos] = useState<Todo[]>([])

  const onTabChange = (value: string) => {
    setStatus(value)
  }

  const onAdd = () => {
    const value = inputRef?.current?.value
    if (value && value?.trim() !== '') {
      setTodos(prev => [...prev, { id: prev.length > 0 ? Math.max(...prev.map(todo => todo.id)) + 1 : 0, title: value, checked: false }])
      if (inputRef.current) {
        inputRef.current.value = '';
      }
    }
  }

  const onToggle = (id: number) => {
    setTodos(prev => prev.map(todo => {
      if (todo.id === id)
        return { ...todo, checked: !todo.checked }
      return todo
    }))
  }

  const onRemove = (id: number) => {
    setTodos(prev => prev.filter(todo => todo.id !== id))
  }

  const onDeleteCompleted = () => {
    setTodos(prev => prev.filter(todo => !todo.checked))
  }

  let filteredTodos = [...todos]
  if (status === 'Active')
    filteredTodos = todos.filter(todo => todo.checked === false)
  else if (status === 'Completed')
    filteredTodos = todos.filter(todo => todo.checked === true)


  return (
    <main>
      <h1>#todo</h1>
      <div>
        <div className="tabs">
          <div onClick={() => onTabChange('All')} className={`${status === 'All' ? 'clicked' : ''}`}>All</div>
          <div onClick={() => onTabChange('Active')} className={`${status === 'Active' ? 'clicked' : ''}`}>Active</div>
          <div onClick={() => onTabChange('Completed')} className={`${status === 'Completed' ? 'clicked' : ''}`}>Completed</div>
        </div>
        {status !== 'Completed' &&
          <div className="form">
            <input placeholder="add details" ref={inputRef} />
            <button onClick={onAdd}>Add</button>
          </div>
        }
        <div className="todos">
          {filteredTodos.map(todo => {
            return (
              <div className={`todo`}>
                <div className="todo-text" onClick={() => onToggle(todo.id)}>
                  {todo.checked ? <div className="checked">&#x2713;</div> : <div className="unchecked"></div>}
                  <div className={`${todo.checked ? 'strikethrough' : ''}`}>
                    {todo.title}
                  </div>
                </div>
                {status === 'Completed' &&
                  <span onClick={() => onRemove(todo.id)}>&#128465;</span>
                }
              </div>
            )
          })}
        </div>
        {status === 'Completed' && filteredTodos.length > 0 &&
          <div className="delete-wrapper">
            <button className="btn-delete" onClick={onDeleteCompleted}>Delete all</button>
          </div>
        }
      </div>
    </main>
  )
}

export default App
