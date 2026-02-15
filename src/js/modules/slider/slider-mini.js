import Slider from "./slider";

export default class MiniSlider extends Slider {
    constructor(container, next, prev, activeClass, animate, autoplay) {
        super(container, next, prev, activeClass, animate, autoplay);
    }
    
    decorizeSlides() {
        // remove active class frome all slides except the first one
        this.slides.forEach(slide => {
            slide.classList.remove(this.activeClass);
            if (this.animate) {
                slide.querySelector('.card__title').style.opacity = 0.4;
                slide.querySelector('.card__controls-arrow').style.opacity = 0;
            }
        });

        // if our first active slide not a btn -> add class
        if (!this.slides[0].closest('button')) {
            this.slides[0].classList.add(this.activeClass);
        }
        
        if (this.animate) {
            this.slides[0].querySelector('.card__title').style.opacity = 1;
            this.slides[0].querySelector('.card__controls-arrow').style.opacity = 1;
        }
    }

    nextSlide() {
        if (this.slides[1].tagName == 'BUTTON' && this.slides[2].tagName == 'BUTTON') {
            this.container.appendChild(this.slides[0]);//slide
            this.container.appendChild(this.slides[0]);//btn
            this.container.appendChild(this.slides[0]);//btn
            this.decorizeSlides();
        } else if(this.slides[1].tagName == 'BUTTON') {
            this.container.appendChild(this.slides[0]);//slide
            this.container.appendChild(this.slides[0]);//btn
            this.decorizeSlides();
        } else {
            // click next slide -> 1st elem goes to the end of the list
            this.container.appendChild(this.slides[0]);
            this.decorizeSlides();
        }
    }

    bindTriggers() {
        this.next.addEventListener('click', () => this.nextSlide());

        this.prev.addEventListener('click', () => {

            //from the end of array -> if last el is a btn -> skip it(иду с конца-> skip btns -> пока не дойду до div -> div в начало)
            for(let i = this.slides.length - 1; i > 0; i--) {
                if (this.slides[i].tagName !== 'BUTTON') {
                    let active = this.slides[i]; 
                    // last slide goes before the 1st one
                    this.container.insertBefore(active, this.slides[0]);
                    this.decorizeSlides();
                    break;
                }
            }
        });
    }

    init() {
        try {
            this.container.style.cssText = `
            display: flex;
            flex-wrap: wrap;
            overflow: hidden;
            align-items: flex-start;
        `;

        this.bindTriggers();
        this.decorizeSlides();

        if (this.autoplay) {
            setInterval(() => {
               this.nextSlide(); 
            }, 5000);
        }
        } catch (e) {}
    }
}