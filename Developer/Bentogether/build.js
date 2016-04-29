var foods = {
    carrots: {
        nutrients: 100,
        carbohydrates: 0,
        sugar: 0,
        toggled: false
    },
    soda: {
        nutrients: 0,
        carbohydrates: 0,
        sugar: 100,
        toggled: false
    },
    bread: {
        nutrients: 50,
        carbohydrates: 50,
        sugar: 0,
        toggled: false
    },
    cookies: {
        nutrients: 0,
        carbohydrates: 10,
        sugar: 100,
        toggled: false
    },
    fish: {
        nutrients: 75,
        carbohydrates: 75,
        sugar: 0,
        toggled: false
    }
};

var list = document.getElementById('foods');
Object.keys(foods).forEach(function(food) {
    var button = document.createElement('button');
    
    button.innerHTML = food;
    
    var approvals = JSON.parse(localStorage.getItem('approvals'));
    var disapprovals = JSON.parse(localStorage.getItem('disapprovals'));
    
    if (approvals.indexOf(food) > -1) {
        button.style.background = 'green';
    }
    if (disapprovals.indexOf(food) > -1) {
        button.style.background = 'red';
    }
    
    button.onclick = function() {
        if (getToggled() < 3 && !foods[this.innerHTML].toggled) {
            foods[this.innerHTML].toggled = !foods[this.innerHTML].toggled;
            updateUI();
            return;
        }
        if (foods[this.innerHTML].toggled) {
            foods[this.innerHTML].toggled = !foods[this.innerHTML].toggled;
            updateUI();
        }
    }
    
    list.appendChild(button);
});

function getToggled() {
    var count = 0;
    Object.keys(foods).forEach(function(food) {
        if (foods[food].toggled) {
            count++;
        }
    });
    return count;
}

function updateUI() {
    if (localStorage.getItem('red') == 'true') {
        document.getElementById('monster').style.background = 'red';
    }
    
    for (var i = 1; i <= 3; i++) {
        document.getElementById('chosen' + i).innerHTML = '';
    }
    
    var number = 1;
    
    var nutrientsScore = 1;
    var carbohydratesScore = 1;
    var sugarScore = 1;
    
    var toggled = [];
    Object.keys(foods).forEach(function(food) {
        if (foods[food].toggled) {
            toggled.push(food);
            document.getElementById('chosen' + number).innerHTML = food;
            number++;
            nutrientsScore += foods[food].nutrients;
            carbohydratesScore += foods[food].carbohydrates;
            sugarScore += foods[food].sugar;
        }
    });
    localStorage.setItem('toggled', JSON.stringify(toggled));
    
    var mealScore = nutrientsScore * carbohydratesScore / sugarScore;
    var monster = document.getElementById('monster');
    
    if (getToggled() < 3) {
        monster.innerHTML = 'Thinking :/';
    }
    
    else if (mealScore < 100) {
        monster.innerHTML = 'Sad :(';
    }
    
    else if (mealScore < 1000) {
        monster.innerHTML = 'Thinking :/';
    }
    
    else {
        monster.innerHTML = 'Happy :)';
    }
}

updateUI();