const variableInputs = document.querySelectorAll('.variable');
const closeButtons = document.querySelectorAll('.close')

const windows = document.querySelector('.windows')
const tabs = Array.from(document.querySelector('.tabs').children)

function animate() {
    window.requestAnimationFrame(animate)
    ctx.fillStyle = tunableColors.background_color
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    boids.forEach(boid => {
        // console.log(boid)
        boid.update()
    })
}

function debounce(func, timeout = 300) {
    let timer;
    console.log(timer)
    return (...args) => {
        console.log("size")
        clearTimeout(timer);
        timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
}

function dragInitialize(element) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    element.querySelector(".top_bar").onmousedown = dragStart;

    function dragStart(e) {
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = dragRelease;
        document.onmousemove = drag;
    }

    function drag(e) {
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        element.style.top = (element.offsetTop - pos2) + "px";
        element.style.left = (element.offsetLeft - pos1) + "px";
    }

    function dragRelease() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

function resizeWindow() {
    canvas.width = document.body.clientWidth;
    canvas.height = document.body.clientHeight  
    leftMargin = margin + canvas.width*0.1
    rightMargin = canvas.width-margin
    bottomMargin = canvas.height-margin
}

window.onresize = debounce(() => resizeWindow())

window.onload = () => {
    resizeWindow()
    changeBoidAmount(boidNumber)
    animate()

    document.querySelectorAll(".window").forEach(window => dragInitialize(window))
    closeButtons.forEach(button => {
        let parentWindow = button.parentElement.parentElement
        button.onclick = function(){parentWindow.style.display="none"}
    })
    tabs.forEach(tab => {
        let pairWindow = windows.querySelector(`.${tab.className}`)
        tab.onclick = function(){pairWindow.style.display="block"}
    })
}

variableInputs.forEach(input => {
    input.addEventListener('change', updateVariable);
    input.addEventListener('input', updateVariable);
});

document.querySelectorAll('input[type="color"]').forEach(input => {
    input.addEventListener('change', updateColor);
    input.addEventListener('input', updateColor);
})