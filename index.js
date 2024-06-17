// Initialization for ES Users
let containerMovie = document.getElementById('containerMovie')
let searchButton = document.getElementById('searchButton')
let title = document.getElementById('title')
let result = document.getElementById('result')

let modalWindow = document.getElementById("modalWindow");
let modalContent = document.getElementById('modalContent')
let closeModal = document.getElementById('closeModal')

let overlay = document.getElementById('overlay');

closeModal.addEventListener('click', function(e){
    e.target.parentNode.style.display='none';
})


let get = ""
let page = "1"
let oldTitle = ``

class WorkWithAPI {

    async getArrayMovies() {

        let get = `http://www.omdbapi.com/?apikey=520e759c&s=${title.value}&type=movie&page=${page}`
        let response = await fetch(get)
        let currencies = await response.json()
        return currencies
    }

    async geFullMovie(e) {
        let get = `http://www.omdbapi.com/?apikey=520e759c&t=${e.parentNode.childNodes[0].innerText}&type=movie&plot=full`
        let response = await fetch(get)
        console.log(response)
        let currencies = await response.json()
        return currencies
    }

    async getContentMovie(e) {
        let get = `http://www.omdbapi.com/?apikey=520e759c&i=${e}`
        let response = await fetch(get)
        let currencies = await response.json()
        console.log(currencies)
        return currencies
    }
}

let APIService = new WorkWithAPI();

class DOM {

    async isResponse(e) {
        if (e.Response == "False") {
            result.innerHTML = `
            <h1 style="text-align: center;" style="text-align:center;">Movie not found!.</h1>`
            return true
        }
    }

    async search(arrMovie) {
        if (oldTitle != title.value) {
            oldTitle = title.value
            result.innerHTML = ""
        }

        for (let i = 0; i < arrMovie.length; i++)
            DOMobj.addElement(arrMovie[i])

    }



	async addElement(movie) {

        let card = document.createElement('div');
        
        
        // console.log("movie")         * * *
        // console.log(movie)           * * *

        let id = title.innerText.replace(/ /g, "_");

        card.classList.add('card');
        card.style.backgroundImage = `url('${movie.Poster}')`;


        let cardInfo = document.createElement('div');
    



        card.innerHTML=`
        <div class="container-fluid h-100 m-0 p-0 row"
        id="cardContainer_${movie.imdbID}>


            <div class="cardFullInfo m-0 p-0 w-100 row ">


                <div class="position-absolute top-50 start-50 translate-middle">
                
                    <div class="fs-5 text-white bg-dark p-2 text-center"id="${movie.imdbID}">
                        ${movie.Title}
                    </div>
                </div>

            </div>

           


        </div> 

        `

        containerMovie.appendChild(card)


        let fullInfoMovie = document.getElementById(`${movie.imdbID}`)

        console.log(modalWindow)

        fullInfoMovie.addEventListener('click', async function(event) {


            let contentMovie = await APIService.getContentMovie(`${movie.imdbID}`);


            




            modalWindow.style.display='block'
            modalContent.innerHTML=`


                <div class="fs-6 c  ">
                        <img class="card-img-top" src="${contentMovie.Poster}" alt="Card image cap">
                        <div class="card-body">
                            <h5 class="card-title">${contentMovie.Title}</h5>


                            <div class="container-fluid m-0 p-0 d-flex row">

                            <span class="">Year : ${contentMovie.Year}</span>
                    
                            <span class="">Duration: ${contentMovie.Runtime}</span>
                    
                            <div class="">Genre :
                            ${contentMovie.Genre}
                            </div>
            
                        </div>


                    <p class="card-text">${contentMovie.Plot}</p>

                    <div class="">Rating :${contentMovie.Ratings[0].Value}</div>
           
                </div>
          




                `


            overlay.style.display = 'block'; // Показать overlay


        })

        
        



    }

};


closeModal.addEventListener('click', function() {
    modalWindow.style.display = 'none';
    overlay.style.display = 'none'; // Скрыть overlay
});

let DOMobj = new DOM();

scrollAmount =100;


async function getDataFullDataMovieFromAPI() {
 let arrMovie = await APIService.getArrayMovies()
        .then(function(value) {
            arr = value;
        }, function(reason) {});


    DOMobj.search(arr.Search)
};

containerMovie.addEventListener('wheel', function(event) {

   event.preventDefault(); // Опционально, чтобы предотвратить стандартное поведение прокрутки браузера
    
    // Проматываем контейнер на 400 пикселей в зависимости от направления прокрутки
    if (containerMovie.scrollLeft >= (containerMovie.scrollWidth - containerMovie.clientWidth)) {
        // Вызываем вашу функцию

        page++;
        getDataFromAPI()
    }

    if (event.deltaY > 0) {
        containerMovie.scrollLeft += scrollAmount;
    } else {
        containerMovie.scrollLeft -= scrollAmount;
    }


});


searchButton.addEventListener('click', async function() {

    containerMovie.innerHTML="";

    page = 1
    getDataFromAPI()
})


async function getDataFromAPI() {
    // loader.style.display = "block"

    let arrMovie = await APIService.getArrayMovies()
        .then(function(value) {
            arr = value;
        }, function(reason) {});


    DOMobj.search(arr.Search)

    // loader.style.display = "none"
}