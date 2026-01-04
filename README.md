# LRU_Cache
Interactive visualization of the Least Recently Used (LRU) cache using HTML, CSS, and JavaScript.

🔗Live Demo: 
https://jeevana-reddy.github.io/LRU_Cache/

Overview
The LRU Cache is a common **Data Structures and Algorithms** concept used in operating systems, databases, and web browsers.  
This project visually demonstrates how cache elements are added, accessed, moved, and evicted based on usage.

The visualization updates dynamically for every `GET` and `PUT` operation, clearly highlighting:
- Most Recently Used (MRU) node
- Least Recently Used (LRU) node
- Cache reordering logic


Features
- Interactive **key–value cache input**
- Linked list–style visualization
- Real-time updates on `GET` and `PUT` operations
- Visual distinction between **MRU**, **middle**, and **LRU** nodes
- Automatic eviction when capacity is exceeded
- Smooth animations for node movement and removal
- Clean and professional UI


How It Works
PUT(key, value)
- Inserts a new key-value pair into the cache
- Updates the value if the key already exists
- Moves the node to the **Most Recently Used (MRU)** position
- Evicts the **Least Recently Used (LRU)** node if capacity is exceeded

GET(key)
- Returns the value if the key exists
- Moves the accessed node to the **MRU** position
- Displays `-1` if the key is not found



