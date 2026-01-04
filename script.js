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

        this.head = new Node(null, null);
        this.tail = new Node(null, null);

        this.head.next = this.tail;
        this.tail.prev = this.head;
    }

    add(node) {
        node.next = this.head.next;
        node.prev = this.head;
        this.head.next.prev = node;
        this.head.next = node;
    }

    remove(node) {
        node.prev.next = node.next;
        node.next.prev = node.prev;
    }

    get(key) {
        if (!this.map.has(key)) return -1;
        const node = this.map.get(key);
        this.remove(node);
        this.add(node);
        return node.value;
    }

    put(key, value) {
        let removed = null;

        if (this.map.has(key)) {
            this.remove(this.map.get(key));
        }

        const node = new Node(key, value);
        this.add(node);
        this.map.set(key, node);

        if (this.map.size > this.capacity) {
            removed = this.tail.prev;
            this.remove(removed);
            this.map.delete(removed.key);
        }
        return removed;
    }

    getNodes() {
        let arr = [];
        let cur = this.head.next;
        while (cur !== this.tail) {
            arr.push(cur);
            cur = cur.next;
        }
        return arr;
    }
}

let cache = null;

/* UI FUNCTIONS */
function setCapacity() {
    const cap = Number(document.getElementById("capacity").value);
    if (!cap) return alert("Enter valid capacity");

    cache = new LRUCache(cap);
    render(`Cache initialized with capacity ${cap}`);
}

function put() {
    if (!cache) return alert("Set capacity first");

    const key = document.getElementById("put-key").value;
    const value = document.getElementById("put-value").value;

    const removed = cache.put(key, value);
    render(removed 
        ? `Put (${key}, ${value}) → Removed LRU (${removed.key})`
        : `Put (${key}, ${value}) → Added as MRU`
    );
}

function get() {
    if (!cache) return alert("Set capacity first");

    const key = document.getElementById("get-key").value;
    const val = cache.get(key);

    document.getElementById("get-result").innerText =
        val === -1 ? "Not Found" : `Value = ${val}`;

    render(val === -1 
        ? `Get (${key}) → Not Found`
        : `Get (${key}) → Moved to MRU`
    );
}

function render(text) {
    document.getElementById("explanation").innerText = text;
    document.getElementById("capacity-info").innerText =
        `Cache Size: ${cache.map.size} / ${cache.capacity}`;

    const container = document.getElementById("cache-container");
    container.innerHTML = "";

    const nodes = cache.getNodes();
    nodes.forEach((node, i) => {
        const box = document.createElement("div");
        box.className = "cache-node " +
            (i === 0 ? "mru" : i === nodes.length - 1 ? "lru" : "mid");

        box.innerHTML = `
            <div class="key">${node.key}</div>
            <div class="value">${node.value}</div>
        `;
        container.appendChild(box);

        if (i < nodes.length - 1) {
            const arrow = document.createElement("div");
            arrow.className = "arrow";
            arrow.innerText = "→";
            container.appendChild(arrow);
        }
    });
}

function toggleTheme() {
    document.body.classList.toggle("dark-theme");
    document.querySelector(".theme-btn").innerText =
        document.body.classList.contains("dark-theme") ? "☀️" : "🌙";
}
