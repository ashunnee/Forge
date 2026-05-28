const curriculum = {
  python: {
    name: 'Python Programming',
    duration: 30,
    promise: 'entry-level Python developer interviews',
    days: [
      { day: 1, topic: 'What programming actually is and why Python', phase: 1 },
      { day: 2, topic: 'Variables, data types and how memory works', phase: 1 },
      { day: 3, topic: 'Strings — manipulation, methods, real use cases', phase: 1 },
      { day: 4, topic: 'Numbers, math operations, type conversion', phase: 1 },
      { day: 5, topic: 'Getting input, print formatting, f-strings', phase: 1 },
      { day: 6, topic: 'Lists — creating, indexing, slicing', phase: 1 },
      { day: 7, topic: 'Week 1 review and first mini project: calculator', phase: 1 },
      { day: 8, topic: 'If statements, comparison operators, logic', phase: 2 },
      { day: 9, topic: 'For loops, range, iteration patterns', phase: 2 },
      { day: 10, topic: 'While loops, break, continue, loop patterns', phase: 2 },
      { day: 11, topic: 'Functions — defining, calling, parameters', phase: 2 },
      { day: 12, topic: 'Return values, scope, variable lifetime', phase: 2 },
      { day: 13, topic: 'Dictionaries — key-value pairs, real use cases', phase: 2 },
      { day: 14, topic: 'Tuples, sets, when to use each collection type', phase: 2 },
      { day: 15, topic: 'List comprehensions and dict comprehensions', phase: 2 },
      { day: 16, topic: 'Mini project: build a contact book application', phase: 2 },
      { day: 17, topic: 'File handling — reading, writing, CSV files', phase: 3 },
      { day: 18, topic: 'Error handling — try, except, finally', phase: 3 },
      { day: 19, topic: 'Modules and imports — standard library deep dive', phase: 3 },
      { day: 20, topic: 'Object oriented programming — classes and objects', phase: 3 },
      { day: 21, topic: 'Inheritance, polymorphism, real OOP patterns', phase: 3 },
      { day: 22, topic: 'Decorators, generators, advanced functions', phase: 3 },
      { day: 23, topic: 'APIs — making requests, parsing JSON', phase: 3 },
      { day: 24, topic: 'Mini project: build a weather app using a real API', phase: 3 },
      { day: 25, topic: 'Interview Q&A — Python fundamentals questions', phase: 4 },
      { day: 26, topic: 'Interview Q&A — OOP and design pattern questions', phase: 4 },
      { day: 27, topic: 'Live coding simulation — easy problems timed', phase: 4 },
      { day: 28, topic: 'Live coding simulation — medium problems timed', phase: 4 },
      { day: 29, topic: 'System design basics relevant to Python roles', phase: 4 },
      { day: 30, topic: 'Full mock interview simulation and certificate', phase: 4 }
    ]
  },
  javascript: {
    name: 'JavaScript & Web Dev',
    duration: 30,
    promise: 'entry-level JavaScript developer interviews',
    days: [
      { day: 1, topic: 'How the web works and where JavaScript fits', phase: 1 },
      { day: 2, topic: 'Variables — var, let, const and why it matters', phase: 1 },
      { day: 3, topic: 'Data types, strings, template literals', phase: 1 },
      { day: 4, topic: 'Arrays — creating, indexing, built-in methods', phase: 1 },
      { day: 5, topic: 'Objects — key-value pairs, dot notation, methods', phase: 1 },
      { day: 6, topic: 'Functions — declarations, expressions, arrow functions', phase: 1 },
      { day: 7, topic: 'Week 1 review and mini project: interactive webpage', phase: 1 },
      { day: 8, topic: 'DOM manipulation — selecting and changing elements', phase: 2 },
      { day: 9, topic: 'Events — click, input, submit, event listeners', phase: 2 },
      { day: 10, topic: 'Conditionals, loops, array iteration methods', phase: 2 },
      { day: 11, topic: 'Scope, closures, hoisting explained clearly', phase: 2 },
      { day: 12, topic: 'Higher order functions — map, filter, reduce', phase: 2 },
      { day: 13, topic: 'Promises — asynchronous JavaScript fundamentals', phase: 2 },
      { day: 14, topic: 'Async and await — writing clean async code', phase: 2 },
      { day: 15, topic: 'Fetch API — making real HTTP requests', phase: 2 },
      { day: 16, topic: 'Mini project: build a weather app with real API', phase: 2 },
      { day: 17, topic: 'ES6 features — destructuring, spread, rest', phase: 3 },
      { day: 18, topic: 'Modules — import, export, organizing code', phase: 3 },
      { day: 19, topic: 'Error handling — try catch, custom errors', phase: 3 },
      { day: 20, topic: 'OOP in JavaScript — classes, constructors', phase: 3 },
      { day: 21, topic: 'Prototypes, inheritance, this keyword deeply', phase: 3 },
      { day: 22, topic: 'Local storage, session storage, cookies', phase: 3 },
      { day: 23, topic: 'Regular expressions — patterns and real use cases', phase: 3 },
      { day: 24, topic: 'Mini project: full todo app with local storage', phase: 3 },
      { day: 25, topic: 'Interview Q&A — JavaScript fundamentals', phase: 4 },
      { day: 26, topic: 'Interview Q&A — async, closures, this keyword', phase: 4 },
      { day: 27, topic: 'Live coding — easy algorithm problems timed', phase: 4 },
      { day: 28, topic: 'Live coding — medium algorithm problems timed', phase: 4 },
      { day: 29, topic: 'System design basics for frontend roles', phase: 4 },
      { day: 30, topic: 'Full mock interview simulation and certificate', phase: 4 }
    ]
  },
  sql: {
    name: 'SQL & Data Analysis',
    duration: 30,
    promise: 'entry-level data analyst interviews',
    days: [
      { day: 1, topic: 'What databases are and why SQL exists', phase: 1 },
      { day: 2, topic: 'SELECT basics — querying your first table', phase: 1 },
      { day: 3, topic: 'WHERE clause — filtering data precisely', phase: 1 },
      { day: 4, topic: 'ORDER BY and LIMIT — sorting and controlling results', phase: 1 },
      { day: 5, topic: 'AND, OR, NOT — combining filter conditions', phase: 1 },
      { day: 6, topic: 'NULL values — what they are and how to handle them', phase: 1 },
      { day: 7, topic: 'Week 1 review and first real dataset exercise', phase: 1 },
      { day: 8, topic: 'Aggregate functions — COUNT, SUM, AVG, MIN, MAX', phase: 2 },
      { day: 9, topic: 'GROUP BY — summarizing data by category', phase: 2 },
      { day: 10, topic: 'HAVING — filtering grouped results', phase: 2 },
      { day: 11, topic: 'INNER JOIN — combining two tables', phase: 2 },
      { day: 12, topic: 'LEFT JOIN and RIGHT JOIN — keeping unmatched rows', phase: 2 },
      { day: 13, topic: 'Multiple joins — combining three or more tables', phase: 2 },
      { day: 14, topic: 'Subqueries — queries inside queries', phase: 2 },
      { day: 15, topic: 'CASE statements — conditional logic in SQL', phase: 2 },
      { day: 16, topic: 'Mini project: analyze a real sales dataset', phase: 2 },
      { day: 17, topic: 'Window functions — ROW_NUMBER, RANK, PARTITION BY', phase: 3 },
      { day: 18, topic: 'CTEs — common table expressions for clean queries', phase: 3 },
      { day: 19, topic: 'String functions — manipulating text in SQL', phase: 3 },
      { day: 20, topic: 'Date functions — working with time data', phase: 3 },
      { day: 21, topic: 'Database design — tables, keys, relationships', phase: 3 },
      { day: 22, topic: 'Normalization — organizing data correctly', phase: 3 },
      { day: 23, topic: 'Indexes — making queries fast', phase: 3 },
      { day: 24, topic: 'Mini project: build a full business analytics report', phase: 3 },
      { day: 25, topic: 'Interview Q&A — SQL fundamentals questions', phase: 4 },
      { day: 26, topic: 'Interview Q&A — joins, aggregations, window functions', phase: 4 },
      { day: 27, topic: 'Live SQL problems — easy difficulty timed', phase: 4 },
      { day: 28, topic: 'Live SQL problems — medium difficulty timed', phase: 4 },
      { day: 29, topic: 'Data analysis case study — real business problem', phase: 4 },
      { day: 30, topic: 'Full mock interview simulation and certificate', phase: 4 }
    ]
  }
}

const getPhaseLabel = (phase) => {
  const phases = {
    1: 'Foundation',
    2: 'Building',
    3: 'Advanced',
    4: 'Interview Prep'
  }
  return phases[phase] || 'Foundation'
}

const getDaysBefore = (targetDate) => {
  const now = new Date()
  const target = new Date(targetDate)
  const diff = Math.ceil((target - now) / (1000 * 60 * 60 * 24))
  return diff
}

const calculateCompletionDate = (startDate, totalDays) => {
  const start = new Date(startDate)
  start.setDate(start.getDate() + totalDays)
  return start.toLocaleDateString('en-US', { 
    weekday: 'long',
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })
}

module.exports = { curriculum, getPhaseLabel, calculateCompletionDate }