# buffer-string-decoder

This pacage was designed for decoding result of fs.readFile in Node.js backend, and today version of it is 01.00 .
Note that the file must be a Json file and the data in it must be in Json format.

## Installation

`npm install buffer-string-decoder`

## Usage

If you use fs.readFile:

```
const bufferDecoder = require('buffer-string-decoder');

const db = fs.readFile(
	'file/path/db.json',
	'utf8',
	(err) => {
		if (err) {
			return err.message
		}
	}
);

const decodedBuffer = bufferDecoder(db);
```

If you need for some reason to make buffer from js object, then use it like this:

```
const bufferDecoder = require('buffer-string-decoder');

const array = ['some value', 'some value', 'another value'];

const buffer = Buffer.from(JSON.stringify(array), 'utf-8');

const stringBuffer = buffer.toString();

const decodedBuffer = bufferDecoder(stringBuffer);
```

## As for now it resolves:

Simple objects like this:

```image
{
 id: 'some id',
 someProperty: 'some value',
 anotherProperty: 'another value'
}
```

Simple arrays like this:

```image
[
 'some value',
 'another value',
 '123'
]
```

Note! Pass numbers to simple array only as string, other way decoder will work not correctly.

Arrays of object like this:

```image
const array = [
 {
  id: 'ffrf',
  userName: 'Some user name',
  friends: [
   {
    id: 'hfg',
    userName: 'some user name',
   },
   {
    id: 'kdd',
    userName: 'some user name',
   },
  ]
 }
];
```

And more complicated arrays of objects like this in all variations:

```image
const array = [
 {
  id: 'ffrf',
  userName: 'some user name',
  fullName: 'Some Full Name',
  lastLogin: 'Fri March 15 2022',
  friends: [
   {
    id: 'hfg',
    userName: 'some user name',
    fullName: 'Some Full Name',
    lastLogin: 'Fri March 15 2022',
   },
   {
    id: 'kdd',
    userName: 'some user name',
    fullName: 'Some Full Name',
    lastLogin: 'Fri March 15 2022',
   },
  ],
  activities: [
   {
    id: 'fbpl',
    activityName: 'Football',
    achievements: '1st place on university tournament',
   },
   {
    id: 'votp',
    activityName: 'voleiball',
    achievements: 'took part in university competitions',
   },
  ],
	autorisation: {
   login: 'some login',
   password: 'some password',
   someProperty: [
    {
     id: 'votp',
     activityName: 'voleiball',
     achievements: [
      'took part in school competitions',
      'took part in university competitions',
     ],
    },
    {
     id: 'fbpl',
     achievements: [
      'took part in school competitions',
      '1st place on university tournament',
      'took part in student national tournament',
     ],
     activityName: 'Football',
    },
   ],
  },
 },
];
```

It is version 01.00, so it may still contain bugs
