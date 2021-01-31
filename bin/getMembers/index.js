const CONGRESSES = require('../../index.js');
const axios = require('axios');
const pick = require('lodash/pick');
const camelcaseKeys = require('camelcase-keys');
const fs = require('fs');
const path = require('path');
const getImages = require('./images');
require('dotenv').config();

const CHAMBERS = ['senate', 'house'];

const ID_DATA = [
  'id',
  'title',
  'shortTitle',
  'firstName',
  'middleName',
  'lastName',
  'suffix',
  'gender',
  'dateOfBirth',
];

const HOUSE_MEMBERSHIP_DATA = [
  'state',
  'district',
  'party',
  'leadershipRole',
  'nextElection',
  'seniority',
];

const SENATE_MEMBERSHIP_DATA = [
  'state',
  'stateRank',
  'senateClass',
  'party',
  'leadershipRole',
  'nextElection',
  'seniority',
];

const IDS = [
  'id',
  'govtrack_id',
  'cspan_id',
  'votesmart_id',
  'icpsr_id',
  'crp_id',
  'google_entity_id',
  'fec_candidate_id',
];

const formatIDs = (member) => {
  const id = pick(member, IDS);
  const m = {};
  Object.keys(id).forEach((key) => {
    if (key === 'id') m.bioguide = id[key]; else m[key.replace('_id', '')] = id[key];
  });
  return { ids: camelcaseKeys(m) };
};

const formatMembers = (members, MEMBERSHIP_DATA) => {
  const memberIDs = members.map(m => formatIDs(m));
  members = camelcaseKeys(members);
  return members
    .map(m => pick(m, [...ID_DATA, ...MEMBERSHIP_DATA]))
    .map(member => ({ ...member, ...memberIDs.find(m => m.ids.bioguide === member.id) }));
};

const fetchChamber = async(congress, chamber) => {
  const { data } = await axios.get(
    `https://api.propublica.org/congress/v1/${congress}/${chamber}/members.json`,
    { headers: { 'X-API-KEY': process.env.PROPUBLICA_API_KEY } }
  );
  const members = data.results[0].members;
  return chamber === 'house' ?
    formatMembers(members, HOUSE_MEMBERSHIP_DATA) :
    formatMembers(members, SENATE_MEMBERSHIP_DATA);
};

const writeMembersData = (members, congress, chamber) => {
  const file = path.resolve(__dirname, `../../data/congresses/${congress}/${chamber}/members.json`);
  if (!fs.existsSync(path.dirname(file))) fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, JSON.stringify(members, null, 2));
};

const fetchCongress = async(congress) => {
  console.log(`> ${congress}th Congress`);
  for (const chamber of CHAMBERS) {
    console.log(`> > ${chamber}`);
    let members = await fetchChamber(congress, chamber);
    const memberImages = await getImages(members);
    members = members.map(m => ({ ...m, images: memberImages[m.id] }));
    writeMembersData(members, congress, chamber);
  }
};

const fetch = async() => {
  for (const congress of CONGRESSES) {
    await fetchCongress(congress);
  }
};

fetch();
