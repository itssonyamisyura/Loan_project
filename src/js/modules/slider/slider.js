export default class Slider {
    constructor({container = null, 
        btns = null,
        next = null,
        prev = null, 
        activeClass = '',
        animate = false,
        autoplay = false} = {}) {
        // свойства, описывающие слайдер еще до того, как он начал работать
        this.container = document.querySelector(container);
        this.slides = this.container.children;
        this.btns = document.querySelectorAll(btns);
        this.prev = document.querySelector(prev);
        this.next = document.querySelector(next);
        this.activeClass = activeClass;
        this.animate = animate;
        this.autoplay = autoplay;
        this.slideIndex = 1;
    }
};

 
// 5 sliders in the project: 2 global and 3 smaller --> in order to not create 5 moduls, we put everything in one class