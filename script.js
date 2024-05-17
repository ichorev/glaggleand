class ThemePark {
    constructor() {
        this.money = 10000;  // Starting money
        this.attractions = [];
        this.ticketPrice = 50;  // Default ticket price
        this.visitors = 0;
        this.happiness = 100;  // Starts at 100%
        this.day = 1;
    }

    addAttraction(name, cost, income, maintenance) {
        if (this.money >= cost) {
            this.attractions.push({ name, cost, income, maintenance });
            this.money -= cost;
            alert(`Added ${name} attraction.`);
        } else {
            alert("Not enough money to add this attraction.");
        }
    }

    setTicketPrice(price) {
        this.ticketPrice = price;
        alert(`Ticket price set to ${this.ticketPrice}`);
    }

    calculateVisitors() {
        this.visitors = Math.floor(1000 / (this.ticketPrice / 10));  // Simplified visitor calculation
        this.happiness = Math.max(0, 100 - (this.ticketPrice - 50) * 2);
    }

    calculateIncome() {
        let income = this.visitors * this.ticketPrice;
        this.attractions.forEach(attraction => {
            income += this.visitors * attraction.income;
        });
        return income;
    }

    calculateExpenses() {
        let expenses = 0;
        this.attractions.forEach(attraction => {
            expenses += attraction.maintenance;
        });
        return expenses;
    }

    runDay() {
        this.calculateVisitors();
        let income = this.calculateIncome();
        let expenses = this.calculateExpenses();
        this.money += income - expenses;
        this.day++;
        alert(`Day ${this.day - 1} Summary: Visitors: ${this.visitors}, Income: ${income}, Expenses: ${expenses}, Money: ${this.money}, Happiness: ${this.happiness}%`);
    }

    showStatus() {
        let status = `
            <strong>Day:</strong> ${this.day}<br>
            <strong>Money:</strong> $${this.money.toFixed(2)}<br>
            <strong>Attractions:</strong> ${this.attractions.map(a => `${a.name} ($${a.cost}, $${a.income}/visitor, $${a.maintenance}/day)`).join('<br>')}<br>
            <strong>Ticket Price:</strong> $${this.ticketPrice}<br>
            <strong>Visitors:</strong> ${this.visitors}<br>
            <strong>Happiness:</strong> ${this.happiness}%<br>
        `;
        document.getElementById('gameStatus').innerHTML = status;
    }
}

const park = new ThemePark();

function addAttraction() {
    let name = prompt("Enter attraction name:");
    let cost = parseInt(prompt("Enter attraction cost:"));
    let income = parseInt(prompt("Enter attraction income per visitor:"));
    let maintenance = parseInt(prompt("Enter attraction maintenance cost per day:"));
    park.addAttraction(name, cost, income, maintenance);
}

function setTicketPrice() {
    let price = parseInt(prompt("Enter new ticket price:"));
    park.setTicketPrice(price);
}

function runDay() {
    park.runDay();
}

function showStatus() {
    park.showStatus();
}
