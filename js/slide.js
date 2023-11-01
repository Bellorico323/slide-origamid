export default class Slide{
constructor(slide, wrapper){
  this.slide = document.querySelector(slide);
  this.wrapper = document.querySelector(wrapper);
  this.dist = {finalPosition: 0, startX: 0, movement: 0}
}

  moveSlide(distX){
    this.dist.movePosition = distX;
    this.slide.style.transform = `translate3d(${distX}px, 0, 0)`;
  }

  updatePosition(clientX){
    this.dist.movement = (this.dist.startX - clientX) * 1.6;
    return this.dist.finalPosition - this.dist.movement;
  }

  onStart(event){
    event.preventDefault();
    this.dist.startX = event.clientX;
    this.wrapper.addEventListener('mousemove', this.onMove);
  }

  onMove(event){
    const finalPosition = this.updatePosition(event.clientX)
    this.moveSlide(finalPosition);
  }

  onEnd(event){
    this.wrapper.removeEventListener('mousemove', this.onMove);
    this.dist.finalPosition = this.dist.movePosition;
  }

  addSlideEvents(){
    this.wrapper.addEventListener('mousedown', this.onStart);
    this.wrapper.addEventListener('mouseup', this.onEnd);
  }

  bindEvents(){
    this.onStart = this.onStart.bind(this)
    this.onMove = this.onMove.bind(this)
    this.onEnd = this.onEnd.bind(this)
  }

  //Slides Config

  slidePosition(slide){
    const margin = (this.wrapper.offsetWidth - slide.offsetWidth) / 2;
    return -(slide.offsetLeft - margin);
  }

  slidesConfig(){
    this.slideArray = [...this.slide.children].map((element) => {
      const position = this.slidePosition(element);
      return { element,position }
    });
    console.log(this.slideArray)
  }

  slidesIndexNav(index){
    const last = this.slideArray.length -1;
    this.index = {
      prev: index? index - 1 : undefined,
      current: index,
      next: index === last ? undefined : index + 1,
    };
  }

  changeSlide(index) {
    const currentSlide = this.slideArray[index]
    this.moveSlide(currentSlide.position);
    this.slidesIndexNav(index);
    this.dist.finalPosition = currentSlide.position;
  }

  init(){
    this.bindEvents();
    this.addSlideEvents();
    this.slidesConfig();
    return this;
  }
}