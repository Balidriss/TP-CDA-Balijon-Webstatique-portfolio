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




function createElementOnContainer(tag, container, textContent) {
    const element = document.createElement(tag);
    element.textContent = textContent;
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

function createThumbnailOnContainer(container, imgPath) {
    const imgContainer = createElementOnContainer('div', container);
    imgContainer.classList.add('thumbnail-container');
    const thumbnailElement = createElementOnContainer('img', imgContainer);
    thumbnailElement.classList.add('thumbnail');
    thumbnailElement.setAttribute('src', imgPath);
    return thumbnailElement;
}

function displayProjects(xml) {

    const projects = createProjects(xml);

    projects.forEach(project => {

        project.element.classList.add(project.titre.replace(/ /g, ''));
        project.element.classList.add('projet');
        //va créer un élément avec le tag et écrire le contenu à partir du xml 
        //pour assuite le mettre en enfant du conteneur de l'affichage de projet
        createThumbnailOnContainer(project.element, project.thumbnailPath);
        createElementOnContainer("h2", project.element, project.titre);
        createElementOnContainer("p", project.element, project.etat);
        createElementOnContainer("p", project.element, project.stacks);
        createElementOnContainer("p", project.element, project.date);
        createElementOnContainer("p", project.element, project.objectifs);

        const lienRepoElement = createElementOnContainer("a", project.element, 'Le dêpot github >');
        const lienElement = createElementOnContainer("a", project.element, 'Le lien >');
        lienRepoElement.setAttribute('href', project.repo);
        lienElement.setAttribute('href', project.link);

    });

}

// load and charge projects
window.onload = function () {
    loadXMLDoc("data/data.xml")
        .then(displayProjects)
        .catch(function (error) {
            console.error(error);
        });
};