export default class Slider {
    constructor({page = '', btns = '', next = '', prev = ''} = {}) {
        // свойства, описывающие слайдер еще до того, как он начал работать
        this.page = document.querySelector(page);
        this.slides = this.page.children;
        this.btns = document.querySelectorAll(btns);
        this.slideIndex = 1;
    }
};

 
// 5 sliders in the project: 2 global and 3 smaller --> in order to not create 5 moduls, we put everything in one class