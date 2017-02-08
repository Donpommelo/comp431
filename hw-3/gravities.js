'use strict';

//The two metrics of the game are the high score and the most simultaneous kills.
const updateCookie = function(hiScore, hiChain) {
    document.cookie = `${'hiScore'}=${hiScore}`;
    document.cookie = `${'hiChain'}=${hiChain}`;
};

const getHighCookie = function() {
    const key = 'hiScore';
    const cookie = document.cookie.split(';').filter(kv => kv.indexOf(key) >= 0)[0];
    return cookie ? parseInt(cookie.split('=')[1]) : 0;
};

const getChainCookie = function() {
    const key = 'hiChain';
    const cookie = document.cookie.split(';').filter(kv => kv.indexOf(key) >= 0)[0];
    return cookie ? parseInt(cookie.split('=')[1]) : 0;
};

window.onload = function() {
    const svg = document.getElementsByTagName('svg')[0]; //Get svg element

    const hiScore = document.getElementById('hiScore');
    const curScore = document.getElementById('curScore');
    const lives = document.getElementById('lives');
    const hiChain = document.getElementById('hiChain');
    const notification = document.getElementById('notification');
    const currency = document.getElementById('currencyAmount');

    //Base stats of the game. These are both changed and used by functions in the game.
    const startDamage = 10;
    const startFireRate = 750;
    const startRange = 120;
    const startLives = 6;
    const startCurrency = 6;

    const orbit1width = 400;
    const orbit1length = 300;
    const orbit2width = 300;
    const orbit2length = 200;
    const orbit3width = 200;
    const orbit3length = 100;

    let meteorRate;
    let towerRate;
    let difficulty;

    const createApp = (svg) => {

        //I wanted these values to be reset at the start of the game, whether by opening the window or after game over.
        let towerDamage = startDamage;
        let towerFireRate = startFireRate;
        let towerRange = startRange;
        let difficultyLvl = 0;
        lives.innerHTML = startLives;
        hiScore.innerHTML = getHighCookie();
        hiChain.innerHTML = getChainCookie();
        curScore.innerHTML = 0;
        currency.innerHTML = startCurrency;

        let numTow = 0;
        let numMet = 0;
        let towers = [];
        let meteors = [];
        let curChain = 0;

        //This is run when the player clicks an orbiting ring to place a satellite.
        window.clickOrbit = (evt, orbW, orbH) => {

            //Satellite costs scale against distance for balance reasons.
            const cost = 4 - orbH / 100;

            if (Number(currency.innerHTML) >= cost) {
                notification.innerHTML = "Satellite Purchased!";
                currency.innerHTML = Number(currency.innerHTML) - cost;
                addSat(evt, orbW, orbH);
            } else {
                notification.innerHTML = "You cannot purchase that Satellite!";
            }
        };

        //Upgrades improve stats of all towers depending on which upgrade was selected.
        window.upgradeButton = (button) => {
            if (Number(currency.innerHTML) >=2) {
                notification.innerHTML ="Upgrade Purchased!";
                currency.innerHTML = Number(currency.innerHTML) - 2;

                switch (button.id) {
                    case 'plusLife':
                        lives.innerHTML = Number(lives.innerHTML) + 1;
                        break;
                    case 'plusDamage':
                        towerDamage += 5;
                        break;
                    case 'plusSpeed':

                        //Tower fire interval must be reset or a new firing instance would be added.
                        clearInterval(towerRate);
                        towerFireRate *= 0.8;
                        towerRate = towerChecks(towerFireRate);
                        break;
                    case 'plusRange':
                        towerRange += 25;
                        break;
                }
            } else {
                notification.innerHTML="You cannot purchase that upgrade";
            }
        };

        const drawOrbit = (id, width, height) => {

            //path is the visible line the satellite follows. space is the wider, clickable region.
            let newPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
            let newSpace = document.createElementNS("http://www.w3.org/2000/svg", "path");

            let path = "M"+(500-width)+",500 A"+width+","+height+" 0 0,1 "+(500+width)+" 500 " +
                "A"+width+","+height+" 0 0,1 "+(500-width)+",500";

            newPath.setAttribute("d", path);
            newPath.setAttribute("stroke", "lightgrey");
            newPath.setAttribute("stroke-width", "2");
            newPath.setAttribute("fill", "none");
            newPath.setAttribute("id", id + "path");
            newPath.setAttribute("pointer-events", "none");

            newSpace.setAttribute("d", path);
            newSpace.setAttribute("stroke", "black");
            newSpace.setAttribute("stroke-width", "50");
            newSpace.setAttribute("fill", "none");
            newSpace.setAttribute("id", id + "space");
            newSpace.setAttribute("onclick", "clickOrbit(evt, " + width + ", " + height + ")");
            svg.append(newSpace);
            svg.append(newPath);
        };

        const enemySpawns = (difficulty) => {

            //Rate of spawns scales with difficulty which increments over time.
            let rate = Math.max(5000 - 500 * difficulty, 1000);

            return setInterval(function () {

                //Meteor numbers counted so I could give their paths unique ids in order to link path with mpaths.
                numMet = numMet + 1;

                //Meteors spawn at set distances from the earth
                let degr = Math.random() * 2 * Math.PI;
                let spawnX = 800 * Math.cos(degr) + 500;
                let spawnY = 800 * Math.sin(degr) + 500;

                //Meteors have randomized size (Hp) and speeds which scale inversely with one another.
                //Both scale with difficulty.
                let meteorType = Math.random() * 10;
                let meteorSpeed = Math.max(4, meteorType + 10 - difficulty);
                let meteorSize = (meteorType * 2 + 9) * (1 + difficulty / 5);

                let newPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
                newPath.setAttribute("d", "M" + spawnX + "," + spawnY + " L500 500");
                newPath.setAttribute("stroke", "red");
                newPath.setAttribute("stroke-width", "0");
                newPath.setAttribute("fill", "none");
                newPath.setAttribute("id", "meteorpath" + numMet);
                newPath.setAttribute("pointer-events", "none");
                svg.append(newPath);

                let newElement = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
                newElement.setAttribute("r", meteorSize);
                newElement.setAttribute("style", "fill:red");
                newElement.setAttribute("id", "meteor" + numMet);

                let newAnim = document.createElementNS("http://www.w3.org/2000/svg", 'animateMotion');
                newAnim.setAttribute("dur", meteorSpeed + "s");
                newAnim.setAttribute("begin", "indefinite");
                newAnim.setAttribute("fill", "freeze");

                let newMpath = document.createElementNS("http://www.w3.org/2000/svg", "mpath");
                newMpath.setAttributeNS("http://www.w3.org/1999/xlink", "href", "#meteorpath" + numMet);

                newAnim.appendChild(newMpath);
                newElement.appendChild(newAnim);
                svg.append(newElement);

                newAnim.beginElement();

                //List of meteors is needed to check for proximity from towers and earths.
                meteors.push(newElement);
            }, rate);
        };

        const addSat = (evt, orbW, orbH) => {

            //Tower numbers counted so I could give their paths unique ids in order to link path with mpaths.
            numTow=numTow+1;

            //Player might not click directly on path, so actual location is estimated with polar coordinates.
            let mouseX = (evt.offsetX*1000 / svg.clientWidth - 500) / orbW;
            let mouseY = (evt.offsetY*1000 / svg.clientHeight - 500) / orbH;

            let degr = Math.atan(mouseY / mouseX);

            if (mouseX < 0) {
                degr += (Math.PI)
            } else {
                if (mouseY < 0) {
                    degr += (2 * Math.PI)
                }
            }

            let newX = orbW * Math.cos(degr) + 500;
            let newY = orbH * Math.sin(degr) + 500;

            //Path is drawn from mouse to pole, to other pole and back to mouse. This means that every tower path is unique.
            let newPath = document.createElementNS("http://www.w3.org/2000/svg", "path");

            if (mouseY < 0) {
                newPath.setAttribute("d","M"+newX+","+newY+" A"+orbW+","+orbH+" 0 0,1 "+(500+orbW)+
                    " 500 A"+orbW+","+orbH+" 0 0,1 "+(500-orbW)+" 500 A"+orbW+","+orbH+" 0 0,1 "+newX+","+newY);
            } else {
                newPath.setAttribute("d","M"+newX+","+newY+" A"+orbW+","+orbH+" 0 0,1 "+(500-orbW)+
                    " 500 A"+orbW+","+orbH+" 0 0,1 "+(500+orbW)+" 500 A"+orbW+","+orbH+" 0 0,1 "+newX+","+newY);
            }

            newPath.setAttribute("stroke","red");
            newPath.setAttribute("stroke-width","0");
            newPath.setAttribute("fill","none");
            newPath.setAttribute("id","satpath"+numTow);
            newPath.setAttribute("pointer-events","none");
            svg.append(newPath);

            let newElement=document.createElementNS("http://www.w3.org/2000/svg", 'circle');
            newElement.setAttribute("r",15);
            newElement.setAttribute("style", "fill:yellow");
            newElement.setAttribute("id", "satellite" + numTow);

            let newAnim=document.createElementNS("http://www.w3.org/2000/svg", 'animateMotion');
            newAnim.setAttribute("dur", "20s");
            newAnim.setAttribute("begin", "indefinite");
            newAnim.setAttribute("repeatCount", "indefinite");

            let newMpath=document.createElementNS("http://www.w3.org/2000/svg","mpath");
            newMpath.setAttributeNS("http://www.w3.org/1999/xlink", "href", "#satpath"+numTow);

            newAnim.appendChild(newMpath);
            newElement.appendChild(newAnim);
            svg.append(newElement);

            newAnim.beginElement();

            //List of towers is needed to check for proximity from meteors.
            towers.push(newElement);
        };

        const towerChecks = (rate) => {

            //This is every tower checking to see if it can shoot at each meteor.
            //Additionally, meteors hitting earth is processed here. This may seem unintuitive, but I wanted the order
            //of meteor and tower checking to be consistent regardless of when the elements were spawned.
            return setInterval(function() {

                //This keeps track of the number of meteors destroyed at once; one of the metrics for the game.
                curChain = 0;

                //Meteors hitting Earth will always be processed first.
                meteors.forEach(function(meteor, index, array) {
                    let meteorcenterX = (meteor.getBoundingClientRect().left + meteor.getBoundingClientRect().width / 2
                        - svg.getBoundingClientRect().left) * 1000 / svg.clientWidth;
                    let meteorcenterY = (meteor.getBoundingClientRect().top + meteor.getBoundingClientRect().height / 2
                        - svg.getBoundingClientRect().top) * 1000 / svg.clientHeight;
                    if (Math.abs(meteorcenterX - 500) < 1 && Math.abs(meteorcenterX - 500) < 1) {
                        takeDamage(meteor);
                    }
                });

                towers.forEach(function(tower, index, array) {
                    let towercenterX = (tower.getBoundingClientRect().left + tower.getBoundingClientRect().width / 2
                        - svg.getBoundingClientRect().left) * 1000 / svg.clientWidth;
                    let towercenterY = (tower.getBoundingClientRect().top + tower.getBoundingClientRect().height / 2
                        - svg.getBoundingClientRect().top) * 1000 / svg.clientHeight;

                    meteors.forEach(function(meteor, index, array) {
                        let meteorcenterX = (meteor.getBoundingClientRect().left + meteor.getBoundingClientRect().width / 2
                            - svg.getBoundingClientRect().left) * 1000 / svg.clientWidth;
                        let meteorcenterY = (meteor.getBoundingClientRect().top + meteor.getBoundingClientRect().height / 2
                            - svg.getBoundingClientRect().top) * 1000 / svg.clientHeight;

                         if (Math.sqrt(Math.pow(towercenterX - meteorcenterX, 2) +
                                Math.pow(towercenterY - meteorcenterY, 2)) < towerRange) {
                            meteorShot(meteor, towercenterX, towercenterY, meteorcenterX, meteorcenterY);
                        }
                    });
                });

                if (curChain > Number(hiChain.innerHTML)) {
                    hiChain.innerHTML = curChain;
                }

            }, rate);
        };

        const meteorShot = (meteor, tX, tY, mX, mY) =>{
            let shot = document.createElementNS("http://www.w3.org/2000/svg","path");
            shot.setAttribute("d","M"+tX+","+tY+" "+mX+","+mY);
            shot.setAttribute("stroke", "red");
            shot.setAttribute("stroke-width", "10");

            let fade = document.createElementNS("http://www.w3.org/2000/svg","animate");
            fade.setAttribute("attributeName", "opacity");
            fade.setAttribute("from", "1");
            fade.setAttribute("to", "0");
            fade.setAttribute("dur","0.2s");
            fade.setAttribute("fill", "freeze");

            shot.appendChild(fade);
            svg.append(shot);
            fade.beginElement();

            //Size = Hp in this game. This gives the player an easy way to determine the Hp of each enemy.
            let size = meteor.getAttribute("r");
            size = size - towerDamage;

            if (size <= 5) {
                meteorDeath(meteor);
            } else {
                meteor.setAttribute("r", size);
            }
        };

        const meteorDeath = (meteor) => {

            //Meteor destruction is the factor that increments both high score and largest chain metrics.
            meteors.splice(meteors.indexOf(meteor),1);
            meteor.remove();
            curChain++;
            curScore.innerHTML = Number(curScore.innerHTML) + 1;
        };

        const difficultyRamp = () => {

            //This var decides how often difficulty increases.
            const roundTimer = 20000;

            return setInterval(function() {
                difficultyLvl++;
                clearInterval(meteorRate);
                meteorRate = enemySpawns(difficultyLvl);

                //Currency is gained whenever difficulty increases. Amount gained scales to keep up with growin genemies.
                const reward = Math.min(Math.floor(1 + difficultyLvl / 5), 3);

                notification.innerHTML = "Difficulty Increase! Current Difficulty Level: " + difficultyLvl
                    + "! "+reward+" Satellite Part(s) awarded!";
                currency.innerHTML = Number(currency.innerHTML) + reward;
            }, roundTimer);
        };

        const takeDamage = (meteor) => {
            lives.innerHTML = Number(lives.innerHTML) - 1;
            meteors.splice(meteors.indexOf(meteor),1);
            meteor.remove();
            if (Number(lives.innerHTML) <= 0) {
                gameOver();
                notification.innerHTML="Game Over! New game began.";
            } else {
                notification.innerHTML="You sustained damage!";
            }
        };

        const gameOver = () => {
            towers.forEach(function(tower, index, array) {
                tower.remove();
            });
            meteors.forEach(function(meteor, index, array) {
                meteor.remove()
            });
            window.clearInterval(meteorRate);
            window.clearInterval(towerRate);
            window.clearInterval(difficulty);
            updateCookie(Math.max(Number(curScore.innerHTML), Number(hiScore.innerHTML)),
                Number(hiChain.innerHTML));
            createApp(svg);
        };

        drawOrbit("orbit1", orbit1width, orbit1length);
        drawOrbit("orbit2", orbit2width, orbit2length);
        drawOrbit("orbit3", orbit3width, orbit3length);

        const earthX = 500;
        const earthY = 500;
        const earthRad = 30;
        const earth = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
        earth.setAttribute("id", "earth");
        earth.setAttribute("cx", earthX);
        earth.setAttribute("cy", earthY);
        earth.setAttribute("rx", earthRad);
        earth.setAttribute("ry", earthRad);
        svg.append(earth);

        meteorRate = enemySpawns(difficultyLvl);
        towerRate = towerChecks(towerFireRate);
        difficulty = difficultyRamp();
    };

    createApp(svg);
};



