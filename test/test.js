const bufferStringDecoder = require('buffer-string-decoder');

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
				activities: [
					{
						id: 'rerf',
						achievements: [
							'took part in school competitions',
							'took part in university competitions',
						],
						activityName: 'Football',
					},
					{
						id: 'utt7g',
						activityName: 'voleiball',
						achievements: [
							'took part in school competitions',
							'1st place on university tournament',
							'took part in student national tournament',
						],
					},
				],
				friends: [
					{
						id: 'ffrf',
						userName: 'Pnevmat',
						fullName: 'Vadim Kravchenko',
						lastLogin: 'Fri March 15 2022',
						activities: [
							{
								id: 'fbpl',
								achievements: [
									'took part in school competitions',
									'1st place on university tournament',
									'took part in student national tournament',
								],
								activityName: 'Football',
							},
							{
								id: 'votp',
								activityName: 'voleiball',
								achievements: [
									'took part in school competitions',
									'took part in university competitions',
								],
							},
						],
					},
				],
			},
			{
				id: 'kdd',
				userName: 'utred',
				fullName: 'Ken Livings',
				lastLogin: 'Fri March 15 2022',
				activities: [
					{
						id: 'aetd',
						achievements: [
							'took part in school competitions',
							'took part in university competitions',
						],
						activityName: 'Football',
					},
					{
						id: 'utryb',
						activityName: 'voleiball',
						achievements: [
							'took part in school competitions',
							'1st place on university tournament',
							'took part in student national tournament',
						],
					},
				],
			},
		],
		activities: [
			{
				id: 'fbpl',
				achievements: [
					'took part in school competitions',
					'1st place on university tournament',
					'took part in student national tournament',
				],
				activityName: 'Football',
			},
			{
				id: 'votp',
				activityName: 'voleiball',
				achievements: [
					'took part in school competitions',
					'took part in university competitions',
				],
			},
		],
		autorisation: {
			login: 'pnevmat',
			password: 'cderfv',
			someProp: [
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
				activities: [
					{
						id: 'rerf',
						achievements: [
							'took part in school competitions',
							'took part in university competitions',
						],
						activityName: 'Football',
					},
					{
						id: 'utt7g',
						activityName: 'voleiball',
						achievements: [
							'took part in school competitions',
							'1st place on university tournament',
							'took part in student national tournament',
						],
					},
				],
				friends: [
					{
						id: 'ffrf',
						userName: 'Pnevmat',
						fullName: 'Vadim Kravchenko',
						lastLogin: 'Fri March 15 2022',
						activities: [
							{
								id: 'fbpl',
								achievements: [
									'took part in school competitions',
									'1st place on university tournament',
									'took part in student national tournament',
								],
								activityName: 'Football',
							},
							{
								id: 'votp',
								activityName: 'voleiball',
								achievements: [
									'took part in school competitions',
									'took part in university competitions',
								],
							},
						],
					},
				],
			},
			{
				id: 'kdd',
				userName: 'utred',
				fullName: 'Ken Livings',
				lastLogin: 'Fri March 15 2022',
				activities: [
					{
						id: 'aetd',
						achievements: [
							'took part in school competitions',
							'took part in university competitions',
						],
						activityName: 'Football',
					},
					{
						id: 'utryb',
						activityName: 'voleiball',
						achievements: [
							'took part in school competitions',
							'1st place on university tournament',
							'took part in student national tournament',
						],
					},
				],
			},
		],
		activities: [
			{
				id: 'fbpl',
				achievements: [
					'took part in school competitions',
					'1st place on university tournament',
					'took part in student national tournament',
				],
				activityName: 'Football',
			},
			{
				id: 'votp',
				activityName: 'voleiball',
				achievements: [
					'took part in school competitions',
					'took part in university competitions',
				],
			},
		],
		autorisation: {
			login: 'pnevmat',
			password: 'cderfv',
			someProp: [
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

// Also decoder was tested in thees cases:

// 'dghjyjyjyjyjyj'
// ['nbb', 'sfrggrgr', 'dfdfgrg', 'kbhghg'];
// ['1', 'sdfrgrgrg', 'dfggrgrf', '3'];
// {someProperty: 'dffgg', nextProperty: 'pofkjm'};
// [['nbb', 'sfrggrgr', 'dfdfgrg', 'kbhghg'], ['nbb', 'sfrggrgr', 'dfdfgrg', 'kbhghg']];

const stringBuffer = JSON.stringify(array);
const decodedBuffer = bufferStringDecoder(stringBuffer);
console.log('Decoded buffer: ', decodedBuffer);