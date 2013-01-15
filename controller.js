/**
 * Non-GUI Logic for running a probabilistic Conway's Game of Life simulation.
 *
 * Logic for running a probabilistic Conway's Game of Life simulation on a
 * hexagonal game board.
 *
 * @author Sam Pottinger
 * @license GNU GPL v3
**/


/**
 * Move the simulation forward by a step.
 *
 * @param {grid.HexagonalGrid} the game grid to operate on.
**/
function takeStep(grid)
{
    var xSize = grid.getXSize();
    var ySize = grid.getYSize();
    var numNeighbors;

    grid.startStagingGrid();

    for(var curY=0; curY < ySize; curY++)
    {
        for(var curX=0; curX < xSize; curX++)
        {
            numNeighbors = grid.getNumNeighbors(curX, curY);

            // Death - >=4 or <=1 neighbors, life - ==3 neighbors
            if(numNeighbors >= 4 || numNeighbors <= 1)
            {
                grid.changeSpaceVal(curX, curY, -constants.STEP_POP_DELTA);
            }
            else if (numNeighbors >= 2.5 && numNeighbors <= 3.5)
            {
                grid.changeSpaceVal(curX, curY, constants.STEP_POP_DELTA);
            }
        }
    }

    grid.endStagingGrid();
}


// Export for Node / unit testing
if (typeof window === 'undefined')
{
    exports.takeStep = takeStep;
    var constants = require("./constants");
}
