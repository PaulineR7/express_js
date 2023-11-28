const express = require('express')
const app = express()
const port = 3000

const mockCoworkings = require('./mock-coworking')

const arrNames = [
  {
    id: 12,
    name: "Paul",
    age: 35,
  },
  {
    id: 15,
    name: "Pierre",
    age: 28,
  },
  {
    id: 6,
    name: "Mathilde",
    age: 19,
  }
]
// affiche dans la console un middleware "heure à laquelle on a été sur l'url"
const logger = (req, res, next) => {
  const now = new Date()
  const hours = now.getHours();
  const minutes = now.getMinutes();
  console.log(`${hours}h${minutes < 10 ? '0' + minutes : minutes} - ${req.url} DANS LOGGER`)

  next()
}

app.use(logger)

app.get('/', (req, res) => {
  res.send("Page d'accueil ")
})

app.get('/api/coworkings', (req, res) => {
  res.send(`Il y a ${mockCoworkings.length} coworkings dans la liste`)
})

// création d'un nouvel endpoint qui permettra de récupérer un coworking en fonction de l'id d'un paramètre

app.get('/api/coworkings/:id', (req, res) => {
  let result = "";
  const urlId = parseInt(req.params.id)
  //... trouver le bon objet dans le tableau

  for (let i = 0; i < mockCoworkings.length; i++) {
      const element = mockCoworkings[i];
      if (element.id === urlId) {
          result = mockCoworkings[i].name
          break;
      } else {
        result = `Le numéro de coworkings ${urlId} n'existe pas`
      }
  }

  res.send(result)
})



app.get('/name', (req, res) => {
    let sentence = ``;
    arrNames.forEach((obj) =>{
      sentence += obj.name + " "
      
    })
    res.send(`${sentence} ! `)

})

app.get('/name/:id', (req, res) => {
   // console.log(parseInt(req.params.id))
    // Implémenter le test pour sélectionner dans le tableau l'objet dont l'id correspond à l'id passé en paramètre d'url
    let result = "not found";
    const urlId = parseInt(req.params.id)
    //... trouver le bon objet dans le tableau

    for (let i = 0; i < arrNames.length; i++) {
        const element = arrNames[i];
        if (element.id === urlId) {
            result = arrNames[i].name
            break;
        }
    }

    res.send(result)

// Faire avec la méthode find
  // let result = arrNames.find(el => el.id === urlId)
  // if (!result) {
  //  result ="not found"  
  // } else {
  // result = result.name
  //  }
  // on peut aussi faire result = result ? result.name : "not found"
  // res.send(result)

})


app.listen(port, () => {
  console.log(`Le port entrain d'être écouté est le port ${port}`)
})