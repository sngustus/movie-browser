let key;
fetch('.env')
    .then(resp => resp.text())
    .then(text => {
        key = text.slice(-7);
    })


const imgURL =`http://img.omdbapi.com/?`;
const baseURL = `http://www.omdbapi.com/?`;
let result;

const searchBox = document.getElementById('search');
const getBtn = document.getElementById('get-btn');
const resultsBox = document.getElementById('results');

getBtn.addEventListener('click',getSearch);


function getSearch() {
    let searchURL = baseURL + `apikey=${key}&s=${searchBox.value}`;

    var xhr = new XMLHttpRequest();
    xhr.open('GET', searchURL);
    xhr.onreadystatechange = function (e) {
        if (xhr.readyState !== XMLHttpRequest.DONE) {return;} //skip if not done
        renderResults(JSON.parse(xhr.response));
    };
    xhr.send(null);
    
}

function renderResults(resul) {
    console.log(resul.Search);

    resultsBox.innerHTML="";
    resul.Search.forEach(movie => {
        resultsBox.innerHTML+=`
            <div class="movie">
                <h3 data-id="${movie.imdbID}">${movie.Title} (${movie.Year})</h3>
            </div>
            `;
    });

    movieDivs = document.querySelectorAll('.movie');
    movieDivs.forEach(mov => {
        mov.addEventListener('click',e => getDetail(e));
    })

}


function getDetail(e) {
    console.log(e.target.dataset.id);

    let searchURL = baseURL + `apikey=${key}&i=${e.target.dataset.id}`;

    var xhr = new XMLHttpRequest();
    xhr.open('GET', searchURL);
    xhr.onreadystatechange = function (e) {
        if (xhr.readyState !== XMLHttpRequest.DONE) {return;} //skip if not done
        renderDetail(JSON.parse(xhr.response));
    };
    xhr.send(null);
}

function renderDetail(resp) {
    resultsBox.innerHTML="";
    console.log(resp)

    resultsBox.innerHTML = `
        <div class="detail">
            <h2>${resp.Title} (${resp.Year})</h2>
            <h4>Directed by ${resp.Director}</h4>

            <h4>Synopsis</h4>
            <p>${resp.Plot}</p>

        </div>
    `;
}