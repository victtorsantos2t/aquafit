const scrollToTop = document.querySelector('.scroll-to-top')
window.addEventListener('scroll', () => {
    if(window.scrollY >300){
        scrollToTop.style.display = "grid"
    }else{
        scrollToTop.style.display = "none"
    }
})


var swiper = new Swiper(".mySwiper", {
   spaceBetween: 24, 
   speed: 1000,
    pagination: {
      el: ".swiper-pagination",
      dynamicBullets: true,
      clickable: true,
    },
    breakpoints: {
        0: {
          slidesPerView: 1,
         
        },
        768: {
          slidesPerView: 2,
         
        },
        1024: {
          slidesPerView: 2,
          
        },
      },

  });

//   aos
AOS.init();

const body= document.body;
const bar = document.querySelector('.bar');

const updateBar=()=>{
  let scrollPos = (window.scrollY / 
  (body.scrollHeight - window.innerHeight))*100;
  bar.style.width =`${scrollPos}%`;
  requestAnimationFrame(updateBar);
};
updateBar()


