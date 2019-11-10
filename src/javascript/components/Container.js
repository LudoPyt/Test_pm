class Container {
    constructor() {
        this.init();
    }
    init() {
        this.container = document.querySelector('.js-container')
        console.log(this.container, 'working')
    }
}
export default Container;