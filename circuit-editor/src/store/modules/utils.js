import Vue from 'vue';

export function createDragImageGhost (targetImage) {

    var fakeGhost = document.createElement("img");
    fakeGhost.src = targetImage.src;

    if (Vue.$cookies.get("light-theme") == 'true'){
        if (Vue.$cookies.get("color-gates") == 'true'){
            fakeGhost.style.backgroundColor = "ghostwhite";
        } else {
            fakeGhost.style.backgroundColor = "white";
        }
    
    } else {
        fakeGhost.style.backgroundColor = "#374048";
    }

    fakeGhost.style.width = "40px";
    fakeGhost.style.height = "auto";
    fakeGhost.id = "dragged-gate-ghost";
    document.body.appendChild(fakeGhost);

    // tried to make image transparent, not working ..
    // https://stackoverflow.com/questions/38731743/transition-opacity-not-working-when-creating-element
    //window.getComputedStyle(fakeGhost).getPropertyValue("opacity");
    //fakeGhost.style.opacity = "0.5"; 

    return fakeGhost;
}