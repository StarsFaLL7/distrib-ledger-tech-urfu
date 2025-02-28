/**
 * Seminar 2.2 Transaction output
 */

const SHA256 = require('ethereum-cryptography/sha256').sha256;
const utf8ToBytes = require('ethereum-cryptography/utils').utf8ToBytes;


class Transaction {
    constructor(from, to, value) {
        this.from = from;
        this.to = to;
        this.value = value;
        this.spent = false;
        this.hash = null;
    }

    spend() {
        if (this.spent) {
            throw new Error('Already spended!');
        }
        this.hash = SHA256(utf8ToBytes(this.from + this.to + this.value));
        this.spent = true;
    }
}

module.exports = { Transaction }
