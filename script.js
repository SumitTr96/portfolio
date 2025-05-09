const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});



let terminate;
function mouseAnimation() {
    let axisX=1;
    let axisY=1;

    let prevX=0;
    let prevY=0;


    window.addEventListener("mousemove", function (dets) {

      clearTimeout(terminate);

      axisX= gsap.utils.clamp(.8,1.2,dets.clientX-prevX);
      axisY= gsap.utils.clamp(.8,1.2,dets.clientY-prevY);
      prevX=dets.clientX;
      prevY=dets.clientY;
      
      movingCircle(axisX,axisY);

      terminate = setTimeout(function(){
        document.querySelector("#circle").style.transform=`translate(${dets.clientX}px, ${dets.clientY}px) scale(1,1)`;
      },100)
    
})
}
mouseAnimation()


function homeAnim(){
    var tl = gsap.timeline();

    tl.from("#nav", {
        y: -10,
        opacity: 0,
        duration: 1.5,
        ease: Expo.easeInOut,
    })
    .to(".boundingelem", {
        y: 0,
        duration: 2,
        delay: -1,
        stagger: 0.2,
        ease: Expo.easeInOut,
      })
      .from("#homeFooter", {
        y: -10,
      opacity: 0,
      duration: 1.5,
      delay: -1,
      ease: Expo.easeInOut,
      })
}

function movingCircle(axisX,axisY) {
    window.addEventListener("mousemove", function (dets) {
        
      document.querySelector(
        "#circle"
      ).style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(${axisX},${axisY}) `;
    });
  }
movingCircle();
homeAnim();

document.querySelectorAll(".elem").forEach(function(elems){
  // console.log(elems.getBoundingClientRect().top)

  elems.addEventListener("mouseleave", function(det){
    console.log("leave", det)
    gsap.to(elems.querySelector("img"),{
      opacity:0,
      ease: Power3,
      duration:0.5,
    })
  })

  elems.addEventListener("mousemove",function(details){
    let divtop=details.clientY-elems.getBoundingClientRect().top;
    
    gsap.to(elems.querySelector("img"),{
      opacity:1,
      ease: Power3,
      top: divtop,
      left: details.clientX,
    })
  })

 
})