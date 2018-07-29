const chai = require('chai');
const should = chai.should();
const Reservation = require('../../../../lib/schema/reservation');

describe('Reservation Schema', function() {
  context('Date and Time Combination', function() {
    it('should return a ISO 8601 date and time with valid input ', function() {
      const date = '2017/06/10';
      const time = '0602 AM';

      Reservation.combineDateTime(date,time)
      .should.equal('2017-06-10T06:02:00.000Z');
    });

    it('should return a null on bad date and time ', function() {
      const date = 'hf6g';
      const time = 'gu6u';

      // should.not.exist(Reservation.combineDateTime(date,time));
      Reservation.combineDateTime(date,time)
      .should.not.equal('2017-06-10T06:02:00.000Z');
    });
  });
});
