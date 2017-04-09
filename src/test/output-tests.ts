import {matchOutput} from './shared';
import {getTestFile} from '../transpiler/util/file-reader';

/*
 let program: Program = esprima.parse(code, {
    range: true, tokens: true, comment: true
 });

 program = escodegen.attachComments(program, program['comments'], program['tokens']);

 const outCode = escodegen.generate(program, {
    comment: true
 });
 */


describe('variable declarations', () => {

   matchOutput('var a = 5');
   matchOutput('var a = 5, b = 2, c = 1');

});

describe('operators', () => {
   matchOutput('var a = n / 2;');
});


describe('lots of code', () => {
   const code = getTestFile('simple');

   if (code) {
      matchOutput(code);
   }
});
