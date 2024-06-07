class Project {

    static container = document.querySelector(".realisations-container");

    constructor(projects, index) {
        this.titre = getProjectcontent(projects, 0, index);
        this.etat = getProjectcontent(projects, 1, index);
        this.stacks = getProjectcontent(projects, 2, index);
        this.date = getProjectcontent(projects, 3, index);
        this.objectifs = getProjectcontent(projects, 4, index);
        this.thumbnailPath = assetsPath("thumbnail") + getProjectcontent(projects, 5, index);
        this.repo = getProjectcontent(projects, 6, index);
        this.link = getProjectcontent(projects, 7, index);
        this.element = createElementOnContainer('div', Project.container);

    }

}

function assetsPath(type) {
    const assetPath = "assets/"
    const imgPath = "img/"
    const thumbnailPath = "thumbnail/"
    switch (type) {
        case "thumbnail":
            return assetPath + imgPath + thumbnailPath;
        case "img":
            return assetPath + imgPath;
        default:
            return assetPath;
    }

}


function createElementOnContainer(tag, container) {
    const element = document.createElement(tag);
    container.appendChild(element);
    return element;
}

function getProjectcontent(projects, indexDom, index) {

    return projects[index]['children'][indexDom].textContent;
}

// Fonction pour charger le fichier XML avec fetch
async function loadXMLDoc(filename) {
    try {
        const response = await fetch(filename)
        if (!response.ok) {
            throw new error('Problème de chargement.')
        }
        const textXml = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(textXml, "text/xml");
        return doc;

    } catch (error) {
        console.error(error);
    }
}
function createProjects(xml) {
    const projects = xml.querySelectorAll("projet");
    let projectArray = [projects.length];
    for (let i = 0; i < projects.length; i++) {
        projectArray[i] = new Project(projects, i);
    }
    return projectArray;
}

function displayProjects(xml) {

    const projects = createProjects(xml);


    for (let i = 0; i < projects.length; i++) {

        console.log(projects[i].titre);


    }
}

// load and charge projects
window.onload = function () {
    loadXMLDoc("data/data.xml")
        .then(displayProjects)
        .catch(function (error) {
            console.error(error);
        });
};