/**
 * Tests for probabilistic Conway's Game of Life non-GUI logic.
 *
 * @author Sam Pottinger
 * @license GNU GPL v3
**/

var controller = require("./controller");
var grid = require("./grid");

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


function testLonelyDeath()
{
    var testGrid = new grid.HexagonalGrid(3, 3);
    
    testGrid.clearGrid();

    testGrid.startStagingGrid();
    testGrid.setSpaceVal(1, 1, 1);
    testGrid.endStagingGrid();

    controller.takeStep(testGrid);
    if(testGrid.getSpaceVal(1, 1) != 0)
    {
        console.log(
            "FAIL(testLonelyDeath): Cell expected to die but didn\'t."
        );
    }
}


function testLonelyDeathOne()
{
    var testGrid = new grid.HexagonalGrid(3, 3);
    
    testGrid.clearGrid();

    testGrid.startStagingGrid();
    testGrid.setSpaceVal(1, 1, 1);
    testGrid.setSpaceVal(0, 0, 1);
    testGrid.endStagingGrid();

    controller.takeStep(testGrid);
    if(testGrid.getSpaceVal(1, 1) != 0)
    {
        console.log(
            "FAIL(testLonelyDeathOne): Cell expected to die but didn\'t."
        );
    }
}


function testOverpopulationDeath()
{
    var testGrid = new grid.HexagonalGrid(3, 3);
    
    testGrid.clearGrid();

    testGrid.startStagingGrid();
    testGrid.setSpaceVal(1, 1, 1);
    testGrid.setSpaceVal(0, 0, 1);
    testGrid.setSpaceVal(0, 1, 1);
    testGrid.setSpaceVal(1, 2, 1);
    testGrid.setSpaceVal(1, 0, 1);
    testGrid.endStagingGrid();

    controller.takeStep(testGrid);
    if(testGrid.getSpaceVal(1, 1) != 0)
    {
        console.log(
            "FAIL(testOverpopulationDeath): Cell expected to die but didn\'t."
        );
    }
}


function testBirth()
{
    var testGrid = new grid.HexagonalGrid(3, 3);
    
    testGrid.clearGrid();

    testGrid.startStagingGrid();
    testGrid.setSpaceVal(1, 1, 0);
    testGrid.setSpaceVal(0, 0, 1);
    testGrid.setSpaceVal(0, 1, 1);
    testGrid.setSpaceVal(1, 2, 1);
    testGrid.endStagingGrid();

    controller.takeStep(testGrid);
    if(testGrid.getSpaceVal(1, 1) != 1)
    {
        console.log(
            "FAIL(testBirth): Cell expected to be born but didn\'t."
        );
    }
}


function testStasisLive()
{
    var testGrid = new grid.HexagonalGrid(3, 3);
    
    testGrid.clearGrid();

    testGrid.startStagingGrid();
    testGrid.setSpaceVal(1, 1, 1);
    testGrid.setSpaceVal(0, 0, 1);
    testGrid.setSpaceVal(0, 1, 1);
    testGrid.endStagingGrid();

    controller.takeStep(testGrid);
    if(testGrid.getSpaceVal(1, 1) != 1)
    {
        console.log(
            "FAIL(testStasisLive): Cell expected to stay alive but didn\'t."
        );
    }
}


function testStasisDead()
{
    var testGrid = new grid.HexagonalGrid(3, 3);
    
    testGrid.clearGrid();

    testGrid.startStagingGrid();
    testGrid.setSpaceVal(1, 1, 0);
    testGrid.setSpaceVal(0, 0, 1);
    testGrid.setSpaceVal(0, 1, 1);
    testGrid.endStagingGrid();

    controller.takeStep(testGrid);
    if(testGrid.getSpaceVal(1, 1) != 0)
    {
        console.log(
            "FAIL(testStasisDead): Cell expected to stay dead but didn\'t."
        );
    }
}


runControllerTests();
