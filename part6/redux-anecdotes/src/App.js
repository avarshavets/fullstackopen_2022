import AnecdoteForm from "./components/AnecdoteForm";
import AnecdoteList from "./components/AnecdoteList";
import Notification from "./components/Notification";
import FilterForm from "./components/FilterForm";

const App = () => {
    return (
        <div>
            <h2>Anecdotes</h2>
            <Notification/>
            <FilterForm/>
            <AnecdoteList/>
            <AnecdoteForm/>
        </div>
  )
}

export default App