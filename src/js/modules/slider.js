export default class Slider {
    constructor(page, btns) {
        // свойства, описывающие слайдер еще до того, как он начал работать
        this.page = document.querySelector(page);
        this.slides = this.page.children;
        this.btns = document.querySelectorAll(btns);
        this.slideIndex = 1;
    }

    showSlides(n) {
        if (n > this.slides.length) { //> number of slides, return to the beginning
            this.slideIndex = 1;
        }

        if (n < 1) {
            this.slideIndex = this.slides.length;//=last slide
        }

        this.slides.forEach(slide => {
            slide.style.display = 'none'; // hide slides
        });

        // show the slide we need --> we start with 0 so thats why -1
        this.slides[this.slideIndex - 1].style.display = 'block';
    }

    plusSlides(n) {
        this.showSlides(this.slideIndex += n);
    }


    render() {
        this.btns.forEach(btn => {
            btn.addEventListener('click', () => {
                this.plusSlides(1);
            });

            btn.parentNode.previousElementSibling.addEventListener('click', (e) => {
                e.preventDefault(); // because it is a link
                this.slideIndex = 1;
                this.showSlides(this.slideIndex)
            });
        });

        this.showSlides(this.slideIndex);
    }
};


// click on the element => slideindex = 1, showSlides(1)
// item.parentNode.previousElementSibling => получаем родителя sidecontrol__controls -> обращаемся к prev elem