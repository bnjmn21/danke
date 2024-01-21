const behind = document.getElementById("behind");
let behind_cc = new_confcanvas(behind);

/**
 * @param {HTMLCanvasElement} element
 */
function new_confcanvas(element) {
    element.width = visualViewport.width;
    element.height = visualViewport.height;
    window.addEventListener("resize", () => {
        element.width = visualViewport.width;
        element.height = visualViewport.height;
    });

    return {
        parts: [],
        elem: element
    }
}

/**
 * @param {number} x 
 * @param {number} y 
 */
function add_part(self, x, y, r, r2, vx, vy, vr, vr2, color) {
    self.parts.push({"x": x, "y": y, "r": r, "r2": r2, "vr": vr, "vr2": vr2, "vx": vx, "vy": vy, "color": color});
}

function render(self) {
    self.parts.forEach(part => {
        const ctx = self.elem.getContext("2d");
        ctx.fillStyle = part.color;
        ctx.beginPath();
        const scale = 10;
        const size_ratio = 5;
        
        // MAGIC (DO NOT CHANGE)
        const other_factor_thingy = (Math.PI * Math.sin(part.r2));
        let offset_x = Math.cos(part.r - (other_factor_thingy / size_ratio)) * scale;
        let offset_y = Math.sin(part.r - (other_factor_thingy / size_ratio)) * scale;
        ctx.moveTo(part.x - offset_x, part.y - offset_y);
        offset_x = Math.cos(part.r + (other_factor_thingy / size_ratio)) * scale;
        offset_y = Math.sin(part.r + (other_factor_thingy / size_ratio)) * scale;
        ctx.lineTo(part.x - offset_x, part.y - offset_y);
        offset_x = Math.cos(part.r + (Math.PI - (other_factor_thingy / size_ratio))) * scale;
        offset_y = Math.sin(part.r + (Math.PI - (other_factor_thingy / size_ratio))) * scale;
        ctx.lineTo(part.x - offset_x, part.y - offset_y);
        offset_x = Math.cos(part.r + (Math.PI + (other_factor_thingy / size_ratio))) * scale;
        offset_y = Math.sin(part.r + (Math.PI + (other_factor_thingy / size_ratio))) * scale;
        ctx.lineTo(part.x - offset_x, part.y - offset_y);
        ctx.fill();
    });
}

function tick(self) {
    self.parts.forEach(part => {
        part.r += part.vr;
        part.r2 += part.vr2;
        part.x += part.vx;
        part.y -= part.vy;
        part.vy -= 0.1;
        part.vx /= 1 + Math.abs(part.vx / 1000);
    });
    self.parts = self.parts.filter(part => part.y < self.elem.height);
}

function draw() {
    behind_cc.elem.getContext("2d").clearRect(0, 0, behind_cc.elem.width, behind_cc.elem.height);
    tick(behind_cc);
    render(behind_cc);

    requestAnimationFrame(draw);
}

addEventListener("click", (event) => {
    for (let i = 0; i < 30; i++) {
        add_part(
            behind_cc, event.clientX, event.clientY, Math.random() * 3, Math.random() * 3, (Math.random() * 6 - 3) * (behind_cc.elem.width / 1000), Math.random() * 6 + 5, Math.random() / 10, Math.random() / 10,
            `rgb(${Math.random() * 256}, ${Math.random() * 256}, ${Math.random() * 256})`
        );
    }
});

setTimeout(() => {
    setInterval(() => {
        for (let i = 0; i < 30; i++) {
            add_part(
                behind_cc, 0, behind_cc.elem.height / 4 * 2, Math.random() * 3, Math.random() * 3, (Math.random() * 6 + 3) * (behind_cc.elem.width / 1000), Math.random() * 6 + 5, Math.random() / 10, Math.random() / 10,
                `rgb(${Math.random() * 256}, ${Math.random() * 256}, ${Math.random() * 256})`
            );
        }
    }, 3000);
}, 0);
setTimeout(() => {
    setInterval(() => {
        for (let i = 0; i < 30; i++) {
            add_part(
                behind_cc, 0, behind_cc.elem.height / 4 * 3, Math.random() * 3, Math.random() * 3, (Math.random() * 6 + 3) * (behind_cc.elem.width / 1000), Math.random() * 6 + 5, Math.random() / 10, Math.random() / 10,
                `rgb(${Math.random() * 256}, ${Math.random() * 256}, ${Math.random() * 256})`
            );
        }
    }, 3000);
}, 100);
setTimeout(() => {
    setInterval(() => {
        for (let i = 0; i < 30; i++) {
            add_part(
                behind_cc, behind_cc.elem.width, behind_cc.elem.height / 4 * 2, Math.random() * 3, Math.random() * 3, (Math.random() * 6 - 9) * (behind_cc.elem.width / 1000), Math.random() * 6 + 5, Math.random() / 10, Math.random() / 10,
                `rgb(${Math.random() * 256}, ${Math.random() * 256}, ${Math.random() * 256})`
            );
        }
    }, 3000);
}, 200);
setTimeout(() => {
    setInterval(() => {
        for (let i = 0; i < 30; i++) {
            add_part(
                behind_cc, behind_cc.elem.width, behind_cc.elem.height / 4 * 3, Math.random() * 3, Math.random() * 3, (Math.random() * 6 - 9) * (behind_cc.elem.width / 1000), Math.random() * 6 + 5, Math.random() / 10, Math.random() / 10,
                `rgb(${Math.random() * 256}, ${Math.random() * 256}, ${Math.random() * 256})`
            );
        }
    }, 3000);
}, 300);

draw();