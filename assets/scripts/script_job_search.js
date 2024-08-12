document.addEventListener('DOMContentLoaded', function () {
    // Function to get the values of selected checkboxes
    function getSelectedCheckboxes(checkboxName) {
        const selectedCheckboxes = [];
        $(`input[name=${checkboxName}]:checked`).each(function () {
            selectedCheckboxes.push($(this).val());
        });
        return selectedCheckboxes;
        }

    // Function to filter job examples based on selected checkboxes
     function filterJobExamples() {
        const selectedLocalisations = getSelectedCheckboxes('localisation');
        const selectedKeywords = getSelectedCheckboxes('keyword');

        console.log('Filtering job examples...', selectedKeywords , selectedLocalisations);
        // Make an AJAX request to the server
        const xhr = new XMLHttpRequest();
        xhr.open('POST', '/filter_examples', true);  
        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.onreadystatechange = function () {

            if (xhr.readyState === 4 && xhr.status === 200) {
                console.log('Response:', xhr.responseText);

                // Parse the response and update the job examples on the page
                const filteredJobExamples = JSON.parse(xhr.responseText);
                updateJobExamples(filteredJobExamples);
            }
        }

        const requestBody = JSON.stringify({
            text:null,
            localisations: selectedLocalisations,
            keywords: selectedKeywords
        });
        console.log(requestBody)
        xhr.send(requestBody);
    }

    function searchJobExamples() {
        const inputText = document.getElementById("searchInput").value

        // Make an AJAX request to the server
        const xhr = new XMLHttpRequest();
        xhr.open('POST', '/filter_examples', true);  
        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.onreadystatechange = function () {

            if (xhr.readyState === 4 && xhr.status === 200) {
                console.log('Response:', xhr.responseText);

                // Parse the response and update the job examples on the page
                const filteredJobExamples = JSON.parse(xhr.responseText);
                updateJobExamples(filteredJobExamples);
            }
        }

        console.log("tueds", inputText)
        const requestBody = JSON.stringify({
            name : inputText,
            localisations: null,
            keywords: null
        });
        console.log(requestBody)
        xhr.send(requestBody);
    }


// Send the selected localisations and keywords as JSON to the server



    // Event listener for the "Apply Filters" button
    document.getElementById('applyFiltersBtn').addEventListener('click', function (event) {
        event.preventDefault(); // Prevent default form submission
        filterJobExamples();
    });

    document.getElementById('icone').addEventListener('click', function (event) {
        event.preventDefault(); // Prevent default form submission
        searchJobExamples();
    });
});

function updateJobExamples(filteredJobExamples) {
const jobExamplesContainer = document.querySelector('.card'); 

// Clear existing job examples
jobExamplesContainer.innerHTML = '';

// Add the filtered job examples to the container
filteredJobExamples.forEach((exampli, index) => { 
    for (let offer in exampli.offers) { 
        const exemple = exampli.offers[offer];
        const jobExampleDiv = document.createElement('div');
        jobExampleDiv.classList.add('align-items-center', 'card-body');

        // Build the HTML structure for each job example
        let S = `
        <div class=" align-items-center">
            <div class="card-body">
                <img src="${exampli.logo}" alt="Example Image" style="max-width: 100%;"><br>
                <h5 class="fa">${exampli.name}</h5>
                <h5>${exemple.title}</h5>
                <p class="fs-6" style="color: #4F709C;">Localisation: ${exampli.location}</p>
                <div class="badge text-wrap position">
                    <i class='fas fa-map-marker-alt'></i> ${exampli.location}
                </div>
                <div class="badge text-wrap duree" style="color: #4F709C;">
                    <i class='fas fa-clock'></i> ${exemple.minimal_duration}-${exemple.maximal_duration} ${exemple.duration_type} 
                </div>
                <p>Description: ${exemple.description}
                    
                </p>
                <p>Email: ${exemple.email}</p>
                <a href="mailto:${exemple.email}" class="btn btn-primary" style="background-color: #213555;">Send Email</a>
            </div>
        </div>`;
        if (index < exampli.length - 1) {
            S = S+`<hr style="border-top: 1px solid #b6c1cf;">`
        }
        jobExampleDiv.innerHTML = S
        jobExamplesContainer.appendChild(jobExampleDiv);

        // horizontal line between job examples 
        if (index < filteredJobExamples.length - 1) {
            const hrElement = document.createElement('hr');
            hrElement.style.borderTop = '1px solid #b6c1cf';
            jobExamplesContainer.appendChild(hrElement);
        }
    }
});

// If no examples are found,  a message will be displayed
if (filteredJobExamples.length === 0) {
    const noExamplesMessage = document.createElement('p');
    noExamplesMessage.textContent = 'No examples found';
    jobExamplesContainer.appendChild(noExamplesMessage);
}

}

function resetFilters() {
const checkboxes = document.querySelectorAll('input[type="checkbox"]');
checkboxes.forEach((checkbox) => {
    checkbox.checked = false;
});

window.location.reload();
}




function lister(result) {

    const locOffres = document.getElementById('locoffres');

    // Iterate through the result and append the markup dynamically
    result.forEach(({ [Object.keys(result[0])[0]]: location, [Object.keys(result[0])[1]]: count }) => {
      const checkboxItem = document.createElement('div');
      checkboxItem.className = 'checkbox-item';

      const checkboxInput = document.createElement('input');
      checkboxInput.type = 'checkbox';
      checkboxInput.id = location;
      checkboxInput.name = 'localisation';
      checkboxInput.className = 'mt-0.5 h-6 w-6 shrink-0 rounded-md border-gray-200 text-indigo-900 focus:ring-indigo-900';
      checkboxInput.value = location;

      const checkboxLabel = document.createElement('div');
      checkboxLabel.className = 'checkbox-label';

      const label = document.createElement('label');
      label.htmlFor = location;
      label.innerText = location;

      const checkboxResults = document.createElement('div');
      checkboxResults.className = 'checkbox-results';
      checkboxResults.innerText = `Number of locations: ${count}`;

      checkboxLabel.appendChild(label);
      checkboxItem.appendChild(checkboxInput);
      checkboxItem.appendChild(checkboxLabel);
      checkboxItem.appendChild(checkboxResults);

      locOffres.appendChild(checkboxItem);
    });

}