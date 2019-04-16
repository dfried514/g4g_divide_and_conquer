const lineReader = require('line-reader');

const kargerMinCut = (verticies, edges, numTrials = 1) => {
  let minCut = Number.MAX_VALUE;

  const getRandomEdge = (edgesList) =>
    edgesList[Math.floor(Math.random() * edgesList.length)];

  const contractEdge = (verticiesList, edgesList, edge) => {
    let vertex1 = edge[0];
    let vertex2 = edge[1];

    edgesList.forEach(edge => {
      if (edge[0] === vertex2) {
        edge[0] = vertex1;
      }
      if (edge[1] === vertex2) {
        edge[1] = vertex1;
      }
    });
    verticiesList.splice(verticiesList.indexOf(vertex2), 1);
  }
  const removeRandomEdge = (verticiesList, edgesList) => {
    const randomEdge = getRandomEdge(edgesList);
    contractEdge(verticiesList, edgesList, randomEdge);
  }
  const removeSelfEdges = edgesList =>
    edgesList.filter(edge => edge[0] !== edge[1]);

  for (let i = 1; i <= numTrials; i++) {
    let verticiesCopy = verticies.slice();
    let edgesCopy = [];

    edges.forEach(edge => edgesCopy.push(edge.slice()));

    while (verticiesCopy.length > 2) {
      removeRandomEdge(verticiesCopy, edgesCopy);
      edgesCopy = removeSelfEdges(edgesCopy);
    }
    let curMinCut = edgesCopy.length / verticiesCopy.length;

    if (curMinCut < minCut) {
      minCut = curMinCut;
    }
    verticiesCopy = null;
    edgesCopy = null;
  }
  return minCut;
};

// let verticies = [0, 1, 2, 3];
// let edges = [
//   [0, 1], [0, 3],
//   [1, 0], [1, 2], [1, 3],
//   [2, 1], [2, 3],
//   [3, 0], [3, 1], [3,2]
// ];
// console.log(kargerMinCut(verticies, edges, 4));

let verticiesList = [];
let edgesList = [];

lineReader.eachLine('kargerMinCut.txt', function(line, last) {
  let curEdgesList = line.split('\t');
  let curVertex = parseInt(curEdgesList.shift());
  verticiesList.push(curVertex);
  curEdgesList.forEach(edge => edgesList.push([curVertex, parseInt(edge)]));

  curEdgesList = null;
  curVertex = null;
  if(last){
    console.log(kargerMinCut(verticiesList, edgesList, 5));
  }
});
