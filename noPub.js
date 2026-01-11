/*body.didomi-popup-open {
	overflow: auto !important;
}
html body div.didomi-host {
   display:none !important;
}
html body div.gimii-root {
   display: none !important;
}*/

function removePopin() {
    document.getElementsByTagName("body")[0].classList.remove("didomi-popup-open");
    document.getElementById("didomi-host").remove();
}

console.log("Anti Pub Activated");
function tryRemoveElement(getElementFn, removeFn, label, retries = 5, delay = 2000) {
    let el = null;
    try {
        el =getElementFn();
    } catch (e) {
        console.warn(`Error getting element for ${label}:`, e);
    }
    if (el) {
        console.log(`remove ${label}`);
        if (typeof removeFn == "number") {
            for (let i = 0; i < removeFn; i++) {
                const nel = el.parentElement;
                if (nel == null) {
                    break;
                }
                el = nel;
            }
            el.remove();
        }
        else
            removeFn();
    } else if (retries > 0) {
        console.log(`retry ${label}, attempts left: ${retries}`);
        setTimeout(() => tryRemoveElement(getElementFn, removeFn, label, retries - 1, delay), delay);
    } else {
        console.log(`failed to remove ${label} after retries`);
    }
}

tryRemoveElement(
    () => document.getElementById("didomi-host"),
    removePopin,
    "didomi"
);

tryRemoveElement(
    () => document.getElementById("gimii-root"),
    0,
    "gimii-root"
);

tryRemoveElement(
    () => document.getElementsByClassName("cf-icon-adblocker")[0],
    6,
    "Footer antipub"
);


console.log("Elements removed");