module.exports = Actor; 

function Actor(n, h, l, ic, id) {
	this.id = id;
    if (n == '' || typeof n == 'undefined') {
        n = 'Player';
    }
    this.name = n;
    if (h == '' || typeof h == 'undefined') {
        h = '0';
    }
    this.hp = h;
    if (l == '' || typeof l == 'undefined') {
        l = '0,0';
    }
    this.location = l;
    this.icon = ic;
}

Actor.prototype.move = function(to) {
	this.location = to;
	// emit event?
}

Actor.prototype.changeHP = function(hp) {
	this.hp = hp;
}
