//import './App.css'
import { useEffect, useState } from 'react';
import axios from './../node_modules/axios/lib/axios';

function App() {
//  const [count, setCount] = useState(0)
const apiUrl="https://65fb45c214650eb21009c3bf.mockapi.io/users"
const [users, setUsers] = useState([])
const [nom, setNom] = useState('')
const [prenom, setPrenom] = useState('')
const [age, setAge] = useState(0)
const getUsers = () => {
  axios.get(apiUrl).then((response) => {
    setUsers(response.data)
    console.log(response.data)
  }
  )
}
const addUser = () => {
  axios.post(apiUrl, { nom: nom, prenom: prenom, age: age }).then((response) => {
    console.log(response.data)
    getUsers();
    alert("ajouté avec succès")
  }
  )
}
const deleteOneUser = (id) => {
  if(window.confirm("voulez-vous supprimer cet utilisateur?"))
  {
  axios.delete(`${apiUrl}/${id}`).then((response) => {
    console.log(response.data)
    getUsers();
    alert("supprimé avec succès")
  }
  )
}

}



  useEffect(() => { // initialise le composant 
    // componentDidMount
    getUsers()
  }
  , [])




  return (
    <>
      <h2>users management</h2>
      <br></br>

<div className='text-center'>
<button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
Ajouter Utilisateur
</button>
<br></br>
<br></br>
</div>
<div className="modal fade" id="exampleModal"  aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Ajouter Utilisateur</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <div>
  
  <label htmlFor="nom">Nom</label>
  <input type="text" className="form-control" id="nom" placeholder="nom" name='nom' onChange={(e) => setNom(e.target.value)} />
  </div>
      <div>
  
  <label htmlFor="prenom">Prenom</label>
  <input type="text" className="form-control" id="prenom" placeholder="prenom" name='prenom' onChange={(e) => setPrenom(e.target.value)} />
  </div>
      <div>
  
  <label htmlFor="age">Age</label>
  <input type="number" min={18} className="form-control" id="age" placeholder="Age" name='age' onChange={(e) => setAge(e.target.value)} />
  </div>

      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">fermer</button>
        <button type="button" onClick={addUser} className="btn btn-primary">Ajouter</button>
      </div>
    </div>
  </div>
</div>
      <table className='table table-bordered'>
        <thead>
          <tr>
            <th>id</th>
            <th>nom</th>
            <th>prenom</th>
            <th>age</th>
            <th> Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            return (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.nom}</td>
                <td>{user.prenom}</td>
                <td>{user.age}</td>
                <td>
                  <button onClick={()=>deleteOneUser(user.id)} className='btn btn-danger'>supprimer</button>
                  
                </td>
              </tr>
            )
          })}
        </tbody>

      </table>
    </>
  )
}

export default App
