function eval() {
    // Do not use eval!!!
    return;
}

let opPriority = {
    '+': 1,
    '-': 1,
    '*': 2,
    '/': 2,
    '(': -1,
};

function expressionCalculator(expr) {
    expr = expr.replace(/\+/g, ' + ')
        .replace(/\-/g, ' - ')
        .replace(/\*/g, ' * ')
        .replace(/\//g, ' / ')
        .replace(/\(/g, ' ( ')
        .replace(/\)/g, ' ) ');
    let tokens = expr.trim().split(/\s+/g);
    let opStack = [];
    let pExpr = '';
    tokens.forEach(e => {
        switch(e) {
            case '+':
            case '-':
            case '*':
            case '/':
                if (opStack.length === 0) {
                    opStack.push(e);
                } else {
                    let op1p = opPriority[e];
                    let op2p = opPriority[opStack[opStack.length - 1]];
                    while (op2p >= op1p) {
                        pExpr += ` ${opStack.pop()} `;
                        if (opStack.length === 0) break;
                        op2p = opPriority[opStack[opStack.length - 1]];
                    }
                    opStack.push(e);
                }
                break;
            case '(':
                opStack.push(e);
                break;
            case ')':
                if (opStack.length === 0) {
                    throw 'ExpressionError: Brackets must be paired';
                }
                let op = opStack.pop();
                while (op !== '(') {
                    if (opStack.length === 0) {
                        throw 'ExpressionError: Brackets must be paired';
                    }
                    pExpr += ` ${op} `;
                    op = opStack.pop();
                }
                break;
            default:
                pExpr += e + ' ';
                break;
        }
    });
    while (opStack.length > 0) {
        let op = opStack.pop();
        if (op === '(') {
            throw 'ExpressionError: Brackets must be paired';
        }
        pExpr += ` ${op} `;
    }
    tokens = pExpr.trim().split(/\s+/g);
    opStack = [];
    tokens.forEach(e => {
        let op1, op2;
        switch(e) {
            case '+':
                op1 = +opStack.pop();
                op2 = +opStack.pop();
                opStack.push(op2 + op1);
                break;
            case '-':
                op1 = +opStack.pop();
                op2 = +opStack.pop();
                opStack.push(op2 - op1);
                break;
            case '*':
                op1 = +opStack.pop();
                op2 = +opStack.pop();
                opStack.push(op2 * op1);
                break; 
            case '/':
                op1 = +opStack.pop();
                op2 = +opStack.pop();
                if (op1 === 0) {
                    throw 'TypeError: Division by zero.';
                }
                opStack.push(op2 / op1);
                break;
            default:
                opStack.push(e);
                break;  
        }
    });
    return opStack.pop();
}

module.exports = {
    expressionCalculator
}