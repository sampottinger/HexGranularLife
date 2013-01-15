var constants = {};

var STEP_POP_DELTA = 0.1; // Amount a population in a cell can change in a step.
var MAX_POP = 1; // Carrying capacity for a cell
var MIN_POP = 0;

var JUST_BORN = MIN_POP + STEP_POP_DELTA;
var STARTED_DYING = MAX_POP - STEP_POP_DELTA;


if (typeof window === 'undefined') // Export for Node / unit testing
{
    exports.STEP_POP_DELTA = STEP_POP_DELTA;
    exports.MAX_POP = MAX_POP;
    exports.MIN_POP = MIN_POP;
    exports.JUST_BORN = JUST_BORN;
    exports.STARTED_DYING = STARTED_DYING;
}
else // Export for everyone else
{
    constants.STEP_POP_DELTA = STEP_POP_DELTA;
    constants.MAX_POP = MAX_POP;
    constants.MIN_POP = MIN_POP;
    constants.JUST_BORN = JUST_BORN;
    constants.STARTED_DYING = STARTED_DYING;
}