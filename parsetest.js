let jsonData;

fetch('userFolder.json')
    .then(response => response.json())
    .then(data => {
        jsonData = data;

        //clear file :
        let jsonDataClear = cleanFile(jsonData)

        //remove number
        removeNumberValues(jsonDataClear)

        //remove if no value and empty object
        removeEmptyValues(jsonDataClear)
        removeEmptyObjects(jsonDataClear)
        console.log(jsonDataClear)


        // affichage du json
        function createTreeView(data, container) {
            const ul = document.createElement('ul');
            container.appendChild(ul);

            for (const key in data) {
                const li = document.createElement('li');
                const value = data[key];

                if (typeof value === 'object') {
                    li.innerHTML = `<span class="object-key"></span>`;
                    createTreeView(value, li);
                } else {
                    li.innerHTML = `- ${value} <a class="button" href="https://www.youtube.com/results?search_query=${encodeURIComponent(value)}" target="_blank">
                    youtube</a>`;
                }

                ul.appendChild(li);
            }
        }

        const treeContainer = document.getElementById('json-tree');

        createTreeView(jsonDataClear, treeContainer);
    })
    .catch(error => {
        console.error('Une erreur est survenue lors du chargement du fichier JSON :', error);
    });



    function cleanFile(file) {

        // Convertit l'objet JSON en chaîne de caractères JSON
        const jsonString = JSON.stringify(file);

        const jsonCleaned = jsonString.replace(/\\/g, '').replace(/@/g, '');
        const jsonObject = JSON.parse(jsonCleaned);
        return jsonObject
    }

    function removeNumberValues(obj) {
        for (let key in obj) {
            if (typeof obj[key] === 'number') {
                delete obj[key];
            } else if (typeof obj[key] === 'object' && obj[key] !== null) {
                // Recursively call the function for nested objects
                removeNumberValues(obj[key]);
            }
        }
    }

    function removeEmptyValues(obj) {
        for (let key in obj) {
            if (obj[key] === undefined || obj[key] === null || obj[key] === '') {
                delete obj[key];
            } else if (typeof obj[key] === 'object' && obj[key] !== null) {
                // Recursively call the function for nested objects
                removeEmptyValues(obj[key]);
            }
        }
    }

    function removeEmptyObjects(obj) {
        for (let key in obj) {
            if (typeof obj[key] === 'object' && obj[key] !== null && Object.keys(obj[key]).length === 0) {
                // If the object is empty, delete it
                delete obj[key];
            } else if (typeof obj[key] === 'object' && obj[key] !== null) {
                // Recursively call the function for nested objects
                removeEmptyObjects(obj[key]);
            }
        }
    }