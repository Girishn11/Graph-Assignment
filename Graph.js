//Que - 1 Breadth First Traversal for a Graph ========================================
console.log("ANSWER 1");

const airports = "PHX BKK OKC JFK LAX MEX EZE HEL LOS LAP LIM".split(" ");

const routes = [
  ["PHX", "LAX"],
  ["PHX", "JFK"],
  ["JFK", "OKC"],
  ["JFK", "HEL"],
  ["JFK", "LOS"],
  ["MEX", "LAX"],
  ["MEX", "BKK"],
  ["MEX", "LIM"],
  ["MEX", "EZE"],
  ["LIM", "BKK"],
];

// The graph
const adjacencyList = new Map();


function addNode(airport) {
  adjacencyList.set(airport, []);
}


function addEdge(origin, destination) {
  adjacencyList.get(origin).push(destination);
  adjacencyList.get(destination).push(origin);
}

airports.forEach(addNode);
routes.forEach((route) => addEdge(...route));

function bfs(start) {
  const visited = new Set();

  const queue = [start];

  while (queue.length > 0) {
    const airport = queue.shift(); 

    const destinations = adjacencyList.get(airport);

    for (const destination of destinations) {
      if (destination === "BKK") {
        console.log("BFS found Bangkok!");
      }
      if (!visited.has(destination)) {
        visited.add(destination);
        queue.push(destination);
      }
    }
  }
}

bfs("PHX");

//Que - 2 Depth First Traversal for a Graph ========================================

console.log("ANSWER 2");

function dfs(start, visited = new Set()) {
  console.log(start);

  visited.add(start);

  const destinations = adjacencyList.get(start);

  for (const destination of destinations) {
    if (destination === "BKK") {
      console.log(`DFS found Bangkok`);
      return;
    }

    if (!visited.has(destination)) {
      dfs(destination, visited);
    }
  }
}

dfs("PHX");

//Que - 3 Count the number of nodes at given level in a tree using BFS===================

console.log("ANSWER 3");

let V;

var adj = new Array(1001);
for (let i = 0; i < adj.length; i++) {
  adj[i] = [];
}

function addEdge(v, w) {
  
  adj[v].push(w);

  
  adj[w].push(v);
}

function BFS(s, l) {
  V = 100;
  
  let visited = new Array(V);
  let level = new Array(V);

  for (let i = 0; i < V; i++) {
    visited[i] = false;
    level[i] = 0;
  }

  let queue = [];

  
  visited[s] = true;
  queue.push(s);
  level[s] = 0;
  let count = 0;
  while (queue.length != 0) {
    
    s = queue[0];
    queue.shift();

    let list = adj[s];
    
    for (let i = 0; i < list.length; i++) {
      if (!visited[list[i]]) {
        visited[list[i]] = true;
        level[list[i]] = level[s] + 1;
        queue.push(list[i]);
      }
    }

    count = 0;
    for (let i = 0; i < V; i++) if (level[i] == l) count++;
  }
  return count;
}

addEdge(0, 1);
addEdge(0, 2);
addEdge(1, 3);
addEdge(2, 4);
addEdge(2, 5);

let level = 2;
document.write(BFS(0, level));

// Que - 4 Count number of trees in a forest============================

console.log("ANSWER 4");

var Vv; 
var adje;

function Graph(v) {
  Vv = v;
  adje = Array.from(Array(v), () => Array());
}

function addEdge(v, w) {
  adje[v].push(w); 
}

function DFSUtil(v, visited) {
 
  visited[v] = true;

  for (var i of adje[v]) {
    var n = i;
    if (!visited[n]) {
      DFSUtil(n, visited);
    }
  }
}

function countTrees() {

  var visited = Array(V).fill(false);
  var res = 0;


  for (var i = 0; i < V; ++i) {
    if (visited[i] == false) {
      DFSUtil(i, visited);
      res++;
    }
  }
  return res;
}


Graph(5);
addEdge(0, 1);
addEdge(0, 2);
addEdge(3, 4);
document.write(countTrees());

//Que - 5 Detect Cycle in a Directed Graph==========================

console.log("ANSWER 5");

var WHITE = 0,
  GRAY = 1,
  BLACK = 2;


class Graphe {
 
  constructor(ver) {
    this.V = ver;
    this.adjList = Array.from(Array(this.V), () => Array(this.V));
  }
}


function addEdge(g, u, v) {

  g.adjList[u].push(v);
}


function DFSUtil(g, u, color) {
  
  color[u] = GRAY;

  
  for (var iN of g.adjList[u]) {

    if (color[iN] == GRAY) return true;

 
    if (color[iN] == WHITE && DFSUtil(g, iN, color) == true) return true;
  }

  color[u] = BLACK;
  return false;
}


function isCyclic(g) {

  var color = Array(g.V);
  for (var i = 0; i < g.V; i++) {
    color[i] = WHITE;
  }

  for (var i = 0; i < g.V; i++) {
    if (color[i] == WHITE) {
      if (DFSUtil(g, i, color) == true) return true;
    }
  }
  return false;
}

var g = new Graphe(4);
addEdge(g, 0, 1);
addEdge(g, 0, 2);
addEdge(g, 1, 2);
addEdge(g, 2, 0);
addEdge(g, 2, 3);
addEdge(g, 3, 3);

if (isCyclic(g)) document.write("Graph contains cycle");
else document.write("Graph doesn't contain cycle");