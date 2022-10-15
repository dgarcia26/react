import React from 'react'


const PeticionesApi = () =>{
    

    const [personajes, setPersonajes] = React.useState([])

    const obtenerPersonajes = async (offset=0, limite=29) => {
        try {
          
          const res = await fetch(`https://gateway.marvel.com/v1/public/characters?limit=${limite}&offset=${offset}&ts=1&apikey=c35c2fa460990e739d0dbdd3f44b8eda&hash=aa93429adafb6d018a1bf1e9be2c2b8f`);
          
          const data = await res.json();
          const results = await data.data.results;
          setPersonajes(results)
        } catch (error) {
          console.log(error);
        }
      };

    return (
        <>
            <h1>PETICIÓN AL API DE MARVEL</h1>
            <button onClick={obtenerPersonajes}>Obtener Personajes</button>
            <div class="paginator">
              
              
                    
              
            </div>
        
            {
                personajes.map(({id, name, description, thumbnail})=> (
                    <div  class="container">
                    <div class="card" key = {id}>
                        <h4 key={id}>{id} - {name}</h4>
                        <div class="card-info">
                        <img class="imagen" src = {thumbnail.path+'.'+thumbnail.extension} alt = {name}/>
                        <span>{description}</span>
                        </div>
                    </div>
                    </div>
                ))
                
               
        }
            
            </>
            
      )
}

export default PeticionesApi