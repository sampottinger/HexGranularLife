/**
 * Tests for hexagonal grid logic.
 *
 * @author Sam Pottinger
 * @license GNU GPL v3
**/

var grid = require("./grid");

function runGridTests()
{
    console.log(">> Running grid tests...");
    testClear();
    testGetterAndSetter();
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


function testGetterAndSetter()
{
    var testGrid = new grid.HexagonalGrid(5, 5);
    testGrid.clearGrid();

    testGrid.setSpaceVal(4, 1, 1);
    testGrid.setSpaceVal(4, 0, 0);
    if(testGrid.getSpaceVal(4, 1) != 1)
        console.log("FAIL(testGetterAndSetter): Setting spaces not correct.");
    if(testGrid.getSpaceVal(4, 0) != 0)
        console.log("FAIL(testGetterAndSetter): Expected zero cell.");
}


function testNumNeighborsOdd()
{
    var testGrid = new grid.HexagonalGrid(5, 5);
    testGrid.clearGrid();

    for(var y=0; y<2; y++)
    {
        for(var x=0; x<3; x++)
            testGrid.setSpaceVal(x, y, 1);
    }

    if(testGrid.getNumNeighbors(1, 1) != 5)
        console.log("FAIL(testNumNeighborsOdd): Failed on odd x index.");
}


function testNumNeighborsEven()
{
    var testGrid = new grid.HexagonalGrid(5, 5);
    testGrid.clearGrid();

    for(var y=2; y<=3; y++)
    {
        for(var x=1; x<4; x++)
            testGrid.setSpaceVal(x, y, 1);
    }

    if(testGrid.getNumNeighbors(2, 2) != 5)
        console.log("FAIL(testNumNeighborsEven): Failed on even x index.");
}


function testNumNeighborsEdge()
{
    var testGrid = new grid.HexagonalGrid(5, 5);
    testGrid.clearGrid();

    testGrid.setSpaceVal(1, 0, 1);
    testGrid.setSpaceVal(1, 1, 1);
    testGrid.setSpaceVal(0, 1, 1);

    if(testGrid.getNumNeighbors(0, 0) != 3)
        console.log("FAIL(testNumNeighborsEdge): Failed on edges.");
}


runGridTests();
