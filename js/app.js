const loadData = async (searchText, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;

    const res = await fetch(url);
    const data = await res.json();
    displayData(data.data, dataLimit);
}

const displayData = (data, dataLimit) => {
    const parent = document.getElementById('phone-container');
    parent.textContent = ``;

    const errMsg = document.getElementById('not-found');
    if (data.length === 0) {
        errMsg.classList.remove('d-none');
    } else {
        errMsg.classList.add('d-none');
    }

    //show all button
    const showAllBtn = document.getElementById('show-all-btn');

    if (dataLimit && data.length > 10) {

        data = data.splice(0, 10);
        showAllBtn.classList.remove('d-none');

    } else {
        showAllBtn.classList.add('d-none');
    }


    data.forEach(value => {

        const child = document.createElement('div');
        child.classList.add('col');
        child.innerHTML = `
            <div class="card h-100 p-3">
                <img src="${value.image}" class="card-img-top img-fluid h-50 w-50 mx-auto" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${value.phone_name}</h5>
                    <p class="card-text">This is a longer card with supporting text below as a natural lead-in
                    to additional content. This content is a little bit longer.</p>
                    <a href="#" onclick="loadButton('${value.slug}')"  class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailModal">Details</a>

                </div>
            </div>
        `;
        parent.appendChild(child);
    });

    // stop spinner 
    toggleSpinner(false);
}

const searchProcess = (dataLimit) => {
    //start spinner
    toggleSpinner(true);
    const searchField = document.getElementById('input-field');
    const searchValue = searchField.value;

    loadData(searchValue, dataLimit);
}

document.getElementById('search-btn').addEventListener('click', function () {

    searchProcess(10);
});


const toggleSpinner = isLoading => {
    const spinner = document.getElementById('loader');
    if (isLoading) {
        spinner.classList.remove('d-none');
    } else {
        spinner.classList.add('d-none');
    }
};


document.getElementById('btn-show-all').addEventListener('click', function () {
    searchProcess();
});

const loadButton = async id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayDetail(data);
}

const displayDetail = data => {
    // console.log(data);
    const modalDetail = document.getElementById('phoneDetailModalLabel');
    modalDetail.innerText = data.data.name ? data.data.name : "NO name";

    const modalBody = document.getElementById('model-body');
    modalBody.innerHTML = `
    <p>Release date: ${data.data.releaseDate ? data.data.releaseDate : "No release date"}</p>
    <p>Storage: ${data.data.mainFeatures.storage}</p>
    `;
}


document.getElementById('input-field').addEventListener("keyup", (event) => {

    if (event.key === 'Enter') {
        searchProcess(10);
    }
});