const db = require('../db/users.json');
const fs = require('fs').promises;
const bufferDecoder = require('../utils/bufferDecoder/bufferDecoder');

const getUsers = async () => {
	try {
		const db = await fs.readFile(
			'../buffer-string-decoder/db/users.json',
			'utf8',
			(err) => {
				if (err) {
					return err.message;
				}
			},
		);

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
		];

		const buffer = Buffer.from(JSON.stringify(array), 'utf-8');
		// console.log('Training buffer: ', buffer);
		// console.log('Type of training buffer', typeof buffer);

		const stringBuffer = buffer.toString();
		// console.log('Stringified buffer in index.js: ', stringBuffer);
		// console.log(
		// 	'Type of stringified buffer in index.js: ',
		// 	typeof stringBuffer,
		// );

		const decodedBuffer = bufferDecoder(stringBuffer);
		console.log('Decoded buffer: ', decodedBuffer);
		return decodedBuffer;
	} catch (e) {
		return e.message;
	}
};

const addUser = async (body) => {
	console.log('Add user func body: ', body);
	const id = `${body.userName[0]}${body.userName[1]}${
		body.fullName[body.fullName.length - 2]
	}${body.fullName[body.fullName.length - 1]}${body.fullName[0]}${
		body.fullName[1]
	}`;
	const user = {id, ...body};
	const usersList = JSON.stringify([...db, user]);
	console.log(`Users list: ${usersList}`);
	try {
		fs.writeFile(
			'../training-with-kendo/mockServer/db/users.json',
			usersList,
			(err) => {
				if (err) {
					return err.message;
				}
			},
		);
		return user;
	} catch {
		return {};
	}
};

module.exports = {getUsers, addUser};
