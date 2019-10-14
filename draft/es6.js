
// class A { }
// class B extends A { }
// let a = new A(),
//   b = new B()
// console.log(b.__proto__ === a.__proto__)
// console.log(b.__proto__.__proto__ === a.__proto__)


// class Rectangle {
//   constructor(length, width) {
//     console.log(new.target === Rectangle);
//     // ...
//   }
// }
// class Square extends Rectangle {
//   constructor(length) {
//     super(length, 4);
//   }
// }

// var obj = new Square(3);
// var obj = new Rectangle(3,3);



// class Foo {
//   static bar() {
//     this.baz();
//   }
//   // static baz() {
//   //   console.log('静态方法 ---> hello');
//   // }
//   baz() {
//     console.log('实例方法 ---> world');
//   }
// }
// let f = new Foo()
// f.baz()
// Foo.bar()


// function pro() {
//   return new Promise((resolve, reject) => {
//     resolve('pro')
//   })
// }
// pro()
//   .then(data => {
//     console.log('1')
//   })
//   .then(data => {
//     console.log('2')
//   })
//   .then(data => {
//     console.log('3')
//     throw new Error('err333')
//   })
//   .then(data => {
//     console.log('4')
//   })
//   .then(data => {
//     console.log('5')
//   })
//   .catch((err) => {
//     console.log('catch err!',err)
//   })



// class Logger {
//   print() {
//     console.log('this --- > ',this)
//   }
// }
// const logger = new Logger();
// logger.print()
// const { print } = logger;
// print(); 



// let str = "Surviving the Arctic: The Inuit Way of life"
// console.log(str.length)


// let arr = ['aa', 'vv', 'bb']
// console.log(arr instanceof Number)
// console.log(arr instanceof Array)

// let str = 'Cat accidentaly\nsold with mattress\nback home';
// str = str.replace(/\n/g, ' ');

// console.log(str.substring(0, 25)+'...')


// let positionArr = [[1312, 160], [1248, 302], [1209, 334], [1152, 503], [1290, 504], [1329, 369], [1318, 316], [1356, 175]];
// let baseP = [1062, 112];
// let targetArr = [];

// for (let i in positionArr) {
//   let [x, y] = positionArr[i],
//     [a, b] = baseP;

//   targetArr.push([x * 1 + 40 - a * 1, y * 1 + 60 - b * 1]);
// }

// console.log('targetArr --- > ', targetArr)


// let numArr1 = [
//   20,
//   21,
//   22,
//   33,
//   34,
//   35,
//   7,
//   1222,
//   1223,
//   5
// ]
// function bubbleSort(arr) {
//   let i = arr.length, j;
//   while (i > 0) {
//     for (j = 0; j < i - 1; j++) {
//       if (arr[j] > arr[j + 1]) {
//         [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
//       }
//     }
//     i--;
//   }
//   return arr;
// }

// console.log('bubbleSort --- > ', bubbleSort(numArr1))

// function ArrPhaseCount(numArr) {
//   let count = 0,
//     numCursor = undefined;
//   for (let i in numArr) {
//     if (i === 0) {
//       count++;
//     }
//     if (i !== 0) {
//       if (numCursor + 1 !== numArr[i]) {
//         count++;
//       }
//     }
//     numCursor = numArr[i]
//   }
//   return count;
// }


// console.log('Phase --- > ', ArrPhaseCount(numArr1))










// let str = 'question ma'
// console.log('str.length --- > ', str.length)


// let durationArr = [200, 300, 400],
//   resolveArr = [];

// function generate(duration) {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => { resolve() }, duration)
//   })
// }

// function factory() {
//   for (let i in durationArr) {
//     resolveArr.push(generate(durationArr[i]).then(() => {
//       console.log(i, ' --- ', 'yes')
//     }))
//   }
//   return resolveArr
// }

// let pro = Promise.resolve();
// pro = pro
//   .then(() => {
//     console.log('1p')
//   })
//   .then(() => {
//     return factory()
//   })
//   .then(() => {
//     console.log('2p')
//   })

// console.log('one');
// // 异步宏
// setTimeout(function () {
//   console.log('two');
// }, 0);
// // 异步微
// Promise.resolve().then(function () {
//   console.log('three');
// })
// console.log('four');

// let str = "To show something in front of a group of people. At museums, many things are displayed for people to look at and learn about."
// let arr = str.split(' ')

// function test() {
//   for (let i in arr) {
//     setTimeout(() => {
//       console.log('---- > ', i, '_', arr[i])
//     }, i * 300)
//     setTimeout(() => {
//       console.log('+3---- > ', i, '_', arr[i])
//     }, i * 300 + 300)
//   }
// }
// test()

// let sentence = "Sharks use their strong olfactory sense to find food. They can smell a few drops of blood in the water from far away."
// let arr = sentence.split(' '),
//   time = [
//     600,
//     300,
//     450,
//     500,
//     700,
//     450,
//     200,
//     400,
//     400,
//     400,
//     300,
//     450,
//     100,
//     300,
//     450,
//     200,
//     450,
//     200,
//     300,
//     450,
//     400,
//     300,
//     400
//   ];
// console.log(' -----  > arr:', arr.length, ' -----  > time:', time.length)

// let arr = [];
// for (let i = 0; i < 3; i++) {
//   arr.push(Math.floor(Math.random() * 3))
// }

// console.log(arr);

// let str = "Underwater you can ____ hear a whale's call, even if"
// console.log(str.length)


// let str = "A Survivor's View of the   Titanic",
//   arr = str.split(' '),
//   idxArr = [];

// for (let i in arr) {
//   if (arr[i]) {
//     idxArr.push(arr[i])
//   }
// }

// console.log('idxArr --- > ', idxArr)

// let str1 = "Shauna ran across the soccer field toward her best friend, Ryan, who was heading\ntoward the goal with the ball. But when she was almost close enough to swipe the\nball, Ryan tripped over something and fell onto the grass.";
// let arr1 = str1.split(' ')
// console.log('length --- > ', arr1.length)

// let str2 = "Ryan was quiet for a moment, looking at the ground between them. \"I\nknow- -I was just mad that I tripped. I didn't mean to hurt your feelings.\nCan we still be friends?\"\nShauna grinned, relieved that Ryan wasn't still mad at her. \"Okay, but\nnext time you trip, get mad at the ground instead of me!\"",
// arr2 = str2.split(' ')
// console.log('length --- > ', arr2.length)
// let arr1 = [45], arr2 = [34, 54, 65];
// console.log(arr1, ' --- > ', parseInt(arr1))
// console.log(arr2, ' --- > ', parseInt(arr2))