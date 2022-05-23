# buffer-string-decoder

## As for now it resolves array of object like this:

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
]}];

## And more complicated arrays of objects like theese:

<iframe
  src="https://carbon.now.sh/embed?bg=rgba%28171%2C+184%2C+195%2C+1%29&t=blackboard&wt=none&l=javascript&width=680&ds=true&dsyoff=20px&dsblur=68px&wc=true&wa=true&pv=56px&ph=56px&ln=false&fl=1&fm=Hack&fs=14px&lh=133%25&si=false&es=2x&wm=false&code=const%2520array%2520%253D%2520%255B%250A%2520%2520%257B%250A%2520%2520%2520%2520id%253A%2520%27ffrf%27%252C%250A%2509userName%253A%2520%27Pnevmat%27%252C%250A%2509fullName%253A%2520%27Vadim%2520Kravchenko%27%252C%250A%2509lastLogin%253A%2520%27Fri%2520March%252015%25202022%27%252C%250A%2509friends%253A%2520%255B%250A%2520%2520%2520%2520%2520%2520%257B%250A%2520%2520%2520%2520%2520%2520%2520%2520id%253A%2520%27hfg%27%252C%250A%2509%2509userName%253A%2520%27solomon%27%252C%250A%2509%2509fullName%253A%2520%27Kate%2520Barson%27%252C%250A%2509%2509lastLogin%253A%2520%27Fri%2520March%252015%25202022%27%252C%250A%2520%2520%2520%2520%2520%2520%257D%252C%250A%2520%2520%2520%2520%2520%2520%257B%250A%2520%2520%2520%2520%2520%2520%2520%2520id%253A%2520%27kdd%27%252C%250A%2509%2509userName%253A%2520%27utred%27%252C%250A%2509%2509fullName%253A%2520%27Ken%2520Livings%27%252C%250A%2509%2509lastLogin%253A%2520%27Fri%2520March%252015%25202022%27%252C%250A%2520%2520%2520%2520%2520%2520%257D%252C%250A%2520%2520%2520%2520%255D%252C%250A%2520%2520%2520%2520activities%253A%2520%255B%250A%2520%2520%2520%2520%2520%2520%257B%250A%2520%2520%2520%2520%2520%2520%2520%2520id%253A%2520%27fbpl%27%252C%250A%2520%2520%2520%2520%2520%2520%2520%2520activityName%253A%2520%27Football%27%252C%250A%2509%2509achievements%253A%2520%271st%2520place%2520on%2520university%2520tournament%27%252C%250A%2520%2520%2520%2520%2520%2520%257D%252C%250A%2520%2520%2520%2520%2520%2520%257B%250A%2520%2520%2520%2520%2520%2520%2520%2520id%253A%2520%27votp%27%252C%250A%2509%2509activityName%253A%2520%27voleiball%27%252C%250A%2509%2509achievements%253A%2520%27took%2520part%2520in%2520university%2520competitions%27%252C%250A%2520%2520%2520%2520%2520%2520%257D%252C%250A%2520%2520%2520%2520%255D%252C%250A%2520%2520%257D%252C%250A%255D%253B"
  style="width: 647px; height: 802px; border:0; transform: scale(1); overflow:hidden;"
  sandbox="allow-scripts allow-same-origin">
</iframe>

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
