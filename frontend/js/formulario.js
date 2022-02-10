window.onload = () => {
    let PORT = 3031;

    fetch(`http://localhost:${PORT}/api/movies`)
        .then(result => result.json())
        .then(peliculas => {

            const qs = (search) => {
                return document.querySelector(search)
            }

            const title = qs("#title");
            const rating = qs('#rating');
            const awards = qs('#awards');
            const releaseDate = qs('#release_date');
            const length = qs('#length');
            const editar = qs('.editar');
            const crear = qs('.crear');
            const eliminar = qs('.eliminar');

            let pelicula
            let find

            title.addEventListener("input", (e) => {

                pelicula = e.target.value;

                find = peliculas.data.find(peli => peli.title.toLowerCase() === pelicula.toLowerCase())

                if (find !== undefined) {
                    rating.setAttribute('value', find.rating)
                    awards.setAttribute('value', find.awards)
                    length.setAttribute('value', find.length)
                    const date = find.release_date.split("T")[0];
                    releaseDate.setAttribute('value', date)
                }
            })
    
            editar.addEventListener('click', (e) => {
                e.preventDefault()
    
                if (find !== undefined) {
    
                    const body = {
                        title: title.value,
                        rating: rating.value,
                        awards: awards.value,
                        release_date: release_date.value,
                        length: length.value,
                        genre_id: find.genre.id
                    }
        
                    fetch(`http://localhost:3031/api/movies/update/${find.id}`, {
                        method: "PUT",
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(body)
                    })
                    .then(response => {
                        console.log(response)
                        response.json()
                    })
                    .then(result => {
                        const edicion = document.createElement('h2')
                        const body = qs('body')
                        edicion.innerText = "Se editó la película correctamente"
                        body.appendChild(edicion)
                    })
                    
                }
            })
    
            crear.addEventListener('click', (e) => {
                e.preventDefault()
    
                const body = {
                    title: title.value,
                    rating: rating.value,
                    awards: awards.value,
                    release_date: release_date.value,
                    length: length.value,
                    genre_id: 1
                }
    
                fetch(`http://localhost:3031/api/movies/create`, {
                        method: "POST",
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(body)
                })
                .then(response => response.json())
                .then(response => {
                    console.log(response)
                    const resultado = document.createElement('h2')
                    const body = qs('body')
                    resultado.innerText = "Se creó la película correctamente"
                    body.appendChild(resultado)
                })
            })
    
            eliminar.addEventListener('click', (e) => {
                e.preventDefault()
                fetch(`http://localhost:3031/api/movies/delete/${find.id}`, {
                    method: "DELETE",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                })
                .then(response => response.json())
                .then(response => {
                    console.log(response)
                    const resultado = document.createElement('h2')
                    const body = qs('body')
                    resultado.innerText = "Se eliminó la película correctamente"
                    body.appendChild(resultado)
                })
            })
    
        })
    }
