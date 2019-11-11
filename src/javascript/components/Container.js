import {TweenMax, TimelineMax, Power2, TweenLite, Power1} from 'gsap/all';
class Container {
    constructor() {
        this.init();
    }
    init() {
        this.sectionAnimContainer = document.querySelector('.section-anim-container')
        this.animContainer = document.querySelector('.anim-container')
        this.pictureContainer = document.querySelector('.activity-picture-container')

        this.nextPictureContainer = document.querySelector(".next-picture")
        this.currentPictureContainer = document.querySelector(".current-picture")

        this.nextPicture = document.querySelector(".next-picture .picture")
        this.currentPicture = document.querySelector(".current-picture .picture")

        this.scrollAnimText = document.querySelectorAll(".scroll-anim")
        this.mouse = { x:0, y:0 }
        this.isInView = false
        this.activity = document.querySelectorAll(".activity")
        this.setupTween();
        this.setupEventListener()

    }

    setupTween() {
        this.timelineIntro = new TimelineMax({ paused: true, onComplete: () => { this.onCompleteIntro() }});
        this.timelineIntro.fromTo(this.nextPictureContainer, 1, { height: 0 }, { height: 500, ease: Power2.easeInOut }, 0);
        this.timelineIntro.fromTo(this.nextPicture, 1.1, { scale: 1.3 }, { scale: 1, ease: Power1.easeOut }, 0);
    }

    setupEventListener(){
        this.animContainer.addEventListener('mousemove', (e) => { this.mouseFollow(e) })

        for(let i = 0; i < this.activity.length; i++){
            this.activity[i].addEventListener('mouseenter', () => { this.mouseenterFunction(i); } );
        }

        this.animContainer.querySelector('.activities').addEventListener('mouseleave', () => { this.leaveContainer() })

        window.addEventListener('scroll', () => { this.scrollHandler()})
    }

    mouseenterFunction(i) {
        TweenMax.to(this.pictureContainer, .5, { autoAlpha: 1, ease: Power1.easeInOut })
        if (this.currentPicture.src === "") {
            this.firstImageAnimation(i);
        } else {
            this.imageAnimation(i);
        }
    }

    firstImageAnimation(index) {
        this.nextPicture.src = this.activity[index].dataset.picture;
        this.currentImage = this.activity[index].dataset.picture;

        this.timelineIntro.play();
    }

    leaveContainer() {
        TweenMax.to(this.pictureContainer, .5, { autoAlpha: 0, ease: Power1.easeInOut })
    }

    onCompleteIntro() {
        this.currentPicture.src = this.currentImage;
        this.timelineIntro.restart();
        this.timelineIntro.stop();
    }

    imageAnimation(index) {
        this.nextPicture.src = this.activity[index].dataset.picture;
        this.currentImage = this.activity[index].dataset.picture;

        this.timelineIntro.play();
    }

    scrollHandler(){
        let spliteTextContainer = document.querySelector('.js-split-text')
        let sectionAnimContainerPos = this.sectionAnimContainer.getBoundingClientRect().y
        let sectionAnimContainerHeight = this.sectionAnimContainer.getBoundingClientRect().height
        if (sectionAnimContainerPos <= sectionAnimContainerHeight/2 && !this.isInView){

            let previousPosition = this.activity[0].getBoundingClientRect().y;
            let positions = [previousPosition];
            for (let i = 0; i < this.activity.length; i++) {
                let y = this.activity[i].getBoundingClientRect().y;
                if (y != previousPosition) {
                    positions.push(y);
                    previousPosition = y;
                }
            }

            for (let i = 0; i < this.activity.length; i++) {
                for (let j = 0; j < positions.length; j++) {
                    console.log(j%2);
                    if (this.activity[i].getBoundingClientRect().y == positions[j]) {
                        this.activity[i].classList.add(`move-${j%2}`);
                    }
                }
            }

            let scrollAnim = new TimelineMax();
            scrollAnim.to(this.activity, 1,{autoAlpha: 1, ease:Power2.easeInCubic}, 0),
            scrollAnim.fromTo('.move-0 span', 1.5, { x: -50 }, {x: 0, ease:Power2.easeInCubic}, 0.1),
            scrollAnim.fromTo('.move-1 span', 1.5, { x: 50 }, {x: 0, ease:Power2.easeInCubic}, 0.1),
            scrollAnim.fromTo(this.scrollAnimText, 1.5,{y:200}, {y:0, ease:Power2.easeInOutSine}, 0),

            this.isInView = true
        }

    }

    mouseFollow(e){
        this.mouse.x = e.clientX;
        this.mouse.y = e.clientY;
        this.pictureContainerBounds = this.pictureContainer.getBoundingClientRect()

        TweenMax.to(this.pictureContainer, 1, {x: this.mouse.x-(this.pictureContainerBounds.width / 2), y: this.mouse.y-(this.pictureContainerBounds.height/2), ease:Power2.easeInOutSine})

    }


}
export default Container;