import React, { useState, useEffect } from 'react';

// NFL teams with no Super Bowl wins
const TEAMS_NO_SUPER_BOWL_WINS = [["Teams with 0 Super Bowl Wins"],
	["Bengals",
	"Bills",
	"Browns",
	"Cardinals",
	"Chargers",
	"Falcons",
	"Jaguars",
	"Lions",
	"Panthers",
	"Texans",
	"Titans",
	"Vikings"]
];

// NFL stadiums
const NFL_STADIUMS = [["NFL Stadiums"],
	["Lambeau",
	"Arrowhead",
	"Gillette",
	"SoFi",
	"Mercedes-Benz",
	"AT&T",
	"Soldier",
	"Ford",
	"Nissan",
	"Lumen"]
];

// NFL Defensive Players of the Year (first names included)
const DEFENSIVE_PLAYERS_OF_THE_YEAR = [["DPOY Winners"],
	["Lawrence Taylor",
	"Reggie White",
	"Deion Sanders",
	"Ray Lewis",
	"Ed Reed",
	"J.J. Watt",
	"Aaron Donald",
	"Stephon Gilmore",
	"Rodney Harrison",
	"Troy Polamalu",
	"Terrell Suggs",
	"Von Miller"]
];

// Super Bowl MVP wide receivers (first names included)
const SUPER_BOWL_MVP_RECEIVERS = [["Super Bowl MVP Receivers"],
	["Lynn Swann",
	"Deion Branch",
	"Fred Biletnikoff",
	"Jerry Rice",
	"Hines Ward",
	"Santonio Holmes",
	"Julian Edelman"]
];

// NFL teams that have relocated
const RELOCATED_TEAMS = [["Teams That Have Relocated"],
	["Cardinals",
	"Rams",
	"Chargers",
	"Raiders",
	"Colts",
	"Titans"]
];

// NFL running backs with 2000-yard seasons (first names included)
const RB_2000_YARD_SEASONS = [["2000yd RushYd Season"],
	["O.J. Simpson",
	"Eric Dickerson",
	"Barry Sanders",
	"Terrell Davis",
	"Jamal Lewis",
	"Chris Johnson",
	"Adrian Peterson",
	"Derrick Henry"]
];

// NFL rookies of the year (first names included)
const ROOKIES_OF_THE_YEAR = [["Former ROYs"],
	["Emmitt Smith",
	"Sean Taylor",
	"Ezekiel Elliott",
	"Randy Moss",
	"Ray Lewis",
	"Ronnie Lott",
	"Deion Sanders",
	"Gale Sayers",
	"Dick Butkus",
	"Tony Dorsett"]
];

// NFL kickers with most career field goals (first names included)
const FIELD_GOALS_LEADERS = [["Top 10 - Field Goals All-Time"],
	["Adam Vinatieri",
	"Morten Andersen",
	"Jason Hanson",
	"Jason Elam",
	"John Kasay",
	"Matt Stover",
	"Matt Bryant",
	"David Akers",
	"Sebastian Janikowski",
	"Phil Dawson"]
];

// NFL players who returned from retirement (first names included)
const PLAYERS_RETURNED_RETIREMENT = [["Players Who Returned from Retirement"],
	["Brett Favre",
	"Deion Sanders",
	"Randy Moss",
	"Robert Griffin III",
	"John Riggins",
	"Rob Gronkowski",
	"Joe Staley",
	"Emmitt Smith"]
];

// NFL siblings (first names included)
const NFL_SIBLINGS = [["NFL Siblings"],
	["Peyton Manning",
	"Eli Manning",
	"Tiki Barber",
	"Ronde Barber",
	"Devin McCourty",
	"Jason McCourty",
	"Shannon Sharpe",
	"Sterling Sharpe",
	"Travis Kelce",
	"Jason Kelce",
	"J.J. Watt",
	"T.J. Watt",
	"Maurkice Pouncey",
	"Mike Pouncey",
	"Shaquill Griffin",
	"Shaquem Griffin"]
];

// NFL players who have won MVP multiple times (first names included)
const MULTIPLE_MVP_WINNERS = [["Multi-Time MVP Winners"],
	["Peyton Manning",
	"Tom Brady",
	"Aaron Rodgers",
	"Brett Favre",
	"Johnny Unitas",
	"Jim Brown",
	"Joe Montana",
	"Steve Young"]
];

