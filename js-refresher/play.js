const add = (a, b) => a + b;
console.log(add(1, 2));

const addOne = a => a + 1;
console.log(2);

const person = {
    name: "Max",
    age: 29,
    // greet: () => {
    //     console.log("Hello! My name is " + this.name);
    // },
    greet() {
        console.log("Hello! My name is " + this.name);
    },
};
console.log('person', person);
person.greet();

const hobbies = ["Sports", "Cooking"];
for (let hobby of hobbies) {
    console.log('hobby', hobby);
}
console.log(hobbies);
console.log(hobbies.map(hobby => "Hobby: " + hobby));

const copiedArray = hobbies.slice();
console.log('copiedArray', copiedArray);

const toArray = (...args) => {
    return args;
}
console.log(toArray(1,2,3,4,5));


const fetchData = (callback) => {
    setTimeout(() => {
        callback("Done!");
    }, 1500);
};
setTimeout(() => {
    console.log("Timer is done!");
    fetchData(text => {
        console.log(text);
    });
}, 2000);
console.log("Hello!");
console.log("Hi!");


const fetchData1 = () => {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Done1!");
    }, 1500);
  });
  return promise;
};

setTimeout(() => {
  console.log("Timer is done1!");
  fetchData1()
    .then((text) => {
      console.log(text);
      return fetchData1();
    })
    .then((text2) => {
      console.log(text2);
    });
}, 2000);
console.log("Hello1!");
console.log("Hi1!");
