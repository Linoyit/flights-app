

function showResults(flights) {
    let output = document.querySelector('#output');
    const template = flights.map(flight => `
    <li>
    <div>${flight}</div>
    </li>
    `);
    output.innerHTML = template.join(' ');
}

function parseJson(file) {
    fetch(file)
    .then (response =>  { 
        return response.json();
    })
    .then ((flight) => {
        console.log(flight);
        showResults(flight);
    })
}


