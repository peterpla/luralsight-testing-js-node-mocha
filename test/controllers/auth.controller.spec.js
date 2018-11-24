var assert = require('assert');
var authController = require('../../controllers/auth.controller');
var expect = require('chai').expect;
var should = require('chai').should();
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
chai.should();

describe('AuthController', function () {
    beforeEach(function () {
        console.log('running before each');
        authController.setRoles(['user']);
    });

    describe('isAuthorized', function () {
        it('Should return false if not authorized', function () {
            var isAuth = authController.isAuthorized('admin');
            isAuth.should.be.false;
        })
        it('Should return true if authorized', function () {
            authController.setRoles(['user', 'admin']);
            var isAuth = authController.isAuthorized('admin');
            isAuth.should.be.true;
        })
    })

    describe('isAuthorizedAsync', function () {
        it('Should return false if not authorized', function (done) {
            authController.isAuthorizedAsync('admin',
                function (isAuth) {
                    assert.equal(false, isAuth);
                    done();
                });
        })
    })

    describe('isAuthorizedPromise', function () {
        it('Should return false if not authorized', function () {
            // want "this" to refer to Mocha's context, so don't use arrow functions
            return authController.isAuthorizedPromise('admin').should.eventually.be.false;
        })
    })

});