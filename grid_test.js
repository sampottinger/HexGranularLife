/**
 * Tests for hexagonal grid logic.
 *
 * @author Sam Pottinger
 * @license GNU GPL v3
**/

var constants = require("./constants");
var grid = require("./grid");

function runGridTests()
{
    console.log(">> Running grid tests...");
    testClear();
    testStagingGrid();
    testGetterAndSetter();
    testBounds();
    testNumNeighborsOdd();
    testNumNeighborsEven();
    testNumNeighborsEdge();
    console.log(">> Finished grid tests.");
}


function testClear()
{
    var testGrid = new grid.HexagonalGrid(5, 5);
    testGrid.clearGrid();

    if(testGrid.getSpaceVal(0, 0) != 0)
        console.log("FAIL(testClear): Spaces not starting at zero");
}

function testStagingGrid()
{
    var testGrid = new grid.HexagonalGrid(5, 5);
    testGrid.clearGrid();

    testGrid.setSpaceVal(4, 1, 1);
    if(testGrid.getSpaceVal(4, 1) != 0)
        console.log("FAIL(testStagingGrid): Staging grid bypassed.");
}


function testGetterAndSetter()
{
    var testGrid = new grid.HexagonalGrid(5, 5);
    testGrid.clearGrid();

    testGrid.startStagingGrid();
    testGrid.setSpaceVal(4, 1, 1);
    testGrid.setSpaceVal(4, 0, 0);
    testGrid.changeSpaceVal(4, 2, 0.1);
    testGrid.endStagingGrid();

    if(testGrid.getSpaceVal(4, 1) != 1)
        console.log("FAIL(testGetterAndSetter): Setting spaces not correct.");
    if(testGrid.getSpaceVal(4, 0) != 0)
        console.log("FAIL(testGetterAndSetter): Expected zero cell.");
    if(testGrid.getSpaceVal(4, 2) != 0.1)
        console.log("FAIL(testGetterAndSetter): Change space val failed.");
}


function testBounds()
{
    var testGrid = new grid.HexagonalGrid(5, 5);
    testGrid.clearGrid();

    testGrid.startStagingGrid();
    testGrid.setSpaceVal(4, 0, constants.MAX_POP);
    testGrid.setSpaceVal(4, 1, constants.MIN_POP);
    testGrid.changeSpaceVal(4, 0, constants.STEP_POP_DELTA);
    testGrid.changeSpaceVal(4, 1, -constants.STEP_POP_DELTA);
    testGrid.endStagingGrid();

    if(testGrid.getSpaceVal(4, 0) != constants.MAX_POP)
        console.log("FAIL(testBounds): Upper population bound failed.");
    if(testGrid.getSpaceVal(4, 1) != constants.MIN_POP)
        console.log("FAIL(testBounds): Lower population bound failed.");

}


function testNumNeighborsOdd()
{
    var testGrid = new grid.HexagonalGrid(5, 5);
    testGrid.clearGrid();

    testGrid.startStagingGrid();
    for(var y=0; y<3; y++)
    {
        for(var x=0; x<3; x++)
            testGrid.setSpaceVal(x, y, 1);
    }
    testGrid.endStagingGrid();

    if(testGrid.getNumNeighbors(1, 1) != 6)
        console.log("FAIL(testNumNeighborsOdd): Failed on odd x index.");
}


function testNumNeighborsEven()
{
    var testGrid = new grid.HexagonalGrid(5, 5);
    testGrid.clearGrid();

    testGrid.startStagingGrid();
    for(var y=2; y<=3; y++)
    {
        for(var x=1; x<4; x++)
            testGrid.setSpaceVal(x, y, 1);
    }
    testGrid.endStagingGrid();

    if(testGrid.getNumNeighbors(2, 2) != 5)
        console.log("FAIL(testNumNeighborsEven): Failed on even x index.");
}


function testNumNeighborsEdge()
{
    var testGrid = new grid.HexagonalGrid(5, 5);
    testGrid.clearGrid();

    testGrid.startStagingGrid();
    testGrid.setSpaceVal(1, 0, 1);
    testGrid.setSpaceVal(1, 1, 1);
    testGrid.setSpaceVal(0, 1, 1);
    testGrid.endStagingGrid();

    if(testGrid.getNumNeighbors(0, 0) != 3)
        console.log("FAIL(testNumNeighborsEdge): Failed on edges.");
}


runGridTests();
