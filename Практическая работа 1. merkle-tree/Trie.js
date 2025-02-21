/**
 * Seminar 2.5 Simple Trie
 */


class TrieNode {
    constructor(key) {
        this.key = key;
        this.children = {};
        this.isWord = false;
    }
}


class Trie {
    constructor() {
        this.root = new TrieNode(null);
    }

    insert(word) {
        let node = this.root;
        for (let i = 0; i < word.length; i++) {
            let symbol = word[i];
            if (!node.children[symbol]) {
                node.children[symbol] = new TrieNode(symbol);
            }
            node = node.children[symbol];
            if (i === word.length - 1) {
                node.isWord = true;
            }
        }
    }

    hasNode(word){
        let node = this.root;
        for (let i = 0; i < word.length; i++) {
            let symbol = word[i];
            if (!node.children[symbol]) {
                return false;
            }
            node = node.children[symbol];
            if (i === word.length - 1) {
                return node.isWord;
            }
        }
        return false;
    }

    getAllNodes(){
        return this.getSymbols([], "", this.root);
    }
    
    getSymbols(prevNodes, curWord, node) {
        if (node.key) {
            curWord += node.key;
        }
        if (node.isWord) {
            prevNodes.push(curWord);
            if (node.children.length === 0) {
                return prevNodes;
            }
        }
        for (let key in node.children) {
            this.getSymbols(prevNodes, curWord, node.children[key])
        }
        return prevNodes;
    }
}

module.exports = { Trie };
