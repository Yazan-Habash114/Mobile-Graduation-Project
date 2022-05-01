export const forwardChain = (KB, assertions) => {
    let inferences = []
    // Select the first rule.
    let ruleIndex = 0;
    let rule = KB[ruleIndex];
    // While there are more rules.
    while (ruleIndex < KB.length) {
        // If all premises in the rule are in assertions
        const allPremisesExist = rule.premises.every(premise =>
            assertions.some(assertion => assertion.attribute == premise.attribute && assertion.value == premise.value)
        );

        // If all premises from the rule are in the assertions but not the conclusion.
        if (allPremisesExist && !assertions.some(assertion => assertion.attribute == rule.conclusion.attribute && assertion.value == rule.conclusion.value)) {
            // Add the conclusion to assertions.
            assertions.push(rule.conclusion);
            inferences.push(rule.conclusion);
            // Go back to the first rule, since the new assertion might exist as a premise in another rule.
            // This can be optimized by sorting rules based on if A's conclusion is a premise in B's, then place A before B.
            ruleIndex = 0;
        }
        else {
            // Select the next rule.
            rule = KB[++ruleIndex];
        }
    }
    return {
        assertions: assertions,
        inferences: inferences
    };
};