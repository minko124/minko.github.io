console.log("Portfolio Start!");

const fades = document.querySelectorAll(".fade");

window.addEventListener("scroll", () => {

    const trigger = window.innerHeight * 0.85;

    fades.forEach(item => {

        const top = item.getBoundingClientRect().top;

        if(top < trigger){
            item.classList.add("show");
        }

    });

});
