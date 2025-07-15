
export function buildGraph(edges) {
    let graph = {};
    for (let edge of edges) {
        let [place1, place2] = edge;
        if (!graph[place1]) {
            graph[place1] = [];
        }
        if (!graph[place1].some(place => place === place2)) {
            graph[place1].push(place2);
        }
        if (!graph[place2]) {
            graph[place2] = [];
        }
        if (!graph[place2].some(place => place == place1)) {
            graph[place2].push(place1);
        }
    }
    return graph;
}
