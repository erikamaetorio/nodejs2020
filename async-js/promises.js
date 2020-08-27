const peoples = [
  {name: 'Gigi Goode', description:'This is about Gigi Goode'},
  {name: 'Crystal Methyd', description:'This is about Crystal Methyd'}
];

function getPeople() {
  setTimeout(() => {
    let output = '';
    peoples.forEach((people, i) => {
      output += `<li>${people.name}</li>`;
    });
    document.body.innerHTML = output;
  }, 1000);
}

function createPeople(people) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      peoples.push(people);

      const error = false;

      if(!error) {
        resolve();
      } else {
        reject('Error: Something went wrong'); //caught in the catch block
      }
    }, 2000);
  });
}

// createPeople({name: 'Aquaria', description: 'This is about Aquaria'})
//   .then(getPeople)
//   .catch(err => console.log(err));

//Promise.all
// const p1 = Promise.resolve('Hello World');
// const p2 = new Promise((resolve, reject) => {
//   setTimeout(resolve, 2000, 'Goode Morning');
// });
// const p3 = fetch('https://jsonplaceholder.typicode.com/users')
//   .then(res => res.json());

// Promise.all([p1, p2, p3])
//  .then(values => console.log(values));

//Async/Await
async function init() {
  await createPeople({name: 'Aquaria', description: 'This is about Aquaria'});
  getPeople(); //waits for createPeople before executed
}

init();