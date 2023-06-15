const xxx = [
    [],               ['A'],
    ['A', 'A'],       ['A', 'A', 'B'],
    ['A', 'B'],       ['A', 'B', 'A'],
    ['A'],            ['A', 'A'],
    ['A', 'A', 'B'],  ['A', 'B'],
    ['A', 'B', 'A'],  ['B'],
    ['B', 'A'],       ['B', 'A', 'A'],
    ['B', 'A'],       ['B', 'A', 'A']
  ];
  
const uniqueArray = Array.from(new Set(xxx.map(JSON.stringify)), JSON.parse);
console.log(JSON.stringify(xxx));
console.log(JSON.stringify(uniqueArray));
  