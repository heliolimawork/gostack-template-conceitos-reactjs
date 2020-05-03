import React, {useState, useEffect} from "react";
import api  from './services/api'; 

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
        setRepositories(response.data);
    }); 
 } , []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `Repository ${Date.now()}`,
      url: "https://github.com/josepholiveira",
      techs: ["React", "Node.js"]
    });

    setRepositories([... repositories, response.data]);

  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`repositories/${id}`);

    const repoIndex = repositories.findIndex(repo => repo.id == id);
    const newStateRepositories = [... repositories];
    newStateRepositories.splice(repoIndex, 1);

    setRepositories(newStateRepositories);
  }

  return (
    <div>
      <ul data-testid="repository-list">
      
          {
          repositories.map( repo => (
                <li key={repo.id}>
                  {repo.title}
                  <button onClick={() => handleRemoveRepository(repo.id)}>
                  Remover
                  </button>
                </li>
              )
            )
          }
        
        
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
