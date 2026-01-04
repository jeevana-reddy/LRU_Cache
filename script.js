
class Node {
    constructor(key, value) {
        this.key = key;
        this.value = value;
        this.prev = null;
        this.next = null;
    }
}


class LRUCache {
    constructor(capacity) {
        this.capacity = capacity;
        this.map = new Map();

        this.head = new Node(null, null); // MRU side
        this.tail = new Node(null, null); // LRU side

        this.head.next = this.tail;
        this.tail.prev = this.head;
    }

    _remove(node) {
        node.prev.next = node.next;
        node.next.prev = node.prev;
    }

    _addToFront(node) {
        node.next = this.head.next;
        node.prev = this.head;
        this.head.next.prev = node;
        this.head.next = node;
    }

    get(key) {
        if (!this.map.has(key)) return -1;

        const node = this.map.get(key);
        this._remove(node);
        this._addToFront(node);

        return node.value;
    }

    put(key, value) {
        let removed = null;

        if (this.map.has(key)) {
            const node = this.map.get(key);
            node.value = value;
            this._remove(node);
            this._addToFront(node);
            return null;
        }

        const node = new Node(key, value);
        this.map.set(key, node);
        this._addToFront(node);

        if (this.map.size > this.capacity) {
            removed = this.tail.prev;
            this._remove(removed);
            this.map.delete(removed.key);
        }

        return removed;
    }

    getNodes() {
        const nodes = [];
        let curr = this.head.next;
        while (curr !== this.tail) {
            nodes.push(curr);
            curr = curr.next;
        }
        return nodes;
    }
}


let cache = null;


function render(message = "") {
    const container = document.getElementById("cache-container");
    const explanation = document.getElementById("explanation");

    container.innerHTML = "";
    explanation.textContent = message;

    if (!cache) return;

    const nodes = cache.getNodes();

    nodes.forEach((node, index) => {
        const box = document.createElement("div");
        box.classList.add("cache-node");

        if (index === 0) box.classList.add("mru");
        else if (index === nodes.length - 1) box.classList.add("lru");
        else box.classList.add("mid");

        box.innerHTML = `
            <div class="key">${node.key}</div>
            <div class="value">${node.value}</div>
        `;

        container.appendChild(box);
    });
}


function setCapacity() {
    const cap = parseInt(document.getElementById("capacity").value);

    if (!cap || cap < 1) {
        alert("Please enter a valid capacity");
        return;
    }

    cache = new LRUCache(cap);
    document.getElementById("capacity-info").textContent =
        `Cache Capacity: ${cap}`;

    render(`Cache initialized with capacity ${cap}`);
}

function put() {
    if (!cache) {
        alert("Set capacity first");
        return;
    }

    const key = document.getElementById("put-key").value.trim();
    const value = document.getElementById("put-value").value.trim();

    if (!key || !value) {
        alert("Enter both key and value");
        return;
    }

    const removed = cache.put(key, value);

    if (removed) {
        render(
            `PUT (${key}, ${value}) → Cache full, evicted LRU (${removed.key})`
        );
    } else {
        render(`PUT (${key}, ${value}) → Added / Updated as MRU`);
    }
}

function get() {
    if (!cache) {
        alert("Set capacity first");
        return;
    }

    const key = document.getElementById("get-key").value.trim();

    if (!key) {
        alert("Enter key");
        return;
    }

    const value = cache.get(key);
    const result = document.getElementById("get-result");

    if (value === -1) {
        result.textContent = "Key not found";
        render(`GET (${key}) → Not found`);
    } else {
        result.textContent = `Value: ${value}`;
        render(`GET (${key}) → Accessed & moved to MRU`);
    }
}
function toggleTheme() {
    document.body.classList.toggle("dark-theme");

    const btn = document.querySelector(".theme-btn");
    btn.textContent = document.body.classList.contains("dark-theme")
        ? "☀️"
        : "🌙";
}
