console.log("Portfolio Start!");

const fades = document.querySelectorAll(".fade");

function showFade() {

    const trigger = window.innerHeight * 0.85;

    fades.forEach(item => {

        const top = item.getBoundingClientRect().top;

        if (top < trigger) {
            item.classList.add("show");
        }

    });

}

window.addEventListener("scroll", showFade);

// ページを開いた瞬間にも判定する
showFade();
