const proxyquire = require('proxyquire');
const sinon = require('sinon');
const chai = require('chai');
const should = chai.should();
const Reservation = require('../../../../lib/schema/reservation');

describe('Reservation Schema', function() {
  const debugStub = function() {
    return sinon.stub();
  }
let reservations;

before(function() {
  reservations = proxyquire('../../../../lib/reservations', {
    debug: debugStub
  });
});

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

  context('Validator', function() {
    it('should pass a valid reservation with no optional fields', function(done) {
      const reservation = new Reservation({
        date:'2017/06/10',
        time:'o6:02 AM',
        party:4,
        name:'Family',
        email:'user@user.com'
      });

      reservation.validator(function(error,value) {
        value.should.deep.equal(reservation);
        done(error);
      });
    });

    it('should fail a invalid reservation with bad email', function(done) {
      const reservation = new Reservation({
        date:'2017/06/10',
        time:'o6:02 AM',
        party:4,
        name:'Family',
        email:'user'
      });

      reservation.validator(function(error) {
        error.should
        .be.an('error')
        .and.not.be.null;
        done();
      });
    });
  });
});
