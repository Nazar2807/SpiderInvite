// ===============================
// ЕЛЕМЕНТИ
// ===============================


const webSound = document.getElementById("webSound");
const bgMusic = document.getElementById("bgMusic");
const page1 = document.getElementById("page1");
const page2 = document.getElementById("page2");
const page3 = document.getElementById("page3");

page1.classList.add("active");

page2.classList.remove("active");
page2.classList.add("hidden");

page3.classList.remove("active");
page3.classList.add("hidden");

const continueBtn = document.getElementById("continueBtn");
const acceptBtn = document.getElementById("acceptBtn");
const finishBtn = document.getElementById("finishBtn");

const spider = document.getElementById("spiderContainer");

// ===============================
// ДОЩ
// ===============================

const canvas = document.getElementById("rain");
const ctx = canvas.getContext("2d");

let drops = [];

function resizeCanvas(){

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

}

resizeCanvas();

window.addEventListener("resize",resizeCanvas);

for(let i=0;i<220;i++){

    drops.push({

        x:Math.random()*canvas.width,

        y:Math.random()*canvas.height,

        len:10+Math.random()*20,

        speed:4+Math.random()*8

    });

}

function drawRain(){

    ctx.clearRect(0,0,canvas.width,canvas.height);

    ctx.strokeStyle="rgba(180,210,255,.28)";
    ctx.lineWidth=1;

    drops.forEach(drop=>{

        ctx.beginPath();

        ctx.moveTo(drop.x,drop.y);

        ctx.lineTo(drop.x-2,drop.y+drop.len);

        ctx.stroke();

        drop.y+=drop.speed;

        if(drop.y>canvas.height){

            drop.y=-20;
            drop.x=Math.random()*canvas.width;

        }

    });

    requestAnimationFrame(drawRain);

}

drawRain();

// ===============================
// ПЕРЕХІД ДО ЗАПРОШЕННЯ
// ===============================

continueBtn.onclick=()=>{

    spiderIntro();

    bgMusic.volume = 0.15;
bgMusic.play().catch(() => {});

    navigator.vibrate?.(40);

    page1.classList.remove("active");
    page1.classList.add("hidden");

    setTimeout(()=>{

        page2.classList.remove("hidden");
        page2.classList.add("active");

    },700);

}

// ===============================
// ПРИЙНЯТИ
// ===============================



// ===============================
// ГОТОВО
// ===============================

finishBtn.onclick = () => {

    finishBtn.textContent = "До зустрічі 😊";
    finishBtn.disabled = true;

}// ==========================
// ПАВУК
// ==========================

function spiderIntro(){

    webSound.currentTime = 0;
webSound.play();

    spider.style.transition="2s ease";

    spider.style.top = "-260px";

setTimeout(()=>{
    spider.style.top = "20px";
},500);

}


// ==========================
// ПАРАЛАКС
// ==========================

document.addEventListener("mousemove",(e)=>{

    let x=(e.clientX/window.innerWidth-.5)*20;
    let y=(e.clientY/window.innerHeight-.5)*20;

    document.querySelector(".cityGlow").style.transform=
    `translate(calc(-50% + ${x}px),${y}px)`;

});

// ==========================
// ПАВУТИНА
// ==========================

function createWeb(){

    let web=document.createElement("div");

    web.style.position="fixed";

    web.style.left="50%";
    web.style.top="50%";

    web.style.width="20px";
    web.style.height="20px";

    web.style.border="2px solid rgba(255,255,255,.25)";
    web.style.borderRadius="50%";

    web.style.transform="translate(-50%,-50%) scale(.1)";
    web.style.transition=".9s ease";

    web.style.zIndex="999";

    document.body.appendChild(web);

    setTimeout(()=>{

        web.style.transform="translate(-50%,-50%) scale(80)";
        web.style.opacity="0";

    },30);

    setTimeout(()=>{

        web.remove();

    },1000);

}

// ==========================
// ЗАМІНА acceptBtn
// ==========================

acceptBtn.onclick = () => {

    webSound.currentTime = 0;
    webSound.play();

    navigator.vibrate?.([100,50,100]);

    spider.style.top = "-220px";

    createWeb();

    page2.classList.remove("active");
    page2.classList.add("hidden");

    setTimeout(() => {

        page3.classList.remove("hidden");
        page3.classList.add("active");

    }, 900);

}