/**
 * Seminar 2.3 Binary search tree
 */

class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}


class Tree {
    constructor() {
        this.root = null;
    }

    addNext(child, parent) {
        if (child.data < parent.data) {
            if (parent.left) {
                this.addNext(child, parent.left);
            }
            else {
                parent.left = child;
            }
        }
        else {
            if (parent.right) {
                this.addNext(child, parent.right);
            }
            else {
                parent.right = child;
            }
        }
    }

    addNode(node) {
        if (this.root) {
            this.addNext(node, this.root);
        }
        else {
            this.root = node;
        }
    }

    hasNext(node, data) {
        if (node === null) {
            return false;
        }
        if (node.data === data) {
            return true;
        }
        if (node.data > data) {
            return this.hasNext(node.left, data);
        }
        else {
            return this.hasNext(node.right, data);
        }
    }

    hasNode(data) {
        if (!this.root) {
            return false;
        }
        return this.hasNext(this.root, data);
    }

}



module.exports = { Node, Tree }
