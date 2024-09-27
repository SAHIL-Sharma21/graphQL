import './App.css'
import {gql, useQuery} from '@apollo/client'

const query = gql`
  query GetTodosWithUser{
    getTodos {
      id
      title
      completed
      user {
        id
        name
      }
    }
  }
`

function App() {

  const {data, loading, error} = useQuery(query);

  if (loading){
    <h1>Loading...</h1>
  }

  if(error){
    return <h1>Error:{error.message}</h1>
  }

  return (
    <>  
      <main>
        <div>
          <table>
            <tbody>
              {data?.getTodos?.map((todo) => <tr key={todo.id}>
                <td>{todo.title}</td>
                <td>{todo.user?.name}</td>
              </tr>)}
            </tbody>
          </table>
        </div>
      </main>
    </>
  )
}

export default App
