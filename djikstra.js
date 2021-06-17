function PriorityQueue () { // this is used to keep track of unexplored routes within the pathfinding process!!
    this._nodelist = [];
  
    this.enqueue = function (priority, key) {
      this._nodelist.push({key: key, priority: priority });
      this.sort();
    };
    this.dequeue = function () {
      return this._nodelist.shift().key;
    };
    this.sort = function () {
      this._nodelist.sort(function (a, b) {
        return a.priority - b.priority;
      });
    };
    this.isEmpty = function () {
      return !this._nodelist.length;
    };
  }
///////
  function nodeGraph() { // the main function
      var Infinity = 1/0; // 1/0 returns infinity
      this.vertices = {}; 

      this.addVertex = function(moniker, edges) { // inputs for the pathfinding to run
        this.vertices[moniker] = edges; // setting moniker equal to edges
      };

      this.bestPath = function (initial, final) { // initial vs final position
        var nodelist = new PriorityQueue(), //calling our previously established function
            distances = {},
            last = {},
            path = [],
            smallest, vertex, neighbor, alt;
        
        for(vertex in this.vertices) {
          if(vertex === initial) {
              distances[vertex] = 0;
              nodelist.enqueue(0, vertex);
            }
            else {
                distances[vertex] = Infinity;
                nodelist.enqueue(Infinity, vertex);
            }

            last[vertex] = null
        }

        while(!nodelist.isEmpty()) {
            smallest = nodelist.dequeue();
      
            if(smallest === final) {
              path = [];
      
              while(last[smallest]) {
                path.push(smallest);
                smallest = last[smallest];
              }
      
              break;
            }
      
            if(!smallest || distances[smallest] === Infinity){
              continue;
            }

            for(neighbor in this.vertices[smallest]) {
                alt = distances[smallest] + this.vertices[smallest][neighbor];
        
                if(alt < distances[neighbor]) {
                  distances[neighbor] = alt;
                  last[neighbor] = smallest;
        
                  nodelist.enqueue(alt, neighbor);
                }
              }
            }
            
            return path;
      };
  }
///////
  var createGraph = new nodeGraph();

createGraph.addVertex('A', {B: 7, C: 8}); // It's like a maze! // p
createGraph.addVertex('B', {A: 7, F: 2}); //
createGraph.addVertex('C', {A: 8, F: 6, G: 4});
createGraph.addVertex('D', {F: 8});
createGraph.addVertex('E', {H: 1});
createGraph.addVertex('F', {B: 2, C: 6, D: 8, G: 9, H: 3});
createGraph.addVertex('G', {C: 4, F: 9});
createGraph.addVertex('H', {E: 1, F: 3});

// output is released to the console
console.log(createGraph.bestPath('A', 'H').concat(['A']).reverse());