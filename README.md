# buffer-string-decoder

## As for now it resolves array of object like this:

```image
const array = [
 {
  id: 'ffrf',
  userName: 'Pnevmat',
  friends: [
   {
    id: 'hfg',
    userName: 'solomon',
   },
   {
    id: 'kdd',
    userName: 'utred',
   },
  ]
 }
];
```

## And more complicated arrays of objects like theese:

```image
const array = [
 {
  id: 'ffrf',
  userName: 'Pnevmat',
  fullName: 'Vadim Kravchenko',
  lastLogin: 'Fri March 15 2022',
  friends: [
   {
    id: 'hfg',
    userName: 'solomon',
    fullName: 'Kate Barson',
    lastLogin: 'Fri March 15 2022',
   },
   {
    id: 'kdd',
    userName: 'utred',
    fullName: 'Ken Livings',
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
  ]
 },
];
```

```image
const array = [
 {
  id: 'ffrf',
  userName: 'Pnevmat',
  fullName: 'Vadim Kravchenko',
  friends: [
   {
    id: 'hfg',
    userName: 'solomon',
    fullName: 'Kate Barson',
    lastLogin: 'Fri March 15 2022',
   },
   {
    id: 'kdd',
    userName: 'utred',
    fullName: 'Ken Livings',
    lastLogin: 'Fri March 15 2022',
   },
  ],
  lastLogin: 'Fri March 15 2022',
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
 },
];
```

```image
const array = [
 {
  id: 'ffrf',
  userName: 'Pnevmat',
  fullName: 'Vadim Kravchenko',
  friends: [
   {
    id: 'hfg',
    userName: 'solomon',
    fullName: 'Kate Barson',
    lastLogin: 'Fri March 15 2022',
   },
   {
    id: 'kdd',
    userName: 'utred',
    fullName: 'Ken Livings',
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
  lastLogin: 'Fri March 15 2022',
 },
];
```
