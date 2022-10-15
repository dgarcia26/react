import React,{useEffect} from 'react'


const PeticionesApi = () => {


    const [personajes, setPersonajes] = React.useState([])

    let limite = 20;
    let offset = 0;
    let totalItems = 100;
    const itemsPagina = 20;
    let cantPagina = 1;
    let contador = 1;

    useEffect(() => {
        if(contador==1){
            obtenerPersonajes().then(()=>{
                llenarSelect();
            })
            contador = contador + 1;
        }
        
      },[]);
    const obtenerPersonajes = async (offset = 0, limite = 29) => {
        try {

            const res = await fetch(`https://gateway.marvel.com/v1/public/characters?limit=${limite}&offset=${offset}&ts=1&apikey=c35c2fa460990e739d0dbdd3f44b8eda&hash=aa93429adafb6d018a1bf1e9be2c2b8f`);

            const data = await res.json();
            const results = await data.data.results;
            cantPagina = Math.ceil(totalItems / itemsPagina);
            /*let elemento = document.getElementById("selector");
            while (elemento.firstChild) {
                elemento.removeChild(elemento.firstChild);
            }
            llenarSelect();*/
            setPersonajes(results)
        } catch (error) {
            console.log(error);
        }
    };

    const cambiarPagina = async () => {
        let rest = document.getElementById("selector");
        offset = (rest.value * itemsPagina) - itemsPagina + 1;
        limite = rest.value * itemsPagina;
        obtenerPersonajes(offset, limite);
    }

    const llenarSelect = async () => {
        let rest = document.getElementById("selector");
        for (let i = 1; i <= cantPagina; i++) {
            let option = document.createElement("option");
            option.value = i;
            option.text = i;
            rest.appendChild(option);

        }
    }

    return (
        <>
            <h1>PETICIÓN AL API DE MARVEL</h1>
            
            <div class="paginator">
                {
                    <select name="cars" id="selector" onChange={cambiarPagina}>
                    </select>
                }
            </div>

            {
                personajes.map(({ id, name, description, thumbnail }) => (
                    <div class="container">
                        <div class="card" key={id}>
                            <h4 key={id}>{id} - {name}</h4>
                            <div class="card-info">
                                <img class="imagen" src={thumbnail.path + '.' + thumbnail.extension} alt={name} />
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