// Copied from: https://university.alchemy.com/course/ethereum

const { assert } = require('chai');

const Trie = require('../Trie').Trie;


describe('Trie', () => {
    describe('with a single word', () => {
        let trie;
        beforeEach(() => {
            trie = new Trie();
            trie.insert('hey');
        });

        it('should connect the root to the first letter', () => {
            const firstNode = trie.root.children['h'];
            assert.equal(firstNode.key, 'h', 'expected the `key` of the first node to be `h`');
            assert(firstNode.children['e'], 'expected the `children` of the first node to have a connection to the next letter');
            assert.equal(firstNode.isWord, false, 'expected the `isWord` of the first node to be `false`');
        });

        it('should connect the root to the second letter', () => {
            const firstNode = trie.root.children['h'];
            const secondNode = firstNode.children['e'];
            assert.equal(secondNode.key, 'e', 'expected the `key` of the first node to be `e`');
            assert(secondNode.children['y'], 'expected the `children` of the second node to have a connection to the next letter');
            assert.equal(secondNode.isWord, false, 'expected the `isWord` of the second node to be `false`');
        });

        it('should connect the root to the third letter', () => {
            const firstNode = trie.root.children['h'];
            const secondNode = firstNode.children['e'];
            const thirdNode = secondNode.children['y'];
            assert.equal(thirdNode.key, 'y', 'expected the `key` of the first node to be `y`');
            assert.equal(Object.keys(thirdNode.children).length, 0, 'expected to have no `children` for the final node');
            assert.equal(thirdNode.isWord, true, 'expected the `isWord` of the final node to be `true`');
        });
    });

    describe('with three words', () => {
        let trie;
        let words = ['helipad', 'hello', 'hermit', 'hell'];
        beforeEach(() => {
            trie = new Trie();
            words.forEach(word => trie.insert(word));
        });

        words.forEach((word) => {
            describe(`for ${word}`, () => {
                it('should connect to the final letter', () => {
                    const finalNode = word.split("").reduce((node, letter) => node.children[letter], trie.root);
                    assert(finalNode);
                    assert.equal(finalNode.isWord, true, "expected the final node `isWord` to be set to true");
                });
            });
        });

        words.forEach((word) => {
            describe(`for ${word}`, () => {
                it('should return true when contains word', () => {
                    assert.equal(trie.hasNode(word), true);
                });
            });
        });

        describe(`should return false when doesn\'t contain word`, () => {
            it('same length, but diff last symbol', () => {
                assert.equal(trie.hasNode("hella"), false);
            });
            it('all diff symbols', () => {
                assert.equal(trie.hasNode("test"), false);
                assert.equal(trie.hasNode("cat"), false);
                assert.equal(trie.hasNode("airplane"), false);
            });
            it('same word, but with more symbols', () => {
                assert.equal(trie.hasNode("hello2"), false);
                assert.equal(trie.hasNode("hermits"), false);
                assert.equal(trie.hasNode("helipadddd"), false);
            });
            it('same word, but with less symbols', () => {
                assert.equal(trie.hasNode("heli"), false);
                assert.equal(trie.hasNode("hel"), false);
                assert.equal(trie.hasNode("hermi"), false);
            });
        });

        describe(`getAllNodes() tests`, () => {
            it('returns all words', () => {
                let allNodes = trie.getAllNodes();
                for (let i = 0; i < words.length; i++) {
                    assert.equal(allNodes.includes(words[i]), true, `${words[i]} expected to be in getAllNodes() output.\nExpected:${words}\nActual: ${allNodes}`)
                }
            });
        });
    });


    describe('with more words', () => {
        let trie;
        let words = ['cat', 'dog', 'hedgehog', 'airplane', 'computer', 'keyboard', 'key', 'bottle', 'glass', 'sun', 
            'sunshine', 'player', 'device', 'crypto', 'developer', 'computation'];
        beforeEach(() => {
            trie = new Trie();
            words.forEach(word => trie.insert(word));
        });

        describe(`getAllNodes() tests`, () => {
            it('returns all words', () => {
                let allNodes = trie.getAllNodes();
                for (let i = 0; i < words.length; i++) {
                    assert.equal(allNodes.includes(words[i]), true, `${words[i]} expected to be in getAllNodes() output.\nExpected:${words}\nActual: ${allNodes}`)
                }
            });
        });
    });
});

