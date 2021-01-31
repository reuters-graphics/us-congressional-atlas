import members from 'congress-chamber-membership';

class UsCongressMembership {
  constructor(members) {
    this._members = members;
    this._chamber = members[0].senateClass ? 'senate' : 'house';
  }

  _getMemberById(id) {
    return this._members.find(m => Object.values(m.ids).includes(id));
  }

  _getMemberBySenateSeat(seat) {
    return this._members.find(m => `${m.state} ${m.senateClass}` === seat);
  }

  _getMemberByHouseSeat(seat) {
    return this._members.find(m => `${m.state} ${m.district}` === seat);
  }

  _getMemberBySeat(seat) {
    if (this._chamber === 'senate') return this._getMemberBySenateSeat(seat);
    return this._getMemberByHouseSeat(seat);
  }

  _getMemberByName(name) {
    return this._members.find(m => `${m.firstName} ${m.lastName}`.includes(name));
  }

  getMember(idSeatOrName) {
    if (!idSeatOrName) throw new Error('You must pass a member\'s ID, seat or name to this method.');
    let member = this._getMemberById(idSeatOrName);
    if (member) return { ...member };
    member = this._getMemberBySeat(idSeatOrName);
    if (member) return { ...member };
    member = this._getMemberByName(idSeatOrName);
    if (member) return { ...member };
    return null;
  }

  getMembers() {
    // Shallow clone
    return this._members.map(m => ({ ...m }));
  }

  getRepublicans() {
    return this.getMembers().filter(m => ['R', 'IR'].includes(m.party));
  }

  getDemocrats() {
    return this.getMembers().filter(m => ['D', 'ID'].includes(m.party));
  }

  getOthers() {
    return this.getMembers().filter(m => !['D', 'ID', 'R', 'IR'].includes(m.party));
  }

  getMembersByParty() {
    return {
      republicans: this.getRepublicans(),
      democrats: this.getDemocrats(),
      others: this.getOthers(),
    };
  }

  getSeatsByParty() {
    return {
      republicans: this.getRepublicans().length,
      democrats: this.getDemocrats().length,
      others: this.getOthers().length,
    };
  }

  getMembersByState(statePostalCode) {
    if (!statePostalCode) throw new Error('You must pass a state postal code to this method.');
    return this.getMembers().filter(m => m.state === statePostalCode);
  }

  getMembersByNextElection(year) {
    if (!year) throw new Error('You must pass a year to this method.');
    return this.getMembers().filter(m => m.nextElection === year);
  }
}

const membership = new UsCongressMembership(members);

export default membership;
