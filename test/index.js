require('dotenv').config();
const senateMembers = require('../congress/117/senate');
const houseMembers = require('../congress/117/house');
const expect = require('expect.js');

describe('test Us Congressional Membership', function() {
  this.timeout(10000);

  it('Should get members by any ID', function() {
    let member = senateMembers.getMember('P000603');
    expect(member.id).to.be('P000603');
    member = senateMembers.getMember(member.ids.govtrack);
    expect(member.id).to.be('P000603');
    member = senateMembers.getMember(member.ids.cspan);
    expect(member.id).to.be('P000603');
    member = senateMembers.getMember(member.ids.votesmart);
    expect(member.id).to.be('P000603');
    member = senateMembers.getMember(member.ids.icpsr);
    expect(member.id).to.be('P000603');
    member = senateMembers.getMember(member.ids.crp);
    expect(member.id).to.be('P000603');
    member = senateMembers.getMember(member.ids.googleEntity);
    expect(member.id).to.be('P000603');
    member = senateMembers.getMember(member.ids.fecCandidate);
    expect(member.id).to.be('P000603');
  });

  it('Should get a member by seat', function() {
    let member = houseMembers.getMember('ND At-Large');
    expect(member.id).to.be('A000377');
    member = senateMembers.getMember('LA 3');
    expect(member.id).to.be('K000393');
  });

  it('Should get a member by a name', function() {
    let member = houseMembers.getMember('Aderholt');
    expect(member.id).to.be('A000055');
    member = houseMembers.getMember('Jake Auchincloss');
    expect(member.id).to.be('A000148');
  });
});
