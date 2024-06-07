class MenuBurger {

    constructor() {
        this.menuBurgerElement = document.getElementById('menu-burger');
        this.menuElement = document.querySelector('menu');
        this.closeButton = document.getElementById('close-menu-burger');
        this.menuBurgerElement.addEventListener('click', () => {


            this.menuBurgerElement.classList.toggle('hide');

            this.menuElement.classList.toggle('hide');

            this.closeButton.classList.toggle('hide');

        })
        this.closeButton.addEventListener('click', () => {

            this.menuBurgerElement.classList.toggle('hide');

            this.menuElement.classList.toggle('hide');

            this.closeButton.classList.toggle('hide');
        })
    }
}



window.addEventListener("load", () => {
    const menuBurgerElement = new MenuBurger();

});