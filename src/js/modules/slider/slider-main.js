import Slider from "./slider";

export default class MainSlider extends Slider {
    constructor(btns) {
        super(btns); // gets access to page, btns   
    }

    showSlides(n) {
        if (n > this.slides.length) { //> number of slides, return to the beginning
            this.slideIndex = 1;
        }

        if (n < 1) {
            this.slideIndex = this.slides.length;//=last slide
        }

        try {
            this.hanson.style.opacity = '0'; //hiding

            if (n === 3) { // if on slide 3
                this.hanson.classList.add('animated');
                setTimeout(() => {
                    this.hanson.style.opacity = '1';
                    this.hanson.classList.add('slideInUp');
                }, 3000);
            } else {
                this.hanson.classList.remove('slideInUp');
            }
        } catch (error) {}

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
        try {
            this.hanson = document.querySelector('.hanson');
        } catch(error) {}

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
}


// click on the element => slideindex = 1, showSlides(1)
// item.parentNode.previousElementSibling => получаем родителя sidecontrol__controls -> обращаемся к prev elem 

//{page = '', btns = '', next = '', prev = ''} = {} --> 
// if first part of the object wasnt called -> {} -> mistake prevention