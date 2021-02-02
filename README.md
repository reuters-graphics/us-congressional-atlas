![](badge.svg)

# @reuters-graphics/us-congressional-atlas

[![npm version](https://badge.fury.io/js/%40reuters-graphics%2Fus-congressional-atlas.svg)](https://badge.fury.io/js/%40reuters-graphics%2Fus-congressional-atlas) [![Reuters open source software](https://badgen.net/badge/Reuters/open%20source/?color=ff8000)](https://github.com/reuters-graphics/)

Quick and easy access to meta information about members of U.S. Congress.

## Quickstart

```
$ yarn add @reuters-graphics/us-congressional-atlas
```

```javascript
// Import from the library by Congress number and chamber... 
import members from '@reuters-graphics/us-congressional-atlas/congress/117/senate';

/**
 * Get all members 
 */
members.getMembers();
// [ { ... }, { ... }, ... ]

/**
 * Get members by party
 */
members.getRepublicans();
members.getDemocrats(); // Includes independents who caucus with Democrats
members.getOthers();

/**
 * ... or all in one go ...
 */
members.getMembersByParty();
// { republicans: [ ... ], democrats: [ ... ], others: [ ... ] }

/**
 * ... or a shortcut if you just need the totals ...
 */
members.getSeatsByParty();
// { republicans: 50, democrats: 50, others: 0 }

/**
 * Get a single member...
 * 
 * ... using a candidate's name ...
 */
members.getMember('Rand Paul');
// { lastName: 'Paul', ... }

/**
 * ... using a candidate's seat ...
 * - Senate seat: state postal code + Senate class number
 * - House seat: state postal code + congressional district number
 */
members.getMember('KY 3');
// { lastName: 'Paul', ... }


/**
 * ... using a candidate's ID -- any of:
 *   bioguide, govtrack, cspan, votesmart, icpsr,
 *   crp, Google entity or FEC candidate ID
 */
members.getMember('P000603');
// { lastName: 'Paul', ... }
```

Member data:

```javascript
{
  id: "P000603",
  title: "Senator, 3rd Class",
  shortTitle: "Sen.",
  firstName: "Rand",
  middleName: null,
  lastName: "Paul",
  suffix: null,
  gender: "M",
  dateOfBirth: "1963-01-07",
  state: "KY",
  stateRank: "junior",
  senateClass: "3",
  party: "R",
  leadershipRole: null,
  nextElection: "2022",
  seniority: "11",
  ids: {
    bioguide: "P000603",
    govtrack: "412492",
    cspan: "9265241",
    votesmart: "117285",
    icpsr: "41104",
    crp: "N00030836",
    googleEntity: "/m/05pdb7q",
    fecCandidate: "S0KY00156"
  },
  images: {
    original: "https://graphics.thomsonreuters.com/data/us-congressional-atlas/P000603/original.jpg",
    "225x275": "https://graphics.thomsonreuters.com/data/us-congressional-atlas/P000603/225x275.jpg",
    "75x92": "https://graphics.thomsonreuters.com/data/us-congressional-atlas/P000603/75x92.jpg",
    "50x50": "https://graphics.thomsonreuters.com/data/us-congressional-atlas/P000603/50x50.jpg"
  }
}
```

## Building

#### Data
Data is pulled from the [ProPublica's Congress API](https://projects.propublica.org/api-docs/congress-api/members/). Add your API key to a `.env` file at the root of this project or export it as the environment variable `PROPUBLICA_API_KEY`.

The data pulled is driven by the Congress numbers exported in `index.js`. Add any additional Congresses there and then run:

```
$ yarn getMembers
```

Then run tests before you publish:

```
$ yarn test
```

#### Photos
Photos come from the [unitedstates](https://github.com/unitedstates/images) project and are resized and published to our own servers during the build.

You can overwrite the photo used by adding it to the `images/` directory named by the candidate's bioguide ID, e.g., `P000603.jpg`.

Once you've added custom photos, be sure to run:

```
$ yarn getMembers
```

... which will upload them to AWS. Then update and republish the library with:

```
$ yarn publish
```

## Testing

```
$ yarn test
```