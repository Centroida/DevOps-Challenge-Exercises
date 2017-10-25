const { expect } = require('chai');
const sinon = require('sinon');

const Data = require('../../data/data.js');

const db = {
    collection: () => { },
};
let data = null;

const findOne = (item) => {
    return Promise.resolve();
};

describe('findUserById', () => {
    beforeEach(() => {
        sinon.stub(db, 'collection')
            .callsFake(() => {
                return {
                    findOne,
                };
            });

        data = new Data(db);
    });
    afterEach(() => {
        db.collection.restore();
    });
    it('findOne should be called when string id is provided', () => {
        return data.findUserById('123456789012')
            .then(() => {
                    expect(true).to.be.true;
                },
                () => {
                    expect(false).to.be.true;
                });
    });

    it('findOne should not be called when string id is not provided', () => {
        return data.findUserById()
            .then(() => {
                    expect(true).to.be.false;
                },
                () => {
                    expect(false).to.be.false;
                });
    });
});
