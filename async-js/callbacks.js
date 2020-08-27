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

function createPeople(people, callback) {
  setTimeout(() => {
    peoples.push(people);
    callback();
  }, 2000);
}

createPeople({name: 'Aquaria', description: 'This is about Aquaria'}, getPeople);