function copyLine() {
    const lineID = "pakkad-18";
    navigator.clipboard.writeText(lineID).then(() => {
        alert("คัดลอก Line ID แล้ว!");
    });
}
function changeTextActivity(category) {
    const targetTitle = document.getElementById("todo-text");
    const targetContent = document.querySelector(".display-content");

    // สร้างคลังข้อมูลเนื้อหาตามหมวดหมู่
    const contentMap = {
        'Achievement': `
            <div class="list-container">
                <a href="Achievement.html" class="list-item"> <img src="assets/images/icons/icon-flask.png" width="20" height="20"> Science project</a> <br/> 
                <a href="Achievement.html#camp" class="list-item"><img src="assets/images/icons/icon-fire.png" width="20" height="20"> Camp</a> <br/>  
                <a href="Achievement.html#other_activity" class="list-item"><img src="assets/images/icons/icon-medal.png" width="20" height="20"> POSN</a>
            </div>`,
        'Activity': `
            <div class="list-container">
                <a href="Activity.html" class="list-item"><img src="assets/images/icons/icon-star.png" width="20" height="20"> w/ SCIUS TU</a><br/>
                <a href="Activity.html#skr" class="list-item"><img src="assets/images/icons/icon-carrot.png" width="20" height="20"> w/ SKR</a><br/>
                <a href="Activity.html#skr" class="list-item"><img src="assets/images/icons/icon-guitar.png" width="20" height="20"> other</a>
            </div>`,
        'ART': `
            <div class="list-container">
                <a href="Art.html" class="list-item"> <img src="assets/images/icons/icon-duck.png" width="20" height="20"> drawing</a><br/>
                <a href="graphic.html" class="list-item"><img src="assets/images/icons/icon-joystick.png" width="20" height="20"> graphic</a><br/>
                <a href="otherart.html" class="list-item"><img src="assets/images/icons/icon-dino.png" width="20" height="20">Other</a>
            </div>`
    };

    if (targetTitle && targetContent) {
        // เปลี่ยนหัวข้อ
        targetTitle.innerHTML = category;
        // เปลี่ยนเนื้อหาข้างในให้เป็นปุ่มตามหมวดที่เลือก
        targetContent.innerHTML = contentMap[category] || "Coming Soon...";
    }
}

function moveSlider(sliderId, direction) {
    const slider = document.getElementById(sliderId);
    if (!slider) return;

    // หาความกว้างของกล่องรูป 1 รูป
    const scrollAmount = slider.clientWidth; 
    
    // สั่งเลื่อน: ถ้า direction เป็น 1 คือไปข้างหน้า, -1 คือถอยหลัง
    slider.scrollBy({
        left: scrollAmount * direction,
        behavior: 'smooth'
    });
}

// ฟังก์ชันลากวางแบบเสถียร
function makeDraggable(element) {
    element.ondragstart = function() { return false; };

    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    element.onmousedown = dragMouseDown;
    element.ontouchstart = dragMouseDown;

    function dragMouseDown(e) {
        e = e || window.event;
        if (e.type !== 'touchstart') e.preventDefault();

        // --- เพิ่มบรรทัดนี้: ใส่เอฟเฟกต์ลอย ---
        element.classList.add('dragging');

        pos3 = (e.type === 'touchstart') ? e.touches[0].clientX : e.clientX;
        pos4 = (e.type === 'touchstart') ? e.touches[0].clientY : e.clientY;

        document.onmouseup = closeDragElement;
        document.ontouchend = closeDragElement;
        document.onmousemove = elementDrag;
        document.ontouchmove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        let clientX = (e.type === 'touchmove') ? e.touches[0].clientX : e.clientX;
        let clientY = (e.type === 'touchmove') ? e.touches[0].clientY : e.clientY;

        pos1 = pos3 - clientX;
        pos2 = pos4 - clientY;
        pos3 = clientX;
        pos4 = clientY;

        element.style.top = (element.offsetTop - pos2) + "px";
        element.style.left = (element.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        // --- เพิ่มบรรทัดนี้: เอาเอฟเฟกต์ออกเมื่อวาง ---
        element.classList.remove('dragging');

        document.onmouseup = null;
        document.onmousemove = null;
        document.ontouchend = null;
        document.ontouchmove = null;
    }
}
// สั่งให้ทำงานกับสติ๊กเกอร์ทุกตัวเมื่อโหลดหน้าเว็บเสร็จ
window.onload = function() {
    const stickers = document.querySelectorAll('.sticker');
    stickers.forEach(sticker => {
        makeDraggable(sticker);
    });
};