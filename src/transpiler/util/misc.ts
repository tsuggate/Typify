import {Node} from 'estree';
const walk = require('estree-walker').walk;

export function traverse(program: Node, handler: (node: Node, parent: Node, context: any) => void) {
  walk(program, {
    enter(node: Node, parent: Node) {
      if (node.type) {
        handler(node, parent, this);
      }
    },
  });
}
