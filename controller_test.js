/**
 * Tests for probabilistic Conway's Game of Life non-GUI logic.
 *
 * @author Sam Pottinger
 * @license GNU GPL v3
**/

var constants = require("./constants");
var controller = require("./controller");
var grid = require("./grid");

/**
 * High level driver for all of the controller module tests.
**/
function runControllerTests()
{
    console.log(">> Running controller tests...");
    testLonelyDeath();
    testLonelyDeathOne();
    testOverpopulationDeath();
    testBirth();
    testStasisLive();
    testStasisDead();
    console.log(">> Finished controller tests.");
}


/**
 * Test that a population / space with no neighbors decreases in population.
**/
function testLonelyDeath()
{
    var testGrid = new grid.HexagonalGrid(3, 3);
    
    testGrid.clearGrid();

    testGrid.startStagingGrid();
    testGrid.setSpaceVal(1, 1, constants.MAX_POP);
    testGrid.endStagingGrid();

    controller.takeStep(testGrid);
    if(testGrid.getSpaceVal(1, 1) != constants.STARTED_DYING)
    {
        console.log(
            "FAIL(testLonelyDeath): Cell expected to die but didn\'t."
        );
    }
}


/**
 * Test that a space with a surrounding population of 1 decreases in population.
**/
function testLonelyDeathOne()
{
    var testGrid = new grid.HexagonalGrid(3, 3);
    
    testGrid.clearGrid();

    testGrid.startStagingGrid();
    testGrid.setSpaceVal(1, 1, constants.MAX_POP);
    testGrid.setSpaceVal(0, 0, constants.MAX_POP);
    testGrid.endStagingGrid();

    controller.takeStep(testGrid);
    if(testGrid.getSpaceVal(1, 1) != constants.STARTED_DYING)
    {
        console.log(
            "FAIL(testLonelyDeathOne): Cell expected to die but didn\'t."
        );
    }
}


/**
 * Test that a space whose surrounding spaces are overpopulating it shrinks.
**/
function testOverpopulationDeath()
{
    var testGrid = new grid.HexagonalGrid(3, 3);
    
    testGrid.clearGrid();

    testGrid.startStagingGrid();
    testGrid.setSpaceVal(1, 1, constants.MAX_POP);
    testGrid.setSpaceVal(0, 0, constants.MAX_POP);
    testGrid.setSpaceVal(0, 1, constants.MAX_POP);
    testGrid.setSpaceVal(1, 2, constants.MAX_POP);
    testGrid.setSpaceVal(1, 0, constants.MAX_POP);
    testGrid.endStagingGrid();

    controller.takeStep(testGrid);
    if(testGrid.getSpaceVal(1, 1) != constants.STARTED_DYING)
    {
        console.log(
            "FAIL(testOverpopulationDeath): Cell expected to die but didn\'t."
        );
    }
}


/**
 * Test that a space's population grows when surrounded by the right population.
**/
function testBirth()
{
    var testGrid = new grid.HexagonalGrid(3, 3);
    
    testGrid.clearGrid();

    testGrid.startStagingGrid();
    testGrid.setSpaceVal(1, 1, constants.MIN_POP);
    testGrid.setSpaceVal(0, 0, constants.MAX_POP);
    testGrid.setSpaceVal(0, 1, constants.MAX_POP);
    testGrid.setSpaceVal(1, 2, constants.MAX_POP);
    testGrid.endStagingGrid();

    controller.takeStep(testGrid);
    if(testGrid.getSpaceVal(1, 1) != constants.JUST_BORN)
    {
        console.log(
            "FAIL(testBirth): Cell expected to be born but didn\'t."
        );
    }
}


/**
 * Test that a full population neither increases or decreases without pressure.
**/
function testStasisLive()
{
    var testGrid = new grid.HexagonalGrid(3, 3);
    
    testGrid.clearGrid();

    testGrid.startStagingGrid();
    testGrid.setSpaceVal(1, 1, constants.MAX_POP);
    testGrid.setSpaceVal(0, 0, constants.MAX_POP);
    testGrid.setSpaceVal(0, 1, constants.MAX_POP);
    testGrid.endStagingGrid();

    controller.takeStep(testGrid);
    if(testGrid.getSpaceVal(1, 1) != constants.MAX_POP)
    {
        console.log(
            "FAIL(testStasisLive): Cell expected to stay alive but didn\'t."
        );
    }
}


/**
 * Test that an empty space does not spawn life without the right surroundings.
**/
function testStasisDead()
{
    var testGrid = new grid.HexagonalGrid(3, 3);
    
    testGrid.clearGrid();

    testGrid.startStagingGrid();
    testGrid.setSpaceVal(1, 1, constants.MIN_POP);
    testGrid.setSpaceVal(0, 0, constants.MAX_POP);
    testGrid.setSpaceVal(0, 1, constants.MAX_POP);
    testGrid.endStagingGrid();

    controller.takeStep(testGrid);
    if(testGrid.getSpaceVal(1, 1) != constants.MIN_POP)
    {
        console.log(
            "FAIL(testStasisDead): Cell expected to stay dead but didn\'t."
        );
    }
}


runControllerTests();