// NFL teams that have never changed their city
const TEAMS_NEVER_CHANGED_CITY = [["Teams That Never Changed City"],
	["Bears",
	"Packers",
	"Giants",
	"Lions",
	"Eagles",
	"Steelers",
	"Redskins"]
];

// NFL teams with bird mascots
const TEAMS_BIRD_MASCOTS = [["Bird Mascot Teams"],
	["Eagles",
	"Falcons",
	"Ravens",
	"Cardinals",
	"Seahawks"]
];

// NFL coaches with multiple Super Bowl wins (first names included)
const COACHES_MULTIPLE_SUPER_BOWL_WINS = [["Coaches with Multiple Super Bowls"],
	["Bill Belichick",
	"Chuck Noll",
	"Don Shula",
	"Joe Gibbs",
	"George Seifert",
	"Tom Landry",
	"Jimmy Johnson",
	"Bill Parcells"]
];

// NFL players who have played both offense and defense (first names included)
const TWO_WAY_PLAYERS = [["Two-Way Players"],
	["Chuck Bednarik",
	"Ernie Nevers",
	"Bronko Nagurski",
	"Night Train Lane",
	"Rod Woodson",
	"Jim Brown",
	"Charley Wilson",
	"Deion Sanders"]
];

// NFL players who have won both Heisman Trophy and NFL MVP (first names included)
const HEISMAN_NFL_MVP_WINNERS = [["Heisman and MVP Winners"],
	["Paul Hornung",
	"O.J. Simpson",
	"Marcus Allen",
	"Barry Sanders",
	"Eddie George",
	"Lamar Jackson",
	"Cam Newton",
	"Roger Staubach"]
];

// NFL players who transitioned to successful coaching careers (first names included)
const PLAYERS_TO_COACHES = [["Players-Turned-Coaches"],
	["Mike Ditka",
	"Joe Gibbs",
	"Bill Cowher",
	"Mike Singletary",
	"Frank Reich",
	"Mike Vrabel",
	"DeMeco Ryans",
	"Dan Campbell"]
];

// NFL teams with retractable roofs
const RETRACTABLE_ROOF_TEAMS = [["Teams with Retractable-Roof Stadiums"],
	["Cardinals",
	"Texans",
	"Cowboys",
	"Colts",
	"Falcons"]
];

// NFL players who played for only one team their entire career (first names included)
const ONE_TEAM_PLAYERS = [["Only-One-Team Players"],
	["Barry Sanders",
	"Peyton Manning",
	"Dan Marino",
	"Jim Kelly",
	"Brian Urlacher",
	"Troy Aikman",
	"Ronnie Lott"]
];

const LIST_NAMES = [
	TEAMS_NO_SUPER_BOWL_WINS,
	NFL_STADIUMS,
	DEFENSIVE_PLAYERS_OF_THE_YEAR,
	SUPER_BOWL_MVP_RECEIVERS,
	RELOCATED_TEAMS,
	RB_2000_YARD_SEASONS,
	ROOKIES_OF_THE_YEAR,
	FIELD_GOALS_LEADERS,
	PLAYERS_RETURNED_RETIREMENT,
	NFL_SIBLINGS,
	MULTIPLE_MVP_WINNERS,
	TEAMS_NEVER_CHANGED_CITY,
	TEAMS_BIRD_MASCOTS,
	COACHES_MULTIPLE_SUPER_BOWL_WINS,
	TWO_WAY_PLAYERS,
	HEISMAN_NFL_MVP_WINNERS,
	PLAYERS_TO_COACHES,
	RETRACTABLE_ROOF_TEAMS,
	ONE_TEAM_PLAYERS
];

const selectLists = () => {
	let groups = [];
	while(groups.length < 4) {
		let potentialNewGroup = LIST_NAMES[Math.floor(Math.random() * LIST_NAMES.length)];
		if(!groups.includes(potentialNewGroup)) {
			groups.push(potentialNewGroup);
		}
	}
	return groups;
}

const pickValues = (groups) => {
	let allNames = new Set();
	let options = [];

	for(let i = 0; i < groups.length; i++){
		let namesAdded = 0
		while(namesAdded < 4) {
			let potentialOption = groups[i][1][Math.floor(Math.random() * groups[i][1].length)];
			if(!allNames.has(potentialOption)) {
				options.push({name: potentialOption, groupName: groups[i][0][0], group: i + 1, guessed: false});
				allNames.add(potentialOption)
				namesAdded++;
			}
		}
	}

	return options;
}

	const sequence = () => {
		return pickValues(selectLists());
	}

let tempOptions = pickValues(selectLists());

export default sequence;